import { writable } from '/db/my-app/node_modules/svelte/store';
export const AbFabStore = writable({
    location: '',
    logged: !!localStorage.getItem('auth'),
});

export function saveFile(filepath, body) {
    const path = filepath.split('/');
    const filename = path.pop();
    const container = path.join('/');
    const auth = { Authorization: 'Bearer ' + localStorage.getItem('auth') };
    return fetch(filepath, { method: 'HEAD', headers: { ...auth } })
        .then((res) => {
            if (res.status === 401) {
                redirectToLogin();
            }
            return fetch(res.status === 404 ? container : filepath, {
                method: res.status === 404 ? 'POST' : 'PUT',
                headers: {
                    ...auth,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    '@type': 'File',
                    id: filename,
                }),
            });
        })
        .then((res) => {
            if (res.status === 401) {
                redirectToLogin();
            }
            return fetch(filepath + '/@upload/file', {
                method: 'PATCH',
                headers: {
                    ...auth,
                    Accept: 'application/json',
                    'Content-Type': 'application/octet-stream',
                    'X-UPLOAD-FILENAME': filename,
                },
                body,
            });
        });
}

function redirectToLogin() {
    AbFabStore.update((state) => ({
        ...state,
        location: `/db/my-app/abfab/login/login.svelte?from=${window.location.pathname}`,
    }));
}
