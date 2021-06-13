from guillotina import configure
from guillotina.component import get_multi_adapter
from guillotina.behaviors.attachment import IAttachment
from guillotina.interfaces import IFileManager, IResponse
from guillotina.renderers import Renderer
from guillotina.utils import get_current_container, navigate_to
from abfab.content import IFile, IDirectory, IContent

async def get_source(context, request):
    behavior = IAttachment(context)
    await behavior.load(create=False)
    field = IAttachment["file"].bind(behavior)
    adapter = get_multi_adapter((context, request, field), IFileManager)
    return await adapter.download(disposition="inline")

@configure.service(context=IFile, method='GET',
                   permission='guillotina.Public', allow_access=True)
async def get_file(context, request):
    return await get_source(context, request)

@configure.service(context=IDirectory, method='GET',
                   permission='guillotina.Public', allow_access=True)
async def get_index(context, request):
    if "text/html" in request.headers["ACCEPT"]:
        index_html = await context.async_get('index.html')
        if index_html:
            return await get_source(index_html, request)
    else:
        index_mjs = await context.async_get('index.mjs')
        if index_mjs:
            return await get_source(index_mjs, request)
        index_js = await context.async_get('index.js')
        if index_js:
            return await get_source(index_js, request)

@configure.service(context=IContent, method='GET',
                   permission='guillotina.Public', allow_access=True)
async def get_view_or_data(context, request):
    if "text/html" in request.headers["ACCEPT"]:
        container = get_current_container()
        view = await navigate_to(container, context.view)
        if view.type_name == 'Directory':
            return await get_index(view, request)
        else:
            return await get_file(view, request)
    else:
        return context.data
