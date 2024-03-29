import os
import requests
import json
import logging
import argparse

GUILLOTINA_CONTAINER_ROOT = 'http://abfab:8080/db/app/'

def get_url(path):
    return GUILLOTINA_CONTAINER_ROOT + path

def get_parent_url(path):
    return '/'.join(get_url(path).split('/')[:-1])

def save_object(path, data):
    res = requests.post(
        get_parent_url(path),
        json=data,
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
        auth=AUTH,
        verify=False)
    if not res.ok:
        logging.error("{}: {}".format(res.status_code, path))

def update_object(path, data):
    res = requests.patch(
        get_url(path),
        json=data,
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
        auth=AUTH,
        verify=False)
    if not res.ok:
        logging.error("{}: {}".format(res.status_code, path))

def upload_file(remote_content_path, local_content_path, file_id):
    file_upload_path = get_url(remote_content_path) + "/@tusupload/file/" + file_id
    TOTAL_SIZE = os.path.getsize(local_content_path)
    CHUNK_SIZE = 100000
    offset = 0
    
    with open(local_content_path, 'rb') as source_file:
        requests.post(
            file_upload_path,
            headers={
                "TUS-RESUMABLE": "1",
                "UPLOAD-LENGTH": str(TOTAL_SIZE),
                "X-UPLOAD-FILENAME": file_id
            },
            auth=AUTH,
            verify=False,
        )
        chunk = source_file.read(CHUNK_SIZE)
        while chunk:
            requests.patch(
                file_upload_path,
                data=chunk,
                headers={
                    "TUS-RESUMABLE": "1",
                    'Upload-Offset': str(offset),
                    "X-UPLOAD-FILENAME": file_id
                },
                auth=AUTH,
                verify=False,
            )
            offset += CHUNK_SIZE
            chunk = source_file.read(CHUNK_SIZE)

def create_folder(path):
    file_id = path.split('/')[-1]
    save_object(path, {
        '@type': 'Directory',
        'id': file_id,
    })

def create_file(remote_content_path, local_content_path):
    file_id = remote_content_path.split('/')[-1]
    if file_id == 'package.json':
        with open(local_content_path, encoding='utf-8') as source_file:
            content = json.loads(source_file.read())
            if content.get('module') or content.get('main'):
                data = {'main': content.get('main'), 'module': content.get('module')}
                parent = '/'.join(remote_content_path.split('/')[:-1])
                update_object(parent, data)
    else:
        save_object(remote_content_path, {
            '@type': 'File',
            'id': file_id,
        })
        upload_file(remote_content_path, local_content_path, file_id)

def upload_folder(path, root):
    create_folder(path)
    local_path = os.path.join(root, path)
    for content in os.listdir(local_path):
        local_content_path = os.path.join(local_path, content)
        remote_content_path = os.path.join(path, content)
        if os.path.isdir(local_content_path):
            upload_folder(remote_content_path, root)
        elif not args.svelteOnly or content.endswith('.svelte') or content.endswith('.js'):
            create_file(remote_content_path, local_content_path)

def compile_svelte(path):
    if os.path.isdir(path):
        for content in os.listdir(path):
            content_path = os.path.join(path, content)
            compile_svelte(content_path)
    else:
        if path.endswith('.svelte'):
            os.system('node compile.js {}'.format(path))

def delete_remote(path):
    requests.delete(get_url(path), auth=AUTH, verify=False)

def download_file(obj, root):
    res = requests.get(
        obj['url'] + "/@edit-data",
        auth=AUTH,
        verify=False)
    with open(os.path.join(root, obj['path'][1:]), 'wb') as f:
        f.write(res.content)

def download_folder(path, root):
    res = requests.get(
        get_url(path) + "/@allfiles",
        headers={'Accept': 'application/json', 'Content-Type': 'application/json'},
        auth=AUTH,
        verify=False)
    for item in res.json():
        if item['type'] == 'File' and (not args.svelteOnly or item['path'].endswith('.svelte')):
            download_file(item, root)
        else:
            dir_path = os.path.join(root, item['path'][1:])
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)

parser = argparse.ArgumentParser(description='Sync AbFab sources.')
parser.add_argument('command', metavar='command', type=str,
                    help='up or down')
parser.add_argument('path', metavar='path', type=str,
                    help='path of the folder to sync')
parser.add_argument('--auth', metavar='auth', type=str,
                    help='username:password')
parser.add_argument('--root', metavar='root', type=str,
                    help='path to local root for storage')
parser.add_argument('--svelteOnly', action="store_true",
                    help='restrict to svelte files only')
args = parser.parse_args()
AUTH = tuple(args.auth.split(':'))
if args.command == 'up':
    folder_path = os.path.join(args.root, args.path)
    compile_svelte(folder_path)
    if not args.svelteOnly:
        delete_remote(args.path)
    upload_folder(args.path, args.root)
else:
    download_folder(args.path, args.root)
