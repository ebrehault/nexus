<script>
    import { AbFabStore, getRealPath, API} from '/~/abfab/core.js';
    import { onDestroy } from 'svelte';
    import { derived } from 'svelte/store';

    export let component;
    export let context;

    // Adapted from https://github.com/sveltejs/kit/blob/master/packages/kit/src/runtime/client/router.js
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    addEventListener('beforeunload', () => {
        history.scrollRestoration = 'auto';
    });
    addEventListener('load', () => {
        history.scrollRestoration = 'manual';
    });
    addEventListener('click', (event) => {
        if (event.button || event.which !== 1) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.defaultPrevented) return;

        const a = find_anchor(event.target);
        if (!a) return;

        if (!a.href) return;
        const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
		const href = String(svg ? a.href.baseVal : a.href);

        if (href === location.href) {
            if (!location.hash) event.preventDefault();
            return;
        }
        event.preventDefault();
        navigate(href);
    });
    function find_anchor(node) {
        while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode;
        return node;
    }
    async function navigate(href) {
        history.pushState({}, '', href);
        const [path, query] = href.split('?');
        if (path.endsWith('/@edit')) {
            // TODO: move to editor.js and declare dynamically
            const response = await API.get(path.replace('/@edit', '/@edit-data'));
            const code = await response.text();
            const module = await import(`/~/abfab/editor/editor.svelte`);
            context = code;
            component = module.default;
        } else {
            const response = await API.get(`${path}/@basic`);
            const basicData = await response.json();
            if (basicData.type_name === 'Content') {
                const module = await import(getRealPath(basicData.view));
                component = module.default;
                context = basicData.data;
            } else {
                const module = await import(getRealPath(basicData.path));
                component = module.default;
                if (query) {
                    const queryContext = query.split('context=')[1];
                    if (queryContext) {
                        context = JSON.parse(decodeURIComponent(queryContext));
                    }
                }
            }   
        }
    }

    const subscriptions = [];
    const _navigateTo = derived(AbFabStore, (state) => state.navigateTo);
    subscriptions.push(_navigateTo.subscribe(value => {
        if(value) {
            navigate(value);
        }
    }));

    const _logged = derived(AbFabStore, (state) => state.logged);
    subscriptions.push(_logged.subscribe(isLogged => {
		if (!isLogged) {
            localStorage.removeItem('auth');
            navigate('/~/abfab/login/login.svelte');
        }
	}));

	onDestroy(() => subscriptions.map(unsubscribe => unsubscribe()));
</script>
<svelte:component this={component} context={context}></svelte:component>
