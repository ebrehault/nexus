export function saveFile(filepath, body) {
    const path = filepath.split('/');
    const filename = path.pop();
    const container = path.join('/');
    return fetch(filepath, { method: 'HEAD', headers: { Authorization: 'Basic ' + btoa('root:root') } })
        .then((res) =>
            fetch(res.status === 404 ? container : filepath, {
                method: res.status === 404 ? 'POST' : 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + btoa('root:root'),
                },
                body: JSON.stringify({
                    '@type': 'File',
                    id: filename,
                }),
            }),
        )
        .then(() =>
            fetch(filepath + '/@upload/file', {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/octet-stream',
                    'X-UPLOAD-FILENAME': filename,
                    Authorization: 'Basic ' + btoa('root:root'),
                },
                body,
            }),
        );
}
