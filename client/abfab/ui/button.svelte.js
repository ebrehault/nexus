/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	append,
	attr,
	bubble,
	check_outros,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	listen,
	mount_component,
	safe_not_equal,
	set_data,
	space,
	text,
	toggle_class,
	transition_in,
	transition_out
} from "/~/node_modules/svelte/internal/index.mjs";

import AFIcon from "/~/abfab/ui/icon.svelte";

function create_if_block(ctx) {
	let aficon;
	let current;

	aficon = new AFIcon({
			props: {
				size: /*size*/ ctx[2],
				icon: /*icon*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(aficon.$$.fragment);
		},
		m(target, anchor) {
			mount_component(aficon, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const aficon_changes = {};
			if (dirty & /*size*/ 4) aficon_changes.size = /*size*/ ctx[2];
			if (dirty & /*icon*/ 2) aficon_changes.icon = /*icon*/ ctx[1];
			aficon.$set(aficon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(aficon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(aficon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(aficon, detaching);
		}
	};
}

function create_fragment(ctx) {
	let button;
	let span1;
	let t0;
	let span0;
	let t1;
	let button_class_value;
	let current;
	let mounted;
	let dispose;
	let if_block = /*icon*/ ctx[1] && create_if_block(ctx);

	return {
		c() {
			button = element("button");
			span1 = element("span");
			if (if_block) if_block.c();
			t0 = space();
			span0 = element("span");
			t1 = text(/*label*/ ctx[0]);
			attr(span0, "class", "pa-button-label");
			toggle_class(span0, "pa-sr-only", !!/*icon*/ ctx[1]);
			attr(span1, "tabindex", "-1");
			attr(span1, "class", "pa-button-wrapper");
			attr(button, "class", button_class_value = "pa-button pa-" + /*size*/ ctx[2] + " pa-" + /*kind*/ ctx[4] + " pa-" + /*aspect*/ ctx[3]);
			attr(button, "type", "button");
			attr(button, "aria-label", /*label*/ ctx[0]);
			attr(button, "tabindex", "0");
			button.disabled = /*disabled*/ ctx[6];
			toggle_class(button, "pa-active", /*active*/ ctx[5]);
			toggle_class(button, "pa-button-icon", /*icon*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, span1);
			if (if_block) if_block.m(span1, null);
			append(span1, t0);
			append(span1, span0);
			append(span0, t1);
			current = true;

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*icon*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*icon*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(span1, t0);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*label*/ 1) set_data(t1, /*label*/ ctx[0]);

			if (dirty & /*icon*/ 2) {
				toggle_class(span0, "pa-sr-only", !!/*icon*/ ctx[1]);
			}

			if (!current || dirty & /*size, kind, aspect*/ 28 && button_class_value !== (button_class_value = "pa-button pa-" + /*size*/ ctx[2] + " pa-" + /*kind*/ ctx[4] + " pa-" + /*aspect*/ ctx[3])) {
				attr(button, "class", button_class_value);
			}

			if (!current || dirty & /*label*/ 1) {
				attr(button, "aria-label", /*label*/ ctx[0]);
			}

			if (!current || dirty & /*disabled*/ 64) {
				button.disabled = /*disabled*/ ctx[6];
			}

			if (dirty & /*size, kind, aspect, active*/ 60) {
				toggle_class(button, "pa-active", /*active*/ ctx[5]);
			}

			if (dirty & /*size, kind, aspect, icon*/ 30) {
				toggle_class(button, "pa-button-icon", /*icon*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(button);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { label } = $$props;
	let { icon } = $$props;
	let { size = "medium" } = $$props; // small, medium, large
	let { aspect = "solid" } = $$props; // solid or basic
	let { kind = "secondary" } = $$props; // primary, secondary, destructive
	let { active = false } = $$props;
	let { disabled = false } = $$props;

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("label" in $$props) $$invalidate(0, label = $$props.label);
		if ("icon" in $$props) $$invalidate(1, icon = $$props.icon);
		if ("size" in $$props) $$invalidate(2, size = $$props.size);
		if ("aspect" in $$props) $$invalidate(3, aspect = $$props.aspect);
		if ("kind" in $$props) $$invalidate(4, kind = $$props.kind);
		if ("active" in $$props) $$invalidate(5, active = $$props.active);
		if ("disabled" in $$props) $$invalidate(6, disabled = $$props.disabled);
	};

	return [label, icon, size, aspect, kind, active, disabled, click_handler];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			label: 0,
			icon: 1,
			size: 2,
			aspect: 3,
			kind: 4,
			active: 5,
			disabled: 6
		});
	}
}

export default Component;