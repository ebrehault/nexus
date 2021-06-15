/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	append,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_data,
	text
} from "/db/my-app/node_modules/svelte/internal";

function create_fragment(ctx) {
	let h1;
	let t0;
	let t1;
	let t2;

	return {
		c() {
			h1 = element("h1");
			t0 = text("Rendering ");
			t1 = text(/*year*/ ctx[0]);
			t2 = text("!");
		},
		m(target, anchor) {
			insert(target, h1, anchor);
			append(h1, t0);
			append(h1, t1);
			append(h1, t2);
		},
		p(ctx, [dirty]) {
			if (dirty & /*year*/ 1) set_data(t1, /*year*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(h1);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { year } = $$props;

	$$self.$$set = $$props => {
		if ("year" in $$props) $$invalidate(0, year = $$props.year);
	};

	return [year];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { year: 0 });
	}
}

export default Component;