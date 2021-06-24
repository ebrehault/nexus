/* generated by Svelte v3.37.0 */
import {
    SvelteComponent,
    add_flush_callback,
    add_render_callback,
    add_resize_listener,
    append,
    attr,
    bind,
    binding_callbacks,
    check_outros,
    create_component,
    destroy_component,
    detach,
    element,
    globals,
    group_outros,
    init,
    insert,
    mount_component,
    safe_not_equal,
    space,
    toggle_class,
    transition_in,
    transition_out,
} from '/db/my-app/node_modules/svelte/internal';

const { document: document_1 } = globals;
import Repl from '/db/my-app/node_modules/sveltejs/svelte-repl';
import { onMount } from '/db/my-app/node_modules/svelte';

// import { process_example } from '../../utils/examples';
import InputOutputToggle from './InputOutputToggle.svelte';

function add_css() {
    var style = element('style');
    style.id = 'svelte-247fff-style';
    style.textContent =
        '.repl-outer.svelte-247fff.svelte-247fff{position:relative;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;background-color:var(--back);overflow:hidden;box-sizing:border-box;--pane-controls-h:4.2rem}.viewport.svelte-247fff.svelte-247fff{width:100%;height:100%;flex:1}.mobile.svelte-247fff .viewport.svelte-247fff{width:200%;height:calc(100% - 42px);transition:transform 0.3s}.mobile.svelte-247fff .offset.svelte-247fff{transform:translate(-50%, 0)}';
    append(document_1.head, style);
}

// (119:2) {#if process.browser}
function create_if_block_1(ctx) {
    let repl_1;
    let current;

    let repl_1_props = {
        workersUrl: 'workers',
        fixed: /*mobile*/ ctx[4],
        svelteUrl: /*svelteUrl*/ ctx[3],
        rollupUrl: /*rollupUrl*/ ctx[5],
        embedded: true,
        relaxed: true,
    };

    repl_1 = new Repl({ props: repl_1_props });
    /*repl_1_binding*/ ctx[8](repl_1);

    return {
        c() {
            create_component(repl_1.$$.fragment);
        },
        m(target, anchor) {
            mount_component(repl_1, target, anchor);
            current = true;
        },
        p(ctx, dirty) {
            const repl_1_changes = {};
            if (dirty & /*mobile*/ 16) repl_1_changes.fixed = /*mobile*/ ctx[4];
            if (dirty & /*svelteUrl*/ 8) repl_1_changes.svelteUrl = /*svelteUrl*/ ctx[3];
            repl_1.$set(repl_1_changes);
        },
        i(local) {
            if (current) return;
            transition_in(repl_1.$$.fragment, local);
            current = true;
        },
        o(local) {
            transition_out(repl_1.$$.fragment, local);
            current = false;
        },
        d(detaching) {
            /*repl_1_binding*/ ctx[8](null);
            destroy_component(repl_1, detaching);
        },
    };
}

// (132:1) {#if mobile}
function create_if_block(ctx) {
    let inputoutputtoggle;
    let updating_checked;
    let current;

    function inputoutputtoggle_checked_binding(value) {
        /*inputoutputtoggle_checked_binding*/ ctx[9](value);
    }

    let inputoutputtoggle_props = {};

    if (/*checked*/ ctx[2] !== void 0) {
        inputoutputtoggle_props.checked = /*checked*/ ctx[2];
    }

    inputoutputtoggle = new InputOutputToggle({ props: inputoutputtoggle_props });
    binding_callbacks.push(() => bind(inputoutputtoggle, 'checked', inputoutputtoggle_checked_binding));

    return {
        c() {
            create_component(inputoutputtoggle.$$.fragment);
        },
        m(target, anchor) {
            mount_component(inputoutputtoggle, target, anchor);
            current = true;
        },
        p(ctx, dirty) {
            const inputoutputtoggle_changes = {};

            if (!updating_checked && dirty & /*checked*/ 4) {
                updating_checked = true;
                inputoutputtoggle_changes.checked = /*checked*/ ctx[2];
                add_flush_callback(() => (updating_checked = false));
            }

            inputoutputtoggle.$set(inputoutputtoggle_changes);
        },
        i(local) {
            if (current) return;
            transition_in(inputoutputtoggle.$$.fragment, local);
            current = true;
        },
        o(local) {
            transition_out(inputoutputtoggle.$$.fragment, local);
            current = false;
        },
        d(detaching) {
            destroy_component(inputoutputtoggle, detaching);
        },
    };
}

