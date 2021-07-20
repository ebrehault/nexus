import { writable, derived, get } from '/node_modules/svelte/store';
import { AbFabStore } from '/abfab/core.js';

export const EditorStore = writable({
    tree: [],
    dirs: [],
    showNavigation: false,
});

export const loadTree = async () => {
    const auth = { Authorization: 'Bearer ' + localStorage.getItem('auth') };
    const response = await fetch('/@tree', { method: 'GET', headers: { ...auth } });
    if (response.ok) {
        const currentLocation = window.location.pathname.replace('/@edit', '');
        const tree = await response.json();
        const dirs = [];
        const mapTree = (item) => {
            if (item.type === 'Directory') {
                dirs.push(item.path);
            }
            return {
                name: item.path.split('/').pop(),
                path: item.path,
                type: item.type,
                children: !!item.children
                    ? item.children.sort((a, b) => a.path.localeCompare(b.path)).map(mapTree)
                    : undefined,
                expanded: currentLocation.startsWith(`${item.path}`),
            };
        };
        EditorStore.update((state) => ({ ...state, tree: tree.map(mapTree) }));
        EditorStore.update((state) => ({ ...state, dirs }));
    }
};

const _updateTreeItem = (item, target) => {
    if (item.path === target.path) {
        return target;
    } else if (target.path.startsWith(item.path)) {
        return {
            ...item,
            children: item.children
                .sort((a, b) => a.path.localeCompare(b.path))
                .map((child) => _updateTreeItem(child, target)),
        };
    } else {
        return item;
    }
};

export const updateTreeItem = (item) => {
    const tree = get(EditorStore).tree.map((i) => _updateTreeItem(i, item));
    EditorStore.update((state) => ({ ...state, tree }));
};

export const showNavigation = derived(EditorStore, (state) => state.showNavigation);

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
        location: `/abfab/login/login.svelte?from=${window.location.pathname}`,
    }));
}
