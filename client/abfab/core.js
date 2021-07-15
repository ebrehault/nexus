import { writable } from '/db/my-app/node_modules/svelte/store';
export const AbFabStore = writable({
    location: '',
    logged: !!localStorage.getItem('auth'),
});
