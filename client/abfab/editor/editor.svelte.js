/* generated by Svelte v3.37.0 */
import {
	SvelteComponent,
	append,
	attr,
	binding_callbacks,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	detach,
	element,
	group_outros,
	init,
	insert,
	mount_component,
	noop,
	safe_not_equal,
	space,
	toggle_class,
	transition_in,
	transition_out
} from "/node_modules/svelte/internal/index.mjs";

import VimEditor from "./vim.svelte";
import Viewer from "./viewer.svelte";
import AFButton from "../ui/button.svelte";
import Toolbar from "./toolbar.svelte";
import Navigation from "./navigation.svelte";
import { showNavigation, loadTree } from "./editor.js";
import { onMount } from "/node_modules/svelte/index.mjs";

function add_css() {
	var style = element("style");
	style.id = "svelte-dt76zw-style";
	style.textContent = "ul.svelte-dt76zw.svelte-dt76zw{list-style-type:none;margin:0;padding:0;text-align:center}header.svelte-dt76zw.svelte-dt76zw{height:2em;display:flex;align-items:center}header.svelte-dt76zw img.svelte-dt76zw{height:2em;padding:0.2em;margin-left:0.2em}header.svelte-dt76zw ul.svelte-dt76zw{margin-left:auto;margin-right:1em;display:flex}main.svelte-dt76zw.svelte-dt76zw{display:flex}.editor-container.svelte-dt76zw.svelte-dt76zw{display:flex;flex-direction:column;height:calc(100vh - 2.5em);width:calc(100vw - 3.5em);margin:0px;padding:0px;overflow:hidden}.editor-container.half.svelte-dt76zw.svelte-dt76zw{width:50vw}.editor-container.with-nav.svelte-dt76zw.svelte-dt76zw{width:calc(100vw - 14em)}.editor-container.half.with-nav.svelte-dt76zw.svelte-dt76zw{width:calc(50vw - 10em)}";
	append(document.head, style);
}

