from guillotina import configure
from guillotina.response import Response
from abfab.content import IFile, IDirectory

async def get_source(context, request):
    resp = Response(status=200)
    resp.headers['Content-Type'] = context.content_type or 'text/plain'
    await resp.prepare(request)
    await resp.write(bytearray(context.source.encode('utf-8')), eof=True)
    return resp

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
