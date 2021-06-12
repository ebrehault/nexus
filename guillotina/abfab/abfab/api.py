from guillotina import configure
from guillotina.response import Response
from guillotina.component import get_multi_adapter
from guillotina.api.files import DownloadFile
from guillotina.behaviors.attachment import IAttachment
from guillotina.interfaces import IFileManager
from guillotina.interfaces import IFileManager
from abfab.content import IFile, IDirectory

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
    index_mjs = await context.async_get('index.mjs')
    if index_mjs:
        return await get_source(index_mjs, request)
    index_js = await context.async_get('index.js')
    if index_js:
        return await get_source(index_js, request)
    index_html = await context.async_get('index.html')
    if index_html:
        return await get_source(index_html, request)

# TODO
# GET text/html -> return the template content
# GET application/json -> return regular Guillotina GET 
# so the tempalte can call '.', and get the expected JSON