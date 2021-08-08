import { writable, derived, get } from '/~/node_modules/svelte/store';
import { getRealPath, API, navigateTo } from '/~/abfab/core.js';

export const EditorStore = writable({
    tree: [],
    dirs: [],
    showNavigation: false,
});

export const loadTree = async () => {
    const response = await API.get('/~/@tree');
    if (response.ok) {
        const currentLocation = window.location.pathname.replace('/@edit', '');
        const tree = await response.json();
        const dirs = [];
        const mapTree = (item) => {
            if (item.type === 'Directory') {
                dirs.push(item.path);
            }
            const itemPath = getRealPath(item.path);
            return {
                name: item.path.split('/').pop(),
                path: itemPath,
                type: item.type,
                children: !!item.children
                    ? item.children.sort((a, b) => a.path.localeCompare(b.path)).map(mapTree)
                    : undefined,
                expanded: currentLocation.startsWith(itemPath),
                selected: currentLocation === itemPath,
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
            children: (item.children || [])
                .sort((a, b) => a.path.localeCompare(b.path))
                .map((child) => _updateTreeItem(child, target)),
        };
    } else {
        return item;
    }
};

export const updateTreeItem = (target) => {
    const tree = get(EditorStore).tree.map((i) => _updateTreeItem(i, target));
    EditorStore.update((state) => ({ ...state, tree }));
};

export const getTreeItem = (path, tree) => {
    if (!tree) {
        tree = get(EditorStore).tree;
    }
    const exactMatch = tree.find((item) => path === item.path);
    if (exactMatch) {
        return exactMatch;
    } else {
        const match = tree.find((item) => path.startsWith(item.path));
        if (!match) {
            return match;
        } else {
            return getTreeItem(path, match.children || []);
        }
    }
};

const deleteTreeItem = (path, tree) => {
    if (!tree) {
        tree = get(EditorStore).tree;
    }
    if (tree.find((item) => item.path === path)) {
        return tree.filter((item) => item.path !== path);
    } else if (tree.find((item) => path.startsWith(item.path))) {
        return tree.map((item) =>
            path.startsWith(item.path) ? { ...item, children: deleteTreeItem(path, item.children) } : item,
        );
    } else {
        return tree;
    }
};

export const showNavigation = derived(EditorStore, (state) => state.showNavigation);

export function saveFile(filepath, type, content) {
    filepath = `/~/${filepath.slice(1)}`;
    const path = filepath.split('/');
    const filename = path.pop();
    const container = path.join('/');
    return API.head(filepath)
        .then((res) => {
            if (res.status === 401) {
                redirectToLogin();
            }
            const body = {
                '@type': type,
                id: filename,
            };
            if (type === 'Content') {
                body.data = JSON.parse(content);
            }
            return res.status === 404
                ? API.post(container, JSON.stringify(body))
                : API.patch(filepath, JSON.stringify(body));
        })
        .then((res) => {
            if (res.status === 401) {
                redirectToLogin();
            }
            if (type === 'File') {
                return API.patch(filepath + '/@upload/file', content, {
                    'Content-Type': 'application/octet-stream',
                    'X-UPLOAD-FILENAME': filename,
                });
            }
        });
}

export async function deleteFile(path) {
    const deletion = await API.delete(path);
    if (deletion.status === 200) {
        EditorStore.update((state) => ({ ...state, tree: deleteTreeItem(path) }));
    }
}

let redirecting = false;

function redirectToLogin() {
    if (!redirecting) {
        navigateTo(`/~/abfab/login/login.svelte?from=${window.location.pathname}`);
        redirecting = true;
    }
}
