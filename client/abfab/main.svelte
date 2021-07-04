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
        const response = await fetch(`${href}/@default`);
        const fullObject = await response.json();
        const module = await import(`/db/my-app${fullObject.view}`);
        component = module.default;
        context = fullObject.data;
    }
</script>
<svelte:component this={component} context={context}></svelte:component>