// (37:8) {#if play}
function create_if_block_2(ctx) {
	let li;
	let afbutton;
	let current;

	afbutton = new AFButton({
			props: {
				aspect: "basic",
				icon: "refresh",
				label: "Refresh",
				size: "small"
			}
		});

	afbutton.$on("click", /*refreshViewer*/ ctx[6]);

	return {
		c() {
			li = element("li");
			create_component(afbutton.$$.fragment);
		},
		m(target, anchor) {
			insert(target, li, anchor);
			mount_component(afbutton, li, null);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(afbutton.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(afbutton.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(li);
			destroy_component(afbutton);
		}
	};
}

// (51:4) {#if $showNavigation}
function create_if_block_1(ctx) {
	let navigation;
	let current;
	navigation = new Navigation({});

	return {
		c() {
			create_component(navigation.$$.fragment);
		},
		m(target, anchor) {
			mount_component(navigation, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(navigation.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(navigation.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(navigation, detaching);
		}
	};
}

// (57:4) {#if play}
function create_if_block(ctx) {
	let viewer_1;
	let current;
	let viewer_1_props = { componentPath: /*componentPath*/ ctx[2] };
	viewer_1 = new Viewer({ props: viewer_1_props });
	/*viewer_1_binding*/ ctx[7](viewer_1);

	return {
		c() {
			create_component(viewer_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(viewer_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const viewer_1_changes = {};
			if (dirty & /*componentPath*/ 4) viewer_1_changes.componentPath = /*componentPath*/ ctx[2];
			viewer_1.$set(viewer_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(viewer_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(viewer_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			/*viewer_1_binding*/ ctx[7](null);
			destroy_component(viewer_1, detaching);
		}
	};
}

function create_fragment(ctx) {
	let link;
	let t0;
	let header;
	let img;
	let img_src_value;
	let t1;
	let ul;
	let t2;
	let li;
	let afbutton;
	let t3;
	let main;
	let toolbar;
	let t4;
	let t5;
	let div;
	let vimeditor;
	let div_class_value;
	let t6;
	let current;
	let if_block0 = /*play*/ ctx[1] && create_if_block_2(ctx);

	afbutton = new AFButton({
			props: {
				kind: "primary",
				aspect: "basic",
				icon: "play",
				label: "Play",
				size: "small",
				active: /*play*/ ctx[1]
			}
		});

	afbutton.$on("click", /*togglePlay*/ ctx[5]);
	toolbar = new Toolbar({});
	let if_block1 = /*$showNavigation*/ ctx[4] && create_if_block_1(ctx);
	vimeditor = new VimEditor({ props: { context: /*context*/ ctx[0] } });
	vimeditor.$on("save", /*refreshViewer*/ ctx[6]);
	let if_block2 = /*play*/ ctx[1] && create_if_block(ctx);

	return {
		c() {
			link = element("link");
			t0 = space();
			header = element("header");
			img = element("img");
			t1 = space();
			ul = element("ul");
			if (if_block0) if_block0.c();
			t2 = space();
			li = element("li");
			create_component(afbutton.$$.fragment);
			t3 = space();
			main = element("main");
			create_component(toolbar.$$.fragment);
			t4 = space();
			if (if_block1) if_block1.c();
			t5 = space();
			div = element("div");
			create_component(vimeditor.$$.fragment);
			t6 = space();
			if (if_block2) if_block2.c();
			attr(link, "rel", "stylesheet");
			attr(link, "href", "/abfab/pastanaga/pastanaga.css");
			if (img.src !== (img_src_value = "/abfab/abfab.svg")) attr(img, "src", img_src_value);
			attr(img, "alt", "AbFab logo");
			attr(img, "class", "svelte-dt76zw");
			attr(ul, "class", "svelte-dt76zw");
			attr(header, "class", "svelte-dt76zw");
			attr(div, "class", div_class_value = "editor-container " + (/*play*/ ctx[1] ? "half" : "") + " svelte-dt76zw");
			toggle_class(div, "with-nav", /*$showNavigation*/ ctx[4]);
			attr(main, "class", "svelte-dt76zw");
		},
		m(target, anchor) {
			append(document.head, link);
			insert(target, t0, anchor);
			insert(target, header, anchor);
			append(header, img);
			append(header, t1);
			append(header, ul);
			if (if_block0) if_block0.m(ul, null);
			append(ul, t2);
			append(ul, li);
			mount_component(afbutton, li, null);
			insert(target, t3, anchor);
			insert(target, main, anchor);
			mount_component(toolbar, main, null);
			append(main, t4);
			if (if_block1) if_block1.m(main, null);
			append(main, t5);
			append(main, div);
			mount_component(vimeditor, div, null);
			append(main, t6);
			if (if_block2) if_block2.m(main, null);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*play*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*play*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(ul, t2);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const afbutton_changes = {};
			if (dirty & /*play*/ 2) afbutton_changes.active = /*play*/ ctx[1];
			afbutton.$set(afbutton_changes);

			if (/*$showNavigation*/ ctx[4]) {
				if (if_block1) {
					if (dirty & /*$showNavigation*/ 16) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(main, t5);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			const vimeditor_changes = {};
			if (dirty & /*context*/ 1) vimeditor_changes.context = /*context*/ ctx[0];
			vimeditor.$set(vimeditor_changes);

			if (!current || dirty & /*play*/ 2 && div_class_value !== (div_class_value = "editor-container " + (/*play*/ ctx[1] ? "half" : "") + " svelte-dt76zw")) {
				attr(div, "class", div_class_value);
			}

			if (dirty & /*play, $showNavigation*/ 18) {
				toggle_class(div, "with-nav", /*$showNavigation*/ ctx[4]);
			}

			if (/*play*/ ctx[1]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*play*/ 2) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(main, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(afbutton.$$.fragment, local);
			transition_in(toolbar.$$.fragment, local);
			transition_in(if_block1);
			transition_in(vimeditor.$$.fragment, local);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(afbutton.$$.fragment, local);
			transition_out(toolbar.$$.fragment, local);
			transition_out(if_block1);
			transition_out(vimeditor.$$.fragment, local);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			detach(link);
			if (detaching) detach(t0);
			if (detaching) detach(header);
			if (if_block0) if_block0.d();
			destroy_component(afbutton);
			if (detaching) detach(t3);
			if (detaching) detach(main);
			destroy_component(toolbar);
			if (if_block1) if_block1.d();
			destroy_component(vimeditor);
			if (if_block2) if_block2.d();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $showNavigation;
	component_subscribe($$self, showNavigation, $$value => $$invalidate(4, $showNavigation = $$value));
	let { context } = $$props;
	let play = false;
	let componentPath;
	let viewer;

	function togglePlay() {
		$$invalidate(2, componentPath = location.pathname.replace("/@edit", ""));
		$$invalidate(1, play = !play);
		window.dispatchEvent(new Event("resize"));
	}

	function refreshViewer() {
		if (viewer) {
			viewer.refresh();
		}
	}

	onMount(() => loadTree());

	function viewer_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			viewer = $$value;
			$$invalidate(3, viewer);
		});
	}

	$$self.$$set = $$props => {
		if ("context" in $$props) $$invalidate(0, context = $$props.context);
	};

	return [
		context,
		play,
		componentPath,
		viewer,
		$showNavigation,
		togglePlay,
		refreshViewer,
		viewer_1_binding
	];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-dt76zw-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, { context: 0 });
	}
}

export default Component;