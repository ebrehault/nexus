from guillotina import configure
from guillotina.component import get_multi_adapter
from guillotina.behaviors.attachment import IAttachment
from guillotina.api.content import DefaultGET
from guillotina.response import HTTPFound
from guillotina.interfaces import IFileManager
from guillotina.utils import get_current_container, navigate_to, get_object_url
from abfab.content import IFile, IDirectory, IContent
from urllib.parse import urlparse

async def view_source(context, request):
    behavior = IAttachment(context)
    await behavior.load(create=False)
    field = IAttachment["file"].bind(behavior)
    adapter = get_multi_adapter((context, request, field), IFileManager)
    return await adapter.download(disposition="inline")

def wrap_component(js_file, content_id):
    return """<!DOCTYPE html>
<html lang="en">
<script type="module">
    import Component from '{}';
    let response = await fetch('./{}');
    let data = await response.json();
    const component = new Component({{
        target: document.body,
        props: data,
    }});
    export default component;
</script>
</html>
""".format(urlparse(get_object_url(js_file)).path, content_id)

@configure.service(context=IFile, method='GET',
                   permission='guillotina.Public', allow_access=True)
async def get_file(context, request):
    if context.id.endswith(".svelte"):
        return HTTPFound(urlparse(get_object_url(context)).path + '.js')
    return await view_source(context, request)

async def get_index(context, request):
    path = urlparse(get_object_url(context)).path + '/'
    entrypoint = context.module or context.main
    if entrypoint and entrypoint.startswith('./'):
        entrypoint = entrypoint[2:]
    if entrypoint:
        return HTTPFound(path + entrypoint)
    if "text/html" in request.headers["ACCEPT"]:
        index_html = await context.async_get('index.html')
        if index_html:
            return HTTPFound(path + 'index.html')
    else:
        index_mjs = await context.async_get('index.mjs')
        if index_mjs:
            return HTTPFound(path + 'index.mjs')
        index_js = await context.async_get('index.js')
        if index_js:
            return HTTPFound(path + 'index.js')

@configure.service(context=IDirectory, method='GET',
                   permission='guillotina.Public', allow_access=True)
async def get_directory(context, request):
    return await get_index(context, request)

@configure.service(context=IContent, method='GET',
                   permission='guillotina.Public', allow_access=True)
async def get_view_or_data(context, request):
    if "text/html" in request.headers["ACCEPT"]:
        container = get_current_container()
        view = await navigate_to(container, context.view)
        if view.type_name == 'Directory':
            return await get_index(view, request)
        if view.content_type == "application/javascript":
            return wrap_component(view, context.id)
        else:
            return await view_source(view, request)
    else:
        return context.data


@configure.service(context=IDirectory, method='GET', name='@default',
                   permission='guillotina.Public', allow_access=True)
@configure.service(context=IFile, method='GET', name='@default',
                   permission='guillotina.Public', allow_access=True)
async def get_default(context, request):
    get = DefaultGET(context, request)
    return await get()