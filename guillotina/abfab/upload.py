import os
import sys
import requests

GUILLOTINA_CONTAINER_ROOT = 'http://localhost:8080/db/my-app/'
AUTH = ('root', 'root')

def get_parent_url(path):
    parent = GUILLOTINA_CONTAINER_ROOT + '/'.join(path[2:].split('/')[:-1])
    return parent

def save_object(path, data):
    requests.post(
        get_parent_url(path),
        json=data,
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
        auth=AUTH)

def upload_large_file(path, data):
    requests.patch(
        path,
        json=,
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
        auth=AUTH,
    )

def create_folder(path):
    id = path.split('/')[-1]
    save_object(path, {
        '@type': 'Directory',
        'id': id,
    })

def create_file(path):
    id = path.split('/')[-1]
    with open(path) as f:
        source = f.read()
        if len(source) < 1024 ** 2:
            save_object(path, {
                '@type': 'File',
                'id': id,
                'source': source,
            })
        else:
            save_object(path, {
                '@type': 'File',
                'id': id,
            })
            upload_large_file(path, source)

def upload_folder(path):
    create_folder(path)
    for content in os.listdir(path):
        content_path = os.path.join(path, content)
        if os.path.isdir(content_path):
            create_folder(path)
            upload_folder(content_path)
        else:
            create_file(content_path)

upload_folder(sys.argv[1])

