/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	add_flush_callback,
	append,
	attr,
	bind,
	binding_callbacks,
	create_component,
	destroy_component,
	detach,
	element,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	space,
	text,
	transition_in,
	transition_out
} from "/db/my-app/node_modules/svelte/internal/index.mjs";

import AFInput from "/db/my-app/abfab/ui/input.svelte";
import AFButton from "/db/my-app/abfab/ui/button.svelte";

function add_css() {
	var style = element("style");
	style.id = "svelte-1c4lrfc-style";
	style.textContent = "main.svelte-1c4lrfc{display:flex;flex-direction:column;justify-items:center;width:50vw;max-height:100vh;padding:2em;margin:0 auto}.message.svelte-1c4lrfc{padding-bottom:1em;margin:0 auto;color:var(--color-accent-secondary-dark);height:3.5em}";
	append(document.head, style);
}

function create_fragment(ctx) {
	let link;
	let t0;
	let main;
	let img;
	let img_src_value;
	let t1;
	let afinput0;
	let updating_value;
	let t2;
	let afinput1;
	let updating_value_1;
	let t3;
	let div;
	let t4;
	let t5;
	let afbutton;
	let current;

	function afinput0_value_binding(value) {
		/*afinput0_value_binding*/ ctx[4](value);
	}

	let afinput0_props = { id: "username", label: "Username" };

	if (/*username*/ ctx[0] !== void 0) {
		afinput0_props.value = /*username*/ ctx[0];
	}

	afinput0 = new AFInput({ props: afinput0_props });
	binding_callbacks.push(() => bind(afinput0, "value", afinput0_value_binding));

	function afinput1_value_binding(value) {
		/*afinput1_value_binding*/ ctx[5](value);
	}

	let afinput1_props = {
		id: "password",
		type: "password",
		label: "Password"
	};

	if (/*password*/ ctx[1] !== void 0) {
		afinput1_props.value = /*password*/ ctx[1];
	}

	afinput1 = new AFInput({ props: afinput1_props });
	binding_callbacks.push(() => bind(afinput1, "value", afinput1_value_binding));

	afbutton = new AFButton({
			props: { kind: "primary", label: "Login" }
		});

	afbutton.$on("click", /*login*/ ctx[3]);

	return {
		c() {
			link = element("link");
			t0 = space();
			main = element("main");
			img = element("img");
			t1 = space();
			create_component(afinput0.$$.fragment);
			t2 = space();
			create_component(afinput1.$$.fragment);
			t3 = space();
			div = element("div");
			t4 = text(/*error*/ ctx[2]);
			t5 = space();
			create_component(afbutton.$$.fragment);
			attr(link, "rel", "stylesheet");
			attr(link, "href", "/db/my-app/abfab/pastanaga/pastanaga.css");
			if (img.src !== (img_src_value = "../abfab.svg")) attr(img, "src", img_src_value);
			attr(div, "class", "message svelte-1c4lrfc");
			attr(main, "class", "svelte-1c4lrfc");
		},
		m(target, anchor) {
			append(document.head, link);
			insert(target, t0, anchor);
			insert(target, main, anchor);
			append(main, img);
			append(main, t1);
			mount_component(afinput0, main, null);
			append(main, t2);
			mount_component(afinput1, main, null);
			append(main, t3);
			append(main, div);
			append(div, t4);
			append(main, t5);
			mount_component(afbutton, main, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const afinput0_changes = {};

			if (!updating_value && dirty & /*username*/ 1) {
				updating_value = true;
				afinput0_changes.value = /*username*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			afinput0.$set(afinput0_changes);
			const afinput1_changes = {};

			if (!updating_value_1 && dirty & /*password*/ 2) {
				updating_value_1 = true;
				afinput1_changes.value = /*password*/ ctx[1];
				add_flush_callback(() => updating_value_1 = false);
			}

			afinput1.$set(afinput1_changes);
			if (!current || dirty & /*error*/ 4) set_data(t4, /*error*/ ctx[2]);
		},
		i(local) {
			if (current) return;
			transition_in(afinput0.$$.fragment, local);
			transition_in(afinput1.$$.fragment, local);
			transition_in(afbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(afinput0.$$.fragment, local);
			transition_out(afinput1.$$.fragment, local);
			transition_out(afbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			detach(link);
			if (detaching) detach(t0);
			if (detaching) detach(main);
			destroy_component(afinput0);
			destroy_component(afinput1);
			destroy_component(afbutton);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let username;
	let password;
	let error = "";
	const urlParams = new URLSearchParams(window.location.search);
	const redirect = urlParams.get("from") || "/db/my-app/abfab";

	const login = async () => {
		$$invalidate(2, error = "");
		const body = JSON.stringify({ username, password });

		const response = await fetch("/db/my-app/@login", {
			body,
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});

		if (response.status === 200) {
			const body = await response.json();
			localStorage.setItem("auth", body.token);
			location.href = redirect;
		} else {
			$$invalidate(2, error = "Login failed");
		}
	};

	function afinput0_value_binding(value) {
		username = value;
		$$invalidate(0, username);
	}

	function afinput1_value_binding(value) {
		password = value;
		$$invalidate(1, password);
	}

	return [
		username,
		password,
		error,
		login,
		afinput0_value_binding,
		afinput1_value_binding
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1c4lrfc-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;