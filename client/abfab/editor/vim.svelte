<script>
    export let context;
    import { VimWasm, checkBrowserCompatibility } from '/db/my-app/node_modules/vim-wasm/vimwasm.js';
    import { compile } from '/db/my-app/node_modules/svelte/compiler.mjs';
    import { onMount } from 'svelte';
    import { saveFile } from '../api.js';
    import { createEventDispatcher } from 'svelte';
    import AFButton from '../ui/button.svelte';
    let error;
    let warnings = [];
    $: hasError = !!error || warnings.length > 0;
    $: if (hasError) {
        updateErrors();
    }
    function discardErrors() {
        error = undefined;
        warnings = [];
        updateErrors();
    }
    function updateErrors() {
        window.dispatchEvent(new Event('resize'));
    }

	const dispatch = createEventDispatcher();

    onMount(() => {
        initVim();
    });

    function initVim() {
        console.log(`Wheels on fire,\nRolling down the road.\nBest notify my next of kin\nThis wheel shall explode!\n\n`);
        
        const RE = new RegExp(/from "(.+\/svelte(\/\w+){0,1})";/g);
        const pathname = location.pathname.replace('/@edit', '');
        const filename = pathname.split('/').pop();
        const isSvelte = filename.endsWith('.svelte');
    
        const errmsg = checkBrowserCompatibility();
        if (errmsg !== undefined) {
            alert(errmsg);
        }
    
        const screenCanvasElement = document.getElementById('vim-canvas');
        const vim = new VimWasm({
            canvas: screenCanvasElement,
            input: document.getElementById('vim-input'),
            workerScriptPath: '/db/my-app/node_modules/vim-wasm/vim.js',
        });
    
        // Handle drag and drop
        function cancel(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        screenCanvasElement.addEventListener(
            'dragover',
            (e) => {
                cancel(e);
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = 'copy';
                }
            },
            false,
        );
        screenCanvasElement.addEventListener(
            'drop',
            (e) => {
                cancel(e);
                if (e.dataTransfer) {
                    vim.dropFiles(e.dataTransfer.files).catch(console.error);
                }
            },
            false,
        );
    
        vim.onVimExit = (status) => {
            alert(`Vim exited with status ${status}`);
        };
    
        vim.onFileExport = (fullpath, contents) => {
            const ABFAB_ROOT = '/db/my-app';
            let js = '';
            if (isSvelte) {
                try {
                    const decoder = new TextDecoder('utf-8');
                    const source = decoder.decode(contents);
                    const result = compile(source, {
                        sveltePath: ABFAB_ROOT + '/node_modules/svelte',
                    });
                    error = undefined;
                    js = result.js;
                    const warningsFixed = result.warnings.length === 0 && warnings.length > 0;
                    warnings = result.warnings;
                    if (warningsFixed) {
                        updateErrors();
                    }
                } catch (e) {
                    error = e;
                }
            }
            if (!error) {
                saveFile(fullpath, contents).then(() => {
                    if (isSvelte) {
                        const jsFilePath = fullpath + '.js';
                        saveFile(jsFilePath, js.code.replace(RE, 'from "$1/index.mjs";'))
                            .then(() => dispatch('save', {file: fullpath}));
                    } else {
                        dispatch('save', {file: fullpath});
                    }
                });
            }
        };
    
        vim.readClipboard = navigator.clipboard.readText;
        vim.onWriteClipboard = navigator.clipboard.writeText;
        vim.onError = console.error;

        const options = ['set number'];
        if (isSvelte) {
            options.push('set filetype=html');
        }
        options.push('autocmd BufWritePost * export');
        const folder = pathname.split('/');
        vim.start({
            // cmdArgs: ['/test.svelte', '-c', 'set number\nset filetype=html'],
            cmdArgs: [pathname, '-c', options.join('\n')],
            dirs: folder.reduce((all, dir, index) => {
                all.push(folder.slice(0, index).join('/'));
                return all;
            }, []).slice(2),
            // fetchFiles: { [location.pathname]: 'http://localhost:8080/db/my-app/views/component/render.js' },
            files: {
                [pathname]: context,
            //     '/test.svelte': '<h1>hello, world!</h1>',
            //     // '/.vim/vimrc': 'set number\nset noexpandtab\nau BufRead,BufNewFile *.svelte set filetype=html',
            },
        });
    }

</script>
<style>
    #vim-editor {
        margin: 0px;
        width: 100%;
        height: 100%;
        background-color: #282c33;
    }
    #vim-editor.has-error {
        height: 80%;
    }

    #vim-canvas {
        padding: 0px;
        width: 100%;
        height: 100%;
    }

    #vim-input {
        width: 1px;
        color: transparent;
        background-color: transparent;
        padding: 0px;
        border: 0px;
        outline: none;
        vertical-align: middle;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .errors-container {
        overflow: auto;
        position: relative;
    }
    .errors {
        height: 100%;
        overflow: auto;
        font-size: var(--font-size-xs);
    }
    .errors div {
        color: var(--color-accent-primary-lightest);
        padding: 0.25em;
    }
    .errors .error {
        background-color: var(--color-accent-secondary-dark);
    }
    .errors .warning {
        background-color: var(--color-accent-secondary-default);
    }
    .errors code {
        display: block;
        white-space: pre-wrap;
        padding: 0.25em;
        margin: 0.25em;
        color: var(--color-neutral-primary-lighter);
    }
    .discard-button {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.25em;
    }
</style>
<div id="vim-editor" class:has-error={hasError}>
    <canvas id="vim-canvas"></canvas>
    <input id="vim-input"
            autocomplete="off"
            autofocus />
</div>
{#if hasError }
<div class="errors-container">
    <span class="discard-button">
        <AFButton aspect="solid" icon="cross" label="Discard" size="small"
            on:click={discardErrors}/>
    </span>
    <div class="errors">
        {#if error} <div class="error">{error.message}<code>{error.frame}</code></div>{/if}
        {#each warnings as warning}
        <div class="warning">
            {warning.message}
            <code>{warning.frame}</code>
        </div>
        {/each}
    </div>
</div>
{/if}
