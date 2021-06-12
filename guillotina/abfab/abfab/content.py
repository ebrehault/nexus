from guillotina import configure, content, schema
from guillotina.interfaces import IFolder, IItem
from mimetypes import guess_type


class IDirectory(IFolder):
    pass

@configure.contenttype(
    type_name='Directory',
    schema=IDirectory,
    globally_addable=True,
    allowed_types=['File', 'Directory'])
class Directory(content.Folder):
    pass


class IFile(IItem):
    content_type = schema.Text()

@configure.contenttype(
    type_name='File',
    schema=IFile,
    globally_addable=False,
    behaviors=["guillotina.behaviors.attachment.IAttachment"],
)
class File(content.Item):
    pass
