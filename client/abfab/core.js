import { writable } from '/~/libs/svelte/store';

export const AbFabStore = writable({
    navigateTo: '',
    logged: !!localStorage.getItem('auth'),
});

let redirecting = false;

export function redirectToLogin() {
    if (!redirecting) {
        navigateTo(`/~/abfab/login/login.svelte?from=${window.location.pathname}`);
        redirecting = true;
    }
}
export function navigateTo(path) {
    AbFabStore.update((state) => ({ ...state, navigateTo: path }));
}
export function getRealPath(path) {
    return path.startsWith('/') && !path.startsWith('/~/') ? `/~/${path.slice(1)}` : path;
}
export function getCorePath(path) {
    return path.replace('/~/', '');
}
export const API = {
    getHeaders: (extraHeaders) => {
        const auth = { Authorization: 'Bearer ' + localStorage.getItem('auth') };
        return extraHeaders ? { ...auth, ...extraHeaders } : auth;
    },
    get: (path, extraHeaders) => {
        return API.fetch(path, extraHeaders);
    },
    head: (path, extraHeaders) => {
        return API.fetch(path, extraHeaders, { method: 'HEAD' });
    },
    post: (containerPath, data, extraHeaders) => {
        return API.fetch(containerPath, extraHeaders, { method: 'POST', body: data });
    },
    patch: (path, data, extraHeaders) => {
        return API.fetch(path, extraHeaders, { method: 'PATCH', body: data });
    },
    delete: (path, extraHeaders) => {
        return API.fetch(path, extraHeaders, { method: 'DELETE' });
    },
    fetch: (path, extraHeaders, params = {}) => {
        params.headers = API.getHeaders(extraHeaders);
        return fetch(path, params).then((res) => {
            if (res.status === 401) {
                const token = localStorage.getItem('auth');
                if (token) {
                    return fetch('/~/@login-renew', { method: 'POST', headers: API.getHeaders({}) })
                        .then((auth) => {
                            if (auth.status === 200) {
                                return auth.json();
                            } else {
                                redirectToLogin();
                                throw new Error('Redirecting to login');
                            }
                        })
                        .then((data) => localStorage.setItem('auth', data.token))
                        .then(() => fetch(path, params));
                } else {
                    return res;
                }
            } else {
                return res;
            }
        });
    },
};
