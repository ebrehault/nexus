import { writable } from '/~/node_modules/svelte/store';
export const AbFabStore = writable({
    location: '',
    logged: !!localStorage.getItem('auth'),
});
export function get_root_path(path) {
    return path.startsWith('/') && !path.startsWith('/~/') ? `/~/${path.slice(1)}` : path;
}