function create_fragment(ctx) {
    let div1;
    let div0;
    let t;
    let div1_resize_listener;
    let current;
    let if_block0 = process.browser && create_if_block_1(ctx);
    let if_block1 = /*mobile*/ ctx[4] && create_if_block(ctx);

    return {
        c() {
            div1 = element('div');
            div0 = element('div');
            if (if_block0) if_block0.c();
            t = space();
            if (if_block1) if_block1.c();
            attr(div0, 'class', 'viewport svelte-247fff');
            toggle_class(div0, 'offset', /*checked*/ ctx[2]);
            attr(div1, 'class', 'repl-outer svelte-247fff');
            add_render_callback(() => /*div1_elementresize_handler*/ ctx[10].call(div1));
            toggle_class(div1, 'mobile', /*mobile*/ ctx[4]);
        },
        m(target, anchor) {
            insert(target, div1, anchor);
            append(div1, div0);
            if (if_block0) if_block0.m(div0, null);
            append(div1, t);
            if (if_block1) if_block1.m(div1, null);
            div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[10].bind(div1));
            current = true;
        },
        p(ctx, [dirty]) {
            if (process.browser) if_block0.p(ctx, dirty);

            if (dirty & /*checked*/ 4) {
                toggle_class(div0, 'offset', /*checked*/ ctx[2]);
            }

            if (/*mobile*/ ctx[4]) {
                if (if_block1) {
                    if_block1.p(ctx, dirty);

                    if (dirty & /*mobile*/ 16) {
                        transition_in(if_block1, 1);
                    }
                } else {
                    if_block1 = create_if_block(ctx);
                    if_block1.c();
                    transition_in(if_block1, 1);
                    if_block1.m(div1, null);
                }
            } else if (if_block1) {
                group_outros();

                transition_out(if_block1, 1, 1, () => {
                    if_block1 = null;
                });

                check_outros();
            }

            if (dirty & /*mobile*/ 16) {
                toggle_class(div1, 'mobile', /*mobile*/ ctx[4]);
            }
        },
        i(local) {
            if (current) return;
            transition_in(if_block0);
            transition_in(if_block1);
            current = true;
        },
        o(local) {
            transition_out(if_block0);
            transition_out(if_block1);
            current = false;
        },
        d(detaching) {
            if (detaching) detach(div1);
            if (if_block0) if_block0.d();
            if (if_block1) if_block1.d();
            div1_resize_listener();
        },
    };
}

let name = 'loading...';

function instance($$self, $$props, $$invalidate) {
    let svelteUrl;
    let mobile;
    let { version = '3' } = $$props;
    let { embedded = false } = $$props;
    let repl;
    let width = process.browser ? window.innerWidth - 32 : 1000;
    let checked = false;

    onMount(() => {
        if (version !== 'local') {
            fetch(`https://unpkg.com/svelte@${version}/package.json`)
                .then((r) => r.json())
                .then((pkg) => {
                    $$invalidate(6, (version = pkg.version));
                });
        }
    }); // if (gist) {
    // 	fetch(`repl/${gist}.json`).then(r => r.json()).then(data => {
    // 		const { description, files } = data;
    // 		name = description;

    const rollupUrl = `https://unpkg.com/rollup@1/dist/rollup.browser.js`;

    function repl_1_binding($$value) {
        binding_callbacks[$$value ? 'unshift' : 'push'](() => {
            repl = $$value;
            $$invalidate(1, repl);
        });
    }

    function inputoutputtoggle_checked_binding(value) {
        checked = value;
        $$invalidate(2, checked);
    }

    function div1_elementresize_handler() {
        width = this.clientWidth;
        $$invalidate(0, width);
    }

    $$self.$$set = ($$props) => {
        if ('version' in $$props) $$invalidate(6, (version = $$props.version));
        if ('embedded' in $$props) $$invalidate(7, (embedded = $$props.embedded));
    };

    $$self.$$.update = () => {
        if ($$self.$$.dirty & /*embedded*/ 128) {
            // 		const components = Object.keys(files)
            // 			.map(file => {
            // 				const dot = file.lastIndexOf('.');
            // 				if (!~dot) return;
            // 				const source = files[file].content;
            // 				return {
            // 					name: file.slice(0, dot),
            // 					type: file.slice(dot + 1),
            // 					source
            // 				};
            // 			})
            // 			.filter(x => x.type === 'svelte' || x.type === 'js')
            // 			.sort((a, b) => {
            // 				if (a.name === 'App' && a.type === 'svelte') return -1;
            // 				if (b.name === 'App' && b.type === 'svelte') return 1;
            // 				if (a.type !== b.type) return a.type === 'svelte' ? -1 : 1;
            // 				return a.name < b.name ? -1 : 1;
            // 			});
            // 		repl.set({ components });
            // 	});
            // } else if (example) {
            // 	fetch(`examples/${example}.json`).then(async response => {
            // 		if (response.ok) {
            // 			const data = await response.json();
            // 			repl.set({
            // 				components: process_example(data.files)
            // 			});
            // 		}
            // 	});
            // }
            $: if (embedded) document.title = `${name} • Svelte REPL`;
        }

        if ($$self.$$.dirty & /*version*/ 64) {
            $: $$invalidate(
                3,
                (svelteUrl =
                    process.browser && version === 'local'
                        ? `${location.origin}/repl/local`
                        : `https://unpkg.com/svelte@${version}`),
            );
        }

        if ($$self.$$.dirty & /*width*/ 1) {
            $: $$invalidate(4, (mobile = width < 560));
        }
    };

    return [
        width,
        repl,
        checked,
        svelteUrl,
        mobile,
        rollupUrl,
        version,
        embedded,
        repl_1_binding,
        inputoutputtoggle_checked_binding,
        div1_elementresize_handler,
    ];
}

class Component extends SvelteComponent {
    constructor(options) {
        super();
        if (!document_1.getElementById('svelte-247fff-style')) add_css();
        init(this, options, instance, create_fragment, safe_not_equal, { version: 6, embedded: 7 });
    }
}

export default Component;
