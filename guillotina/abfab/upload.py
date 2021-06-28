import os
import sys
import requests
import json
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

def update_object(path, data):
    res = requests.patch(
        get_url(path),
        json=data,
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
        auth=AUTH)
    if not res.ok:
        logging.error("{}: {}".format(res.status_code, path))

def upload_file(path, id):
    file_upload_path = get_url(path) + "/@tusupload/file/" + id
    TOTAL_SIZE = os.path.getsize(path)
    CHUNK_SIZE = 100000
    offset = 0
    
    with open(path, 'rb') as source_file:
        requests.post(
            file_upload_path,
            headers={
                "TUS-RESUMABLE": "1",
                "UPLOAD-LENGTH": str(TOTAL_SIZE),
                "X-UPLOAD-FILENAME": id
            },
            auth=AUTH,
        )
        chunk = source_file.read(CHUNK_SIZE)
        while chunk:
            requests.patch(
                file_upload_path,
                data=chunk,
                headers={
                    "TUS-RESUMABLE": "1",
                    'Upload-Offset': str(offset),
                    "X-UPLOAD-FILENAME": id
                },
                auth=AUTH,
            )
            offset += CHUNK_SIZE
            chunk = source_file.read(CHUNK_SIZE)

def create_folder(path):
    id = path.split('/')[-1]
    save_object(path, {
        '@type': 'Directory',
        'id': id,
    })

def create_file(path):
    id = path.split('/')[-1]
    if id == 'package.json':
        with open(path, encoding='utf-8') as source_file:
            content = json.loads(source_file.read())
            if content.get('module') or content.get('main'):
                data = {'main': content.get('main'), 'module': content.get('module')}
                parent = '/'.join(path.split('/')[:-1])
                update_object(parent, data)
    else:
        save_object(path, {
            '@type': 'File',
            'id': id,
        })
        upload_file(path, id)

def upload_folder(path):
    create_folder(path)
    for content in os.listdir(path):
        content_path = os.path.join(path, content)
        if os.path.isdir(content_path):
            upload_folder(content_path)
        else:
            create_file(content_path)

upload_folder(sys.argv[1])

