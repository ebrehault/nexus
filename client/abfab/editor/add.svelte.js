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
	listen,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "/~/node_modules/svelte/internal/index.mjs";

import AFInput from "/~/abfab/ui/input.svelte";
import AFRadio from "/~/abfab/ui/radio.svelte";
import AFButton from "/~/abfab/ui/button.svelte";
import { addFile } from "./editor.js";
import { navigateTo } from "../core.js";

function add_css() {
	var style = element("style");
	style.id = "svelte-1p9ajj1-style";
	style.textContent = "main.svelte-1p9ajj1.svelte-1p9ajj1{display:flex}main.svelte-1p9ajj1>div.svelte-1p9ajj1{padding:0 1em 1em;width:50%}.drop-zone.svelte-1p9ajj1.svelte-1p9ajj1{position:relative;border:1px dashed var(--color-neutral-secondary-default);text-align:center;height:100%}.upload-field.svelte-1p9ajj1.svelte-1p9ajj1{display:block;width:100%;height:100%;opacity:0;position:absolute;top:0}.add.svelte-1p9ajj1.svelte-1p9ajj1{display:flex}.add.svelte-1p9ajj1 .pa-field{width:100%;margin-bottom:0}";
	append(document.head, style);
}

function create_fragment(ctx) {
	let main;
	let div1;
	let afradio0;
	let updating_group;
	let t0;
	let afradio1;
	let updating_group_1;
	let t1;
	let afradio2;
	let updating_group_2;
	let t2;
	let div0;
	let afinput;
	let updating_value;
	let t3;
	let afbutton;
	let t4;
	let div3;
	let div2;
	let p;
	let t6;
	let input;
	let current;
	let mounted;
	let dispose;

	function afradio0_group_binding(value) {
		/*afradio0_group_binding*/ ctx[5](value);
	}

	let afradio0_props = { label: "File", value: "File" };

	if (/*type*/ ctx[1] !== void 0) {
		afradio0_props.group = /*type*/ ctx[1];
	}

	afradio0 = new AFRadio({ props: afradio0_props });
	binding_callbacks.push(() => bind(afradio0, "group", afradio0_group_binding));

	function afradio1_group_binding(value) {
		/*afradio1_group_binding*/ ctx[6](value);
	}

	let afradio1_props = { label: "Content", value: "Content" };

	if (/*type*/ ctx[1] !== void 0) {
		afradio1_props.group = /*type*/ ctx[1];
	}

	afradio1 = new AFRadio({ props: afradio1_props });
	binding_callbacks.push(() => bind(afradio1, "group", afradio1_group_binding));

	function afradio2_group_binding(value) {
		/*afradio2_group_binding*/ ctx[7](value);
	}

	let afradio2_props = { label: "Directory", value: "Directory" };

	if (/*type*/ ctx[1] !== void 0) {
		afradio2_props.group = /*type*/ ctx[1];
	}

	afradio2 = new AFRadio({ props: afradio2_props });
	binding_callbacks.push(() => bind(afradio2, "group", afradio2_group_binding));

	function afinput_value_binding(value) {
		/*afinput_value_binding*/ ctx[8](value);
	}

	let afinput_props = {
		label: `Create an empty ${/*type*/ ctx[1] === "Directory" ? "directory" : "file"}`,
		placeholder: /*type*/ ctx[1] === "Directory"
		? "my-folder"
		: /*type*/ ctx[1] === "File"
			? "my-file.svelte"
			: "my-content",
		required: true
	};

	if (/*name*/ ctx[0] !== void 0) {
		afinput_props.value = /*name*/ ctx[0];
	}

	afinput = new AFInput({ props: afinput_props });
	binding_callbacks.push(() => bind(afinput, "value", afinput_value_binding));

	afbutton = new AFButton({
			props: {
				size: "small",
				kind: "primary",
				label: "Add"
			}
		});

	afbutton.$on("click", /*add*/ ctx[3]);

	return {
		c() {
			main = element("main");
			div1 = element("div");
			create_component(afradio0.$$.fragment);
			t0 = space();
			create_component(afradio1.$$.fragment);
			t1 = space();
			create_component(afradio2.$$.fragment);
			t2 = space();
			div0 = element("div");
			create_component(afinput.$$.fragment);
			t3 = space();
			create_component(afbutton.$$.fragment);
			t4 = space();
			div3 = element("div");
			div2 = element("div");
			p = element("p");
			p.textContent = "or drag & drop here";
			t6 = space();
			input = element("input");
			attr(div0, "class", "add svelte-1p9ajj1");
			attr(div1, "class", "svelte-1p9ajj1");
			attr(input, "class", "upload-field svelte-1p9ajj1");
			attr(input, "type", "file");
			input.multiple = true;
			attr(div2, "class", "drop-zone svelte-1p9ajj1");
			attr(div3, "class", "svelte-1p9ajj1");
			attr(main, "class", "svelte-1p9ajj1");
		},
		m(target, anchor) {
			insert(target, main, anchor);
			append(main, div1);
			mount_component(afradio0, div1, null);
			append(div1, t0);
			mount_component(afradio1, div1, null);
			append(div1, t1);
			mount_component(afradio2, div1, null);
			append(div1, t2);
			append(div1, div0);
			mount_component(afinput, div0, null);
			append(div0, t3);
			mount_component(afbutton, div0, null);
			append(main, t4);
			append(main, div3);
			append(div3, div2);
			append(div2, p);
			append(div2, t6);
			append(div2, input);
			/*input_binding*/ ctx[9](input);
			current = true;

			if (!mounted) {
				dispose = listen(input, "change", /*uploadFiles*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const afradio0_changes = {};

			if (!updating_group && dirty & /*type*/ 2) {
				updating_group = true;
				afradio0_changes.group = /*type*/ ctx[1];
				add_flush_callback(() => updating_group = false);
			}

			afradio0.$set(afradio0_changes);
			const afradio1_changes = {};

			if (!updating_group_1 && dirty & /*type*/ 2) {
				updating_group_1 = true;
				afradio1_changes.group = /*type*/ ctx[1];
				add_flush_callback(() => updating_group_1 = false);
			}

			afradio1.$set(afradio1_changes);
			const afradio2_changes = {};

			if (!updating_group_2 && dirty & /*type*/ 2) {
				updating_group_2 = true;
				afradio2_changes.group = /*type*/ ctx[1];
				add_flush_callback(() => updating_group_2 = false);
			}

			afradio2.$set(afradio2_changes);
			const afinput_changes = {};
			if (dirty & /*type*/ 2) afinput_changes.label = `Create an empty ${/*type*/ ctx[1] === "Directory" ? "directory" : "file"}`;

			if (dirty & /*type*/ 2) afinput_changes.placeholder = /*type*/ ctx[1] === "Directory"
			? "my-folder"
			: /*type*/ ctx[1] === "File"
				? "my-file.svelte"
				: "my-content";

			if (!updating_value && dirty & /*name*/ 1) {
				updating_value = true;
				afinput_changes.value = /*name*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			afinput.$set(afinput_changes);
		},
		i(local) {
			if (current) return;
			transition_in(afradio0.$$.fragment, local);
			transition_in(afradio1.$$.fragment, local);
			transition_in(afradio2.$$.fragment, local);
			transition_in(afinput.$$.fragment, local);
			transition_in(afbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(afradio0.$$.fragment, local);
			transition_out(afradio1.$$.fragment, local);
			transition_out(afradio2.$$.fragment, local);
			transition_out(afinput.$$.fragment, local);
			transition_out(afbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(main);
			destroy_component(afradio0);
			destroy_component(afradio1);
			destroy_component(afradio2);
			destroy_component(afinput);
			destroy_component(afbutton);
			/*input_binding*/ ctx[9](null);
			mounted = false;
			dispose();
		}
	};
}

async function readFile(reader, file) {
	return new Promise((resolve, reject) => {
			reader.onload = f => {
				resolve([file.name, reader.result]);
			};

			reader.onerror = () => {
				reader.abort();
				reject(new Error(`Error on loading file ${file}`));
			};

			reader.readAsArrayBuffer(file);
		});
}

function instance($$self, $$props, $$invalidate) {
	let name;
	let type = "File";
	let upload;

	async function add() {
		if (name) {
			const containerPath = window.location.pathname.replace("/@edit", "");
			await addFile(containerPath, name, type, "");
			navigateTo(`${containerPath}/${name}/@edit`);
		}
	}

	async function uploadFiles({ target }) {
		const reader = new FileReader();
		const containerPath = window.location.pathname.replace("/@edit", "");

		for (const file of target.files) {
			const [name, contents] = await readFile(reader, file);
			await addFile(containerPath, name, type, contents);
		}
	}

	function afradio0_group_binding(value) {
		type = value;
		$$invalidate(1, type);
	}

	function afradio1_group_binding(value) {
		type = value;
		$$invalidate(1, type);
	}

	function afradio2_group_binding(value) {
		type = value;
		$$invalidate(1, type);
	}

	function afinput_value_binding(value) {
		name = value;
		$$invalidate(0, name);
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			upload = $$value;
			$$invalidate(2, upload);
		});
	}

	return [
		name,
		type,
		upload,
		add,
		uploadFiles,
		afradio0_group_binding,
		afradio1_group_binding,
		afradio2_group_binding,
		afinput_value_binding,
		input_binding
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1p9ajj1-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;