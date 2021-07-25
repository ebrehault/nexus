/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	append,
	attr,
	check_outros,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	empty,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	noop,
	safe_not_equal,
	set_data,
	space,
	svg_element,
	text,
	transition_in,
	transition_out,
	xlink_attr
} from "/~/node_modules/svelte/internal/index.mjs";

import { updateTreeItem } from "./editor.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[0] = list[i];
	return child_ctx;
}

// (15:0) {:else}
function create_else_block(ctx) {
	let pa_icon;

	return {
		c() {
			pa_icon = element("pa-icon");
			pa_icon.innerHTML = `<svg class="pa-small"><use xlink:href="/~/abfab/pastanaga/icons.svg#file"></use></svg>`;
		},
		m(target, anchor) {
			insert(target, pa_icon, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(pa_icon);
		}
	};
}

// (9:0) {#if item.type === 'Directory' }
function create_if_block_1(ctx) {
	let pa_icon;
	let svg;
	let use;
	let use_xlink_href_value;
	let mounted;
	let dispose;

	return {
		c() {
			pa_icon = element("pa-icon");
			svg = svg_element("svg");
			use = svg_element("use");

			xlink_attr(use, "xlink:href", use_xlink_href_value = "/~/abfab/pastanaga/icons.svg#" + (/*item*/ ctx[0].expanded
			? "chevron-down"
			: "chevron-right"));

			attr(svg, "class", "pa-small");
		},
		m(target, anchor) {
			insert(target, pa_icon, anchor);
			append(pa_icon, svg);
			append(svg, use);

			if (!mounted) {
				dispose = listen(svg, "click", /*toggle*/ ctx[1]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*item*/ 1 && use_xlink_href_value !== (use_xlink_href_value = "/~/abfab/pastanaga/icons.svg#" + (/*item*/ ctx[0].expanded
			? "chevron-down"
			: "chevron-right"))) {
				xlink_attr(use, "xlink:href", use_xlink_href_value);
			}
		},
		d(detaching) {
			if (detaching) detach(pa_icon);
			mounted = false;
			dispose();
		}
	};
}

// (23:0) {#if item.children && item.expanded }
function create_if_block(ctx) {
	let ul;
	let current;
	let each_value = /*item*/ ctx[0].children;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
		},
		m(target, anchor) {
			insert(target, ul, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*item*/ 1) {
				each_value = /*item*/ ctx[0].children;
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
						each_blocks[i].m(ul, null);
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

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(ul);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (25:4) {#each item.children as item}
function create_each_block(ctx) {
	let li;
	let component;
	let current;
	component = new Component({ props: { item: /*item*/ ctx[0] } });

	return {
		c() {
			li = element("li");
			create_component(component.$$.fragment);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(component, li, null);
			current = true;
		},
		p(ctx, dirty) {
			const component_changes = {};
			if (dirty & /*item*/ 1) component_changes.item = /*item*/ ctx[0];
			component.$set(component_changes);
		},
		i(local) {
			if (current) return;
			transition_in(component.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(component.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(component);
		}
	};
}

function create_fragment(ctx) {
	let t0;
	let a;
	let t1_value = /*item*/ ctx[0].name + "";
	let t1;
	let a_href_value;
	let t2;
	let if_block1_anchor;
	let current;

	function select_block_type(ctx, dirty) {
		if (/*item*/ ctx[0].type === "Directory") return create_if_block_1;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx, -1);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*item*/ ctx[0].children && /*item*/ ctx[0].expanded && create_if_block(ctx);

	return {
		c() {
			if_block0.c();
			t0 = space();
			a = element("a");
			t1 = text(t1_value);
			t2 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(a, "href", a_href_value = `${/*item*/ ctx[0].path}/@edit`);
		},
		m(target, anchor) {
			if_block0.m(target, anchor);
			insert(target, t0, anchor);
			insert(target, a, anchor);
			append(a, t1);
			insert(target, t2, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(t0.parentNode, t0);
				}
			}

			if ((!current || dirty & /*item*/ 1) && t1_value !== (t1_value = /*item*/ ctx[0].name + "")) set_data(t1, t1_value);

			if (!current || dirty & /*item*/ 1 && a_href_value !== (a_href_value = `${/*item*/ ctx[0].path}/@edit`)) {
				attr(a, "href", a_href_value);
			}

			if (/*item*/ ctx[0].children && /*item*/ ctx[0].expanded) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*item*/ 1) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o(local) {
			transition_out(if_block1);
			current = false;
		},
		d(detaching) {
			if_block0.d(detaching);
			if (detaching) detach(t0);
			if (detaching) detach(a);
			if (detaching) detach(t2);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach(if_block1_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { item } = $$props;

	const toggle = () => {
		updateTreeItem({ ...item, expanded: !item.expanded });
	};

	$$self.$$set = $$props => {
		if ("item" in $$props) $$invalidate(0, item = $$props.item);
	};

	return [item, toggle];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { item: 0 });
	}
}

export default Component;