import { writable } from '/~/node_modules/svelte/store';
export const AbFabStore = writable({
    location: '',
    logged: !!localStorage.getItem('auth'),
});
