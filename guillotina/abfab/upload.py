import os
import sys
import requests
import logging

GUILLOTINA_CONTAINER_ROOT = 'http://localhost:8080/db/my-app/'
AUTH = ('root', 'root')

def get_url(path):
    return GUILLOTINA_CONTAINER_ROOT + path[2:]

def get_parent_url(path):
    return '/'.join(get_url(path).split('/')[:-1])

def save_object(path, data):
    res = requests.post(
        get_parent_url(path),
        json=data,
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
        auth=AUTH)
    if not res.ok:
        logging.error("{}: {}".format(res.status_code, path))

def upload_file(path, id, data):
    requests.patch(
        get_url(path) + "/@upload/file",
        data=data.encode('utf-8'),
        headers={
            'Accept': 'application/json',
            'Content-Type': 'application/octet-stream',
            'X-UPLOAD-FILENAME': id,
        },
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
        try:
            save_object(path, {
                '@type': 'File',
                'id': id,
            })
            source = f.read()
            upload_file(path, id, source)
        except Exception:
            logging.error("Cannot upload " + path)

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

