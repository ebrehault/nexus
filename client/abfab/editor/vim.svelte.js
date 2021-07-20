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
	empty,
	globals,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	set_data,
	space,
	text,
	toggle_class,
	transition_in,
	transition_out
} from "/node_modules/svelte/internal/index.mjs";

const { document: document_1 } = globals;

import {
	VimWasm,
	checkBrowserCompatibility
} from "/node_modules/vim-wasm/vimwasm.js";

import { compile } from "/node_modules/svelte/compiler.mjs";
import { saveFile, EditorStore } from "./editor.js";
import { createEventDispatcher, onDestroy } from "/node_modules/svelte/index.mjs";
import AFButton from "../ui/button.svelte";

function add_css() {
	var style = element("style");
	style.id = "svelte-e1luf6-style";
	style.textContent = "#vim-editor.svelte-e1luf6.svelte-e1luf6{margin:0px;width:100%;height:100%;background-color:#282c33}#vim-editor.has-error.svelte-e1luf6.svelte-e1luf6{height:80%}#vim-canvas.svelte-e1luf6.svelte-e1luf6{padding:0px;width:100%;height:100%}#vim-input.svelte-e1luf6.svelte-e1luf6{width:1px;color:transparent;background-color:transparent;padding:0px;border:0px;outline:none;vertical-align:middle;position:absolute;top:0px;left:0px}.errors-container.svelte-e1luf6.svelte-e1luf6{overflow:auto;position:relative}.errors.svelte-e1luf6.svelte-e1luf6{height:100%;overflow:auto;font-size:var(--font-size-xs)}.errors.svelte-e1luf6 div.svelte-e1luf6{color:var(--color-accent-primary-lightest);padding:0.25em}.errors.svelte-e1luf6 .error.svelte-e1luf6{background-color:var(--color-accent-secondary-dark)}.errors.svelte-e1luf6 .warning.svelte-e1luf6{background-color:var(--color-accent-secondary-default)}.errors.svelte-e1luf6 code.svelte-e1luf6{display:block;white-space:pre-wrap;padding:0.25em;margin:0.25em;color:var(--color-neutral-primary-lighter)}.discard-button.svelte-e1luf6.svelte-e1luf6{position:absolute;top:0;right:0;padding:0.25em}";
	append(document_1.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

// (219:0) {#if hasError }
function create_if_block(ctx) {
	let div1;
	let span;
	let afbutton;
	let t0;
	let div0;
	let t1;
	let current;

	afbutton = new AFButton({
			props: {
				aspect: "solid",
				icon: "cross",
				label: "Discard",
				size: "small"
			}
		});

	afbutton.$on("click", /*discardErrors*/ ctx[3]);
	let if_block = /*error*/ ctx[0] && create_if_block_1(ctx);
	let each_value = /*warnings*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div1 = element("div");
			span = element("span");
			create_component(afbutton.$$.fragment);
			t0 = space();
			div0 = element("div");
			if (if_block) if_block.c();
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(span, "class", "discard-button svelte-e1luf6");
			attr(div0, "class", "errors svelte-e1luf6");
			attr(div1, "class", "errors-container svelte-e1luf6");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, span);
			mount_component(afbutton, span, null);
			append(div1, t0);
			append(div1, div0);
			if (if_block) if_block.m(div0, null);
			append(div0, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (/*error*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(div0, t1);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*warnings*/ 2) {
				each_value = /*warnings*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
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
			if (detaching) detach(div1);
			destroy_component(afbutton);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
		}
	};
}

// (226:8) {#if error}
function create_if_block_1(ctx) {
	let div;
	let t0_value = /*error*/ ctx[0].message + "";
	let t0;
	let code;
	let t1_value = /*error*/ ctx[0].frame + "";
	let t1;

	return {
		c() {
			div = element("div");
			t0 = text(t0_value);
			code = element("code");
			t1 = text(t1_value);
			attr(code, "class", "svelte-e1luf6");
			attr(div, "class", "error svelte-e1luf6");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, code);
			append(code, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*error*/ 1 && t0_value !== (t0_value = /*error*/ ctx[0].message + "")) set_data(t0, t0_value);
			if (dirty & /*error*/ 1 && t1_value !== (t1_value = /*error*/ ctx[0].frame + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (227:8) {#each warnings as warning}
function create_each_block(ctx) {
	let div;
	let t0_value = /*warning*/ ctx[10].message + "";
	let t0;
	let t1;
	let code;
	let t2_value = /*warning*/ ctx[10].frame + "";
	let t2;
	let t3;

	return {
		c() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			code = element("code");
			t2 = text(t2_value);
			t3 = space();
			attr(code, "class", "svelte-e1luf6");
			attr(div, "class", "warning svelte-e1luf6");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			append(div, code);
			append(code, t2);
			append(div, t3);
		},
		p(ctx, dirty) {
			if (dirty & /*warnings*/ 2 && t0_value !== (t0_value = /*warning*/ ctx[10].message + "")) set_data(t0, t0_value);
			if (dirty & /*warnings*/ 2 && t2_value !== (t2_value = /*warning*/ ctx[10].frame + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let t1;
	let if_block_anchor;
	let current;
	let if_block = /*hasError*/ ctx[2] && create_if_block(ctx);

	return {
		c() {
			div = element("div");

			div.innerHTML = `<canvas id="vim-canvas" class="svelte-e1luf6"></canvas> 
    <input id="vim-input" autocomplete="off" autofocus="" class="svelte-e1luf6"/>`;

			t1 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr(div, "id", "vim-editor");
			attr(div, "class", "svelte-e1luf6");
			toggle_class(div, "has-error", /*hasError*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			insert(target, t1, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*hasError*/ 4) {
				toggle_class(div, "has-error", /*hasError*/ ctx[2]);
			}

			if (/*hasError*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*hasError*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
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
			if (detaching) detach(div);
			if (detaching) detach(t1);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function updateErrors() {
	window.dispatchEvent(new Event("resize"));
}

function instance($$self, $$props, $$invalidate) {
	let hasError;
	let $EditorStore;
	component_subscribe($$self, EditorStore, $$value => $$invalidate(7, $EditorStore = $$value));
	let { context } = $$props;
	let error;
	let warnings = [];
	let vim;
	let pathname = location.pathname.replace("/@edit", "");

	function discardErrors() {
		$$invalidate(0, error = undefined);
		$$invalidate(1, warnings = []);
		updateErrors();
	}

	const dispatch = createEventDispatcher();

	function initVim() {
		console.log(`Wheels on fire,\nRolling down the road.\nBest notify my next of kin\nThis wheel shall explode!\n\n`);
		const RE = new RegExp(/from "(.+\/svelte(\/\w+){0,1})";/g);
		const filename = pathname.split("/").pop();
		const isSvelte = filename.endsWith(".svelte");
		const errmsg = checkBrowserCompatibility();

		if (errmsg !== undefined) {
			alert(errmsg);
		}

		const screenCanvasElement = document.getElementById("vim-canvas");

		$$invalidate(5, vim = new VimWasm({
				canvas: screenCanvasElement,
				input: document.getElementById("vim-input"),
				workerScriptPath: "/node_modules/vim-wasm/vim.js"
			}));

		// Handle drag and drop
		function cancel(e) {
			e.stopPropagation();
			e.preventDefault();
		}

		screenCanvasElement.addEventListener(
			"dragover",
			e => {
				cancel(e);

				if (e.dataTransfer) {
					e.dataTransfer.dropEffect = "copy";
				}
			},
			false
		);

		screenCanvasElement.addEventListener(
			"drop",
			e => {
				cancel(e);

				if (e.dataTransfer) {
					vim.dropFiles(e.dataTransfer.files).catch(console.error);
				}
			},
			false
		);

		$$invalidate(
			5,
			vim.onVimExit = status => {
				alert(`Vim exited with status ${status}`);
			},
			vim
		);

		$$invalidate(
			5,
			vim.onFileExport = (fullpath, contents) => {
				const ABFAB_ROOT = "";
				let js = "";

				if (isSvelte) {
					try {
						const decoder = new TextDecoder("utf-8");
						const source = decoder.decode(contents);

						const result = compile(source, {
							sveltePath: ABFAB_ROOT + "/node_modules/svelte"
						});

						$$invalidate(0, error = undefined);
						js = result.js;
						const warningsFixed = result.warnings.length === 0 && warnings.length > 0;
						$$invalidate(1, warnings = result.warnings);

						if (warningsFixed) {
							updateErrors();
						}
					} catch(e) {
						$$invalidate(0, error = e);
					}
				}

				if (!error) {
					saveFile(fullpath, contents).then(() => {
						if (isSvelte) {
							const jsFilePath = fullpath + ".js";
							saveFile(jsFilePath, js.code.replace(RE, "from \"$1/index.mjs\";")).then(() => dispatch("save", { file: fullpath }));
						} else {
							dispatch("save", { file: fullpath });
						}
					});
				}
			},
			vim
		);

		$$invalidate(5, vim.readClipboard = navigator.clipboard.readText, vim);
		$$invalidate(5, vim.onWriteClipboard = navigator.clipboard.writeText, vim);
		$$invalidate(5, vim.onError = console.error, vim);
		const options = ["set number"];

		if (isSvelte) {
			options.push("set filetype=html");
		}

		options.push("autocmd BufWritePost * export");
		const folder = pathname.split("/");

		vim.start({
			// cmdArgs: ['/test.svelte', '-c', 'set number\nset filetype=html'],
			cmdArgs: [pathname, "-c", options.join("\n")],
			dirs: $EditorStore.dirs,
			// dirs: folder.reduce((all, dir, index) => {
			//     all.push(folder.slice(0, index).join('/'));
			//     return all;
			// }, []).slice(2),
			// fetchFiles: { [location.pathname]: 'http://localhost:8080/views/component/render.js' },
			files: { [pathname]: context }, //     '/test.svelte': '<h1>hello, world!</h1>',
			//     // '/.vim/vimrc': 'set number\nset noexpandtab\nau BufRead,BufNewFile *.svelte set filetype=html',
			
		});
	}

	$$self.$$set = $$props => {
		if ("context" in $$props) $$invalidate(4, context = $$props.context);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*vim, $EditorStore*/ 160) {
			$: if (!vim && $EditorStore.dirs.length > 0) {
				initVim();
			}
		}

		if ($$self.$$.dirty & /*error, warnings*/ 3) {
			$: $$invalidate(2, hasError = !!error || warnings.length > 0);
		}

		if ($$self.$$.dirty & /*hasError*/ 4) {
			$: if (hasError) {
				updateErrors();
			}
		}

		if ($$self.$$.dirty & /*vim, pathname, context*/ 112) {
			$: if (vim) {
				const _pathname = location.pathname.replace("/@edit", "");

				if (_pathname !== pathname) {
					const enc = new TextEncoder();
					vim.dropFile(_pathname.slice(1), enc.encode(context));
					$$invalidate(6, pathname = _pathname);
				}
			}
		}
	};

	return [error, warnings, hasError, discardErrors, context, vim, pathname, $EditorStore];
}

class Component extends SvelteComponent {
	constructor(options) {
		super();
		if (!document_1.getElementById("svelte-e1luf6-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, { context: 4 });
	}
}

export default Component;