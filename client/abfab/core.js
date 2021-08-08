import { writable } from '/~/node_modules/svelte/store';
export const AbFabStore = writable({
    navigateTo: '',
    logged: !!localStorage.getItem('auth'),
});
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
        return fetch(path, { headers: API.getHeaders(extraHeaders) });
    },
    head: (path, extraHeaders) => {
        return fetch(path, { method: 'HEAD', headers: API.getHeaders(extraHeaders) });
    },
    post: (containerPath, data, extraHeaders) => {
        return fetch(containerPath, { method: 'POST', headers: API.getHeaders(extraHeaders), body: data });
    },
    patch: (path, data, extraHeaders) => {
        return fetch(path, { method: 'PATCH', headers: API.getHeaders(extraHeaders), body: data });
    },
    delete: (path, extraHeaders) => {
        return fetch(path, { method: 'DELETE', headers: API.getHeaders(extraHeaders) });
    },
};
