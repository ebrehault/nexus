<script>
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
        history.pushState({}, '', href);
        navigate(href);
    });
    function find_anchor(node) {
        while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode;
        return node;
    }
    async function navigate(href) {
        const [path, query] = href.split('?');
        const response = await fetch(`${path}/@default`);
        const fullObject = await response.json();
        if (fullObject['@type'] === 'Content') {
            const module = await import(`/db/my-app${fullObject.view}`);
            component = module.default;
            context = fullObject.data;
        } else {
            const module = await import(fullObject['@id']);
            component = module.default;
            if (query) {
                const queryContext = query.split('context=')[1];
                if (queryContext) {
                    context = JSON.parse(decodeURIComponent(queryContext));
                }
            }
        }   
    }
</script>
<svelte:component this={component} context={context}></svelte:component>
