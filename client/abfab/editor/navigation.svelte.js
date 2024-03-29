/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "/~/libs/svelte/internal/index.mjs";

import { deleteFile, EditorStore } from "./editor.js";
import NavItem from "./navigation.item.svelte";
import AFButton from "../ui/button.svelte";
import { navigateTo } from "/~/abfab/core.js";

function add_css() {
	var style = element("style");
	style.id = "svelte-2clf1z-style";
	style.textContent = ".navigation.svelte-2clf1z.svelte-2clf1z{width:12em;background-color:var(--color-neutral-primary-lighter);padding:0.5em 0.5em 0 0}nav.svelte-2clf1z.svelte-2clf1z{height:calc(100vh - 72px);overflow:auto;font-size:var(--font-size-s)}nav.svelte-2clf1z ul{list-style-type:none;padding:0 0 0 0.5em;margin:0}nav.svelte-2clf1z svg{fill:var(--color-neutral-secondary-light);cursor:hand}nav.svelte-2clf1z ul li:not(.level-1){border-left:1px solid var(--color-neutral-secondary-lighter);padding-left:0.5em;white-space:nowrap}nav.svelte-2clf1z a{color:var(--color-neutral-secondary-default)}nav.svelte-2clf1z a.selected{background-color:var(--color-neutral-secondary-lighter)}.toolbar.svelte-2clf1z.svelte-2clf1z{list-style:none;padding:0;margin:0;text-align:right}.toolbar.svelte-2clf1z li.svelte-2clf1z{display:inline-block}";
	append(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (22:12) {#each $EditorStore.tree as item}
function create_each_block(ctx) {
	let li;
	let navitem;
	let current;
	navitem = new NavItem({ props: { item: /*item*/ ctx[2] } });

	return {
		c() {
			li = element("li");
			create_component(navitem.$$.fragment);
			attr(li, "class", "level-1");
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(navitem, li, null);
			current = true;
		},
		p(ctx, dirty) {
			const navitem_changes = {};
			if (dirty & /*$EditorStore*/ 1) navitem_changes.item = /*item*/ ctx[2];
			navitem.$set(navitem_changes);
		},
		i(local) {
			if (current) return;
			transition_in(navitem.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(navitem.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(navitem);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let ul0;
	let li0;
	let afbutton0;
	let t0;
	let li1;
	let afbutton1;
	let t1;
	let nav;
	let ul1;
	let current;

	afbutton0 = new AFButton({
			props: {
				kind: "primary",
				aspect: "basic",
				icon: "plus",
				label: "Add",
				size: "small"
			}
		});

	afbutton1 = new AFButton({
			props: {
				kind: "primary",
				aspect: "basic",
				icon: "trash",
				label: "Remove",
				size: "small"
			}
		});

	afbutton1.$on("click", /*deleteSelected*/ ctx[1]);
	let each_value = /*$EditorStore*/ ctx[0].tree;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");
			ul0 = element("ul");
			li0 = element("li");
			create_component(afbutton0.$$.fragment);
			t0 = space();
			li1 = element("li");
			create_component(afbutton1.$$.fragment);
			t1 = space();
			nav = element("nav");
			ul1 = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(li0, "class", "svelte-2clf1z");
			attr(li1, "class", "svelte-2clf1z");
			attr(ul0, "class", "toolbar svelte-2clf1z");
			attr(nav, "class", "svelte-2clf1z");
			attr(div, "class", "navigation svelte-2clf1z");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, ul0);
			append(ul0, li0);
			mount_component(afbutton0, li0, null);
			append(ul0, t0);
			append(ul0, li1);
			mount_component(afbutton1, li1, null);
			append(div, t1);
			append(div, nav);
			append(nav, ul1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul1, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*$EditorStore*/ 1) {
				each_value = /*$EditorStore*/ ctx[0].tree;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(afbutton0.$$.fragment, local);
			transition_in(afbutton1.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(afbutton0.$$.fragment, local);
			transition_out(afbutton1.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(afbutton0);
			destroy_component(afbutton1);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $EditorStore;
	component_subscribe($$self, EditorStore, $$value => $$invalidate(0, $EditorStore = $$value));

	function deleteSelected() {
		const path = window.location.pathname.replace("/@edit", "");

		if (confirm(`Delete ${path}?`)) {
			deleteFile(path);
			navigateTo(path.split("/").slice(0, -1).join("/") + "/@edit");
		}
	}

	return [$EditorStore, deleteSelected];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-2clf1z-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;