/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	check_outros,
	create_component,
	destroy_component,
	detach,
	empty,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out
} from "/~/node_modules/svelte/internal/index.mjs";

import { AbFabStore, get_root_path } from "/~/abfab/core.js";
import { onDestroy } from "/~/node_modules/svelte/index.mjs";
import { derived } from "/~/node_modules/svelte/store/index.mjs";

function create_fragment(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*component*/ ctx[0];

	function switch_props(ctx) {
		return { props: { context: /*context*/ ctx[1] } };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const switch_instance_changes = {};
			if (dirty & /*context*/ 2) switch_instance_changes.context = /*context*/ ctx[1];

			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function find_anchor(node) {
	while (node && node.nodeName.toUpperCase() !== "A") node = node.parentNode;
	return node;
}

function instance($$self, $$props, $$invalidate) {
	let { component } = $$props;
	let { context } = $$props;

	// Adapted from https://github.com/sveltejs/kit/blob/master/packages/kit/src/runtime/client/router.js
	if ("scrollRestoration" in history) {
		history.scrollRestoration = "manual";
	}

	addEventListener("beforeunload", () => {
		history.scrollRestoration = "auto";
	});

	addEventListener("load", () => {
		history.scrollRestoration = "manual";
	});

	addEventListener("click", event => {
		if (event.button || event.which !== 1) return;
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		if (event.defaultPrevented) return;
		const a = find_anchor(event.target);
		if (!a) return;
		if (!a.href) return;
		const svg = typeof a.href === "object" && a.href.constructor.name === "SVGAnimatedString";
		const href = String(svg ? a.href.baseVal : a.href);

		if (href === location.href) {
			if (!location.hash) event.preventDefault();
			return;
		}

		event.preventDefault();
		navigate(href);
	});

	async function navigate(href) {
		history.pushState({}, "", href);
		const [path, query] = href.split("?");

		const auth = {
			Authorization: "Bearer " + localStorage.getItem("auth")
		};

		if (path.endsWith("/@edit")) {
			const response = await fetch(path.replace("/@edit", "/@edit-data"), { headers: { ...auth } });
			const code = await response.text();
			const module = await import(`/~/abfab/editor/editor.svelte`);
			$$invalidate(1, context = code);
			$$invalidate(0, component = module.default);
		} else {
			const response = await fetch(`${path}/@basic`, { headers: { ...auth } });
			const basicData = await response.json();

			if (basicData.type === "Content") {
				const module = await import(get_root_path(basicData.view));
				$$invalidate(0, component = module.default);
				$$invalidate(1, context = basicData.data);
			} else {
				const module = await import(get_root_path(basicData.path));
				$$invalidate(0, component = module.default);

				if (query) {
					const queryContext = query.split("context=")[1];

					if (queryContext) {
						$$invalidate(1, context = JSON.parse(decodeURIComponent(queryContext)));
					}
				}
			}
		}
	}

	const subscriptions = [];
	const _location = derived(AbFabStore, state => state.location);

	subscriptions.push(_location.subscribe(value => {
		if (value) {
			navigate(value);
		}
	}));

	const _logged = derived(AbFabStore, state => state.logged);

	subscriptions.push(_logged.subscribe(isLogged => {
		if (!isLogged) {
			localStorage.removeItem("auth");
			navigate("/~/abfab/login/login.svelte");
		}
	}));

	onDestroy(() => subscriptions.map(unsubscribe => unsubscribe()));

	$$self.$$set = $$props => {
		if ("component" in $$props) $$invalidate(0, component = $$props.component);
		if ("context" in $$props) $$invalidate(1, context = $$props.context);
	};

	return [component, context];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { component: 0, context: 1 });
	}
}

export default Component;