/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	text,
	toggle_class
} from "/~/libs/svelte/internal/index.mjs";

function create_if_block(ctx) {
	let small;
	let t_value = (/*error*/ ctx[7] || /*hint*/ ctx[3]) + "";
	let t;
	let small_id_value;

	return {
		c() {
			small = element("small");
			t = text(t_value);
			attr(small, "aria-live", "polite");
			attr(small, "class", "pa-field-help");
			attr(small, "id", small_id_value = /*id*/ ctx[1] + "-hint");
			toggle_class(small, "pa-field-help-error", !!/*error*/ ctx[7]);
		},
		m(target, anchor) {
			insert(target, small, anchor);
			append(small, t);
		},
		p(ctx, dirty) {
			if (dirty & /*error, hint*/ 136 && t_value !== (t_value = (/*error*/ ctx[7] || /*hint*/ ctx[3]) + "")) set_data(t, t_value);

			if (dirty & /*id*/ 2 && small_id_value !== (small_id_value = /*id*/ ctx[1] + "-hint")) {
				attr(small, "id", small_id_value);
			}

			if (dirty & /*error*/ 128) {
				toggle_class(small, "pa-field-help-error", !!/*error*/ ctx[7]);
			}
		},
		d(detaching) {
			if (detaching) detach(small);
		}
	};
}

function create_fragment(ctx) {
	let pa_checkbox;
	let div1;
	let div0;
	let input;
	let input_checked_value;
	let input_aria_describedby_value;
	let input_aria_checked_value;
	let t0;
	let label_1;
	let t1;
	let t2;
	let mounted;
	let dispose;
	let if_block = (/*hint*/ ctx[3] || /*error*/ ctx[7]) && create_if_block(ctx);

	return {
		c() {
			pa_checkbox = element("pa-checkbox");
			div1 = element("div");
			div0 = element("div");
			input = element("input");
			t0 = space();
			label_1 = element("label");
			t1 = text(/*label*/ ctx[2]);
			t2 = space();
			if (if_block) if_block.c();
			attr(input, "type", "checkbox");
			attr(input, "class", "pa-toggle-control pa-no-browser-accessibility-styling");
			attr(input, "id", /*id*/ ctx[1]);
			attr(input, "name", /*id*/ ctx[1]);
			input.value = /*value*/ ctx[6];
			input.checked = input_checked_value = /*group*/ ctx[0].includes(/*value*/ ctx[6]);
			input.disabled = /*disabled*/ ctx[4];
			input.readOnly = /*readonly*/ ctx[5];
			attr(input, "aria-describedby", input_aria_describedby_value = (/*hint*/ ctx[3] || /*error*/ ctx[7]) && /*id*/ ctx[1] + "-hint");
			attr(input, "aria-checked", input_aria_checked_value = /*group*/ ctx[0].includes(/*value*/ ctx[6]));
			attr(input, "tabindex", "0");
			toggle_class(input, "pa-field-error", !!/*error*/ ctx[7]);
			attr(label_1, "class", "pa-toggle-label");
			attr(label_1, "for", /*id*/ ctx[1]);
			attr(div0, "class", "pa-checkbox-wrapper");
			attr(div1, "class", "pa-toggle");
		},
		m(target, anchor) {
			insert(target, pa_checkbox, anchor);
			append(pa_checkbox, div1);
			append(div1, div0);
			append(div0, input);
			append(div0, t0);
			append(div0, label_1);
			append(label_1, t1);
			append(div1, t2);
			if (if_block) if_block.m(div1, null);

			if (!mounted) {
				dispose = listen(input, "change", /*onChange*/ ctx[8]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*id*/ 2) {
				attr(input, "id", /*id*/ ctx[1]);
			}

			if (dirty & /*id*/ 2) {
				attr(input, "name", /*id*/ ctx[1]);
			}

			if (dirty & /*value*/ 64) {
				input.value = /*value*/ ctx[6];
			}

			if (dirty & /*group, value*/ 65 && input_checked_value !== (input_checked_value = /*group*/ ctx[0].includes(/*value*/ ctx[6]))) {
				input.checked = input_checked_value;
			}

			if (dirty & /*disabled*/ 16) {
				input.disabled = /*disabled*/ ctx[4];
			}

			if (dirty & /*readonly*/ 32) {
				input.readOnly = /*readonly*/ ctx[5];
			}

			if (dirty & /*hint, error, id*/ 138 && input_aria_describedby_value !== (input_aria_describedby_value = (/*hint*/ ctx[3] || /*error*/ ctx[7]) && /*id*/ ctx[1] + "-hint")) {
				attr(input, "aria-describedby", input_aria_describedby_value);
			}

			if (dirty & /*group, value*/ 65 && input_aria_checked_value !== (input_aria_checked_value = /*group*/ ctx[0].includes(/*value*/ ctx[6]))) {
				attr(input, "aria-checked", input_aria_checked_value);
			}

			if (dirty & /*error*/ 128) {
				toggle_class(input, "pa-field-error", !!/*error*/ ctx[7]);
			}

			if (dirty & /*label*/ 4) set_data(t1, /*label*/ ctx[2]);

			if (dirty & /*id*/ 2) {
				attr(label_1, "for", /*id*/ ctx[1]);
			}

			if (/*hint*/ ctx[3] || /*error*/ ctx[7]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div1, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(pa_checkbox);
			if (if_block) if_block.d();
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { id } = $$props;
	let { label } = $$props;
	let { hint } = $$props;
	let { disabled = false } = $$props;
	let { readonly = false } = $$props;
	let { value } = $$props;
	let { error } = $$props;
	let { group = [] } = $$props;

	function onChange({ target }) {
		const { value, checked } = target;

		if (checked) {
			$$invalidate(0, group = [...group, value]);
		} else {
			$$invalidate(0, group = group.filter(item => item !== value));
		}
	}

	$$self.$$set = $$props => {
		if ("id" in $$props) $$invalidate(1, id = $$props.id);
		if ("label" in $$props) $$invalidate(2, label = $$props.label);
		if ("hint" in $$props) $$invalidate(3, hint = $$props.hint);
		if ("disabled" in $$props) $$invalidate(4, disabled = $$props.disabled);
		if ("readonly" in $$props) $$invalidate(5, readonly = $$props.readonly);
		if ("value" in $$props) $$invalidate(6, value = $$props.value);
		if ("error" in $$props) $$invalidate(7, error = $$props.error);
		if ("group" in $$props) $$invalidate(0, group = $$props.group);
	};

	return [group, id, label, hint, disabled, readonly, value, error, onChange];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			id: 1,
			label: 2,
			hint: 3,
			disabled: 4,
			readonly: 5,
			value: 6,
			error: 7,
			group: 0
		});
	}
}

export default Component;