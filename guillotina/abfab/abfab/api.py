from guillotina import configure
from guillotina.component import get_multi_adapter
from guillotina.behaviors.attachment import IAttachment
from guillotina.api.content import DefaultGET
from guillotina.response import HTTPFound
from guillotina.interfaces import IFileManager
from guillotina.utils import get_current_container, navigate_to, get_object_url, get_content_path
from abfab.content import IFile, IDirectory, IContent
from urllib.parse import urlparse
import json

async def get_object_by_path(path):
    container = get_current_container()
    return await navigate_to(container, path)

async def view_source(context, request):
    behavior = IAttachment(context)
    await behavior.load(create=False)
    field = IAttachment["file"].bind(behavior)
    adapter = get_multi_adapter((context, request, field), IFileManager)
    return await adapter.download(disposition="inline")

def wrap_component(request, js_component, path_to_content, type='json'):
    get_context = ""
    if path_to_content:
        get_context = """let response = await fetch('{path_to_content}');
    let context = await response.{type}();
    """.format(path_to_content=path_to_content, type=type)
    else:
        context = request.query.get('context', {})
        get_context = """let context = {context}""".format(context=context)
    return """<!DOCTYPE html>
<html lang="en">
<script type="module">
    import Component from '{component}';
    import Main from '/db/my-app/abfab/main.svelte.js';
    {get_context}
    const component = new Main({{
        target: document.body,
        props: {{context, component: Component}},
    }});
    export default component;
</script>
</html>
""".format(component=urlparse(get_object_url(js_component)).path, get_context=get_context)

@configure.service(context=IFile, method='GET',
                   permission='guillotina.Public', allow_access=True)
async def get_file(context, request):
    if context.id.endswith(".svelte") and 'raw' not in request.query:
        js = await get_object_by_path(get_content_path(context) + '.js')
        if "text/html" in request.headers["ACCEPT"]:
            return wrap_component(request, js, None)
        else:
            return await view_source(js, request)
    return await view_source(context, request)

async def get_index(context, request):
    path = urlparse(get_object_url(context)).path + '/'
    entrypoint = context.module or context.main
    if entrypoint and entrypoint.startswith('./'):
        entrypoint = entrypoint[2:]
    if entrypoint:
        return HTTPFound(path + entrypoint)
    if "text/html" in request.headers.get("ACCEPT"):
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
        view_path = request.query.get('view') or context.view
        if view_path.endswith('.svelte'):
            view_path += '.js'
        view = await get_object_by_path(view_path)
        if view.type_name == 'Directory':
            return await get_index(view, request)
        if view.content_type == "application/javascript" or view.id.endswith('.svelte'):
            return wrap_component(request, view, './' + context.id)
        else:
            return await view_source(view, request)
    else:
        return context.data

@configure.service(context=IFile, method='GET', name='@edit',
                   permission='guillotina.Public', allow_access=True)
async def run_editor(context, request):
    editor_view = await get_object_by_path('/abfab/editor/editor.svelte')
    return wrap_component(request, editor_view, '.?raw=true', 'text')

@configure.service(context=IDirectory, method='GET', name='@tree',
                   permission='guillotina.Public', allow_access=True)
async def get_file_tree(context, request):
    children = []
    async for _, obj in context.async_items():
        children.append({"type": obj.type_name, "url": get_object_url(obj), "path": get_content_path(obj)})
        if obj.type_name == 'Directory':
            sub = await get_file_tree(obj, request)
            children += sub
    return children

@configure.service(context=IContent, method='GET', name='@default',
                   permission='guillotina.ViewContent', allow_access=True)
@configure.service(context=IDirectory, method='GET', name='@default',
                   permission='guillotina.Public', allow_access=True)
@configure.service(context=IFile, method='GET', name='@default',
                   permission='guillotina.Public', allow_access=True)
async def get_default(context, request):
    get = DefaultGET(context, request)
    return await get()