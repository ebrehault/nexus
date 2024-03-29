/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	append,
	attr,
	bubble,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	set_input_value,
	space,
	text,
	toggle_class
} from "/~/libs/svelte/internal/index.mjs";

function create_if_block(ctx) {
	let small;
	let t_value = (/*error*/ ctx[7] || /*hint*/ ctx[4]) + "";
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
			if (dirty & /*error, hint*/ 144 && t_value !== (t_value = (/*error*/ ctx[7] || /*hint*/ ctx[4]) + "")) set_data(t, t_value);

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
	let div;
	let textarea;
	let textarea_aria_describedby_value;
	let t0;
	let label_1;
	let t1;
	let t2;
	let mounted;
	let dispose;
	let if_block = (/*hint*/ ctx[4] || /*error*/ ctx[7]) && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			textarea = element("textarea");
			t0 = space();
			label_1 = element("label");
			t1 = text(/*label*/ ctx[2]);
			t2 = space();
			if (if_block) if_block.c();
			attr(textarea, "class", "pa-field-control pa-field-textarea");
			attr(textarea, "id", /*id*/ ctx[1]);
			attr(textarea, "name", /*id*/ ctx[1]);
			attr(textarea, "placeholder", /*placeholder*/ ctx[3]);
			textarea.disabled = /*disabled*/ ctx[5];
			textarea.readOnly = /*readonly*/ ctx[6];
			attr(textarea, "aria-describedby", textarea_aria_describedby_value = (/*hint*/ ctx[4] || /*error*/ ctx[7]) && /*id*/ ctx[1] + "-hint");
			toggle_class(textarea, "pa-field-control-filled", !!/*value*/ ctx[0]);
			toggle_class(textarea, "pa-field-error", !!/*error*/ ctx[7]);
			attr(label_1, "class", "pa-field-label");
			attr(label_1, "for", /*id*/ ctx[1]);
			attr(div, "class", "pa-field");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, textarea);
			set_input_value(textarea, /*value*/ ctx[0]);
			append(div, t0);
			append(div, label_1);
			append(label_1, t1);
			append(div, t2);
			if (if_block) if_block.m(div, null);

			if (!mounted) {
				dispose = [
					listen(textarea, "input", /*textarea_input_handler*/ ctx[15]),
					listen(textarea, "input", /*input_handler*/ ctx[8]),
					listen(textarea, "keyup", /*keyup_handler*/ ctx[9]),
					listen(textarea, "change", /*change_handler*/ ctx[10]),
					listen(textarea, "keypress", /*keypress_handler*/ ctx[11]),
					listen(textarea, "keydown", /*keydown_handler*/ ctx[12]),
					listen(textarea, "focus", /*focus_handler*/ ctx[13]),
					listen(textarea, "blur", /*blur_handler*/ ctx[14])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*id*/ 2) {
				attr(textarea, "id", /*id*/ ctx[1]);
			}

			if (dirty & /*id*/ 2) {
				attr(textarea, "name", /*id*/ ctx[1]);
			}

			if (dirty & /*placeholder*/ 8) {
				attr(textarea, "placeholder", /*placeholder*/ ctx[3]);
			}

			if (dirty & /*disabled*/ 32) {
				textarea.disabled = /*disabled*/ ctx[5];
			}

			if (dirty & /*readonly*/ 64) {
				textarea.readOnly = /*readonly*/ ctx[6];
			}

			if (dirty & /*hint, error, id*/ 146 && textarea_aria_describedby_value !== (textarea_aria_describedby_value = (/*hint*/ ctx[4] || /*error*/ ctx[7]) && /*id*/ ctx[1] + "-hint")) {
				attr(textarea, "aria-describedby", textarea_aria_describedby_value);
			}

			if (dirty & /*value*/ 1) {
				set_input_value(textarea, /*value*/ ctx[0]);
			}

			if (dirty & /*value*/ 1) {
				toggle_class(textarea, "pa-field-control-filled", !!/*value*/ ctx[0]);
			}

			if (dirty & /*error*/ 128) {
				toggle_class(textarea, "pa-field-error", !!/*error*/ ctx[7]);
			}

			if (dirty & /*label*/ 4) set_data(t1, /*label*/ ctx[2]);

			if (dirty & /*id*/ 2) {
				attr(label_1, "for", /*id*/ ctx[1]);
			}

			if (/*hint*/ ctx[4] || /*error*/ ctx[7]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { id } = $$props;
	let { label } = $$props;
	let { placeholder } = $$props;
	let { hint } = $$props;
	let { disabled = false } = $$props;
	let { readonly = false } = $$props;
	let { value } = $$props;
	let { error } = $$props;

	function input_handler(event) {
		bubble($$self, event);
	}

	function keyup_handler(event) {
		bubble($$self, event);
	}

	function change_handler(event) {
		bubble($$self, event);
	}

	function keypress_handler(event) {
		bubble($$self, event);
	}

	function keydown_handler(event) {
		bubble($$self, event);
	}

	function focus_handler(event) {
		bubble($$self, event);
	}

	function blur_handler(event) {
		bubble($$self, event);
	}

	function textarea_input_handler() {
		value = this.value;
		$$invalidate(0, value);
	}

	$$self.$$set = $$props => {
		if ("id" in $$props) $$invalidate(1, id = $$props.id);
		if ("label" in $$props) $$invalidate(2, label = $$props.label);
		if ("placeholder" in $$props) $$invalidate(3, placeholder = $$props.placeholder);
		if ("hint" in $$props) $$invalidate(4, hint = $$props.hint);
		if ("disabled" in $$props) $$invalidate(5, disabled = $$props.disabled);
		if ("readonly" in $$props) $$invalidate(6, readonly = $$props.readonly);
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
		if ("error" in $$props) $$invalidate(7, error = $$props.error);
	};

	return [
		value,
		id,
		label,
		placeholder,
		hint,
		disabled,
		readonly,
		error,
		input_handler,
		keyup_handler,
		change_handler,
		keypress_handler,
		keydown_handler,
		focus_handler,
		blur_handler,
		textarea_input_handler
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			id: 1,
			label: 2,
			placeholder: 3,
			hint: 4,
			disabled: 5,
			readonly: 6,
			value: 0,
			error: 7
		});
	}
}

export default Component;