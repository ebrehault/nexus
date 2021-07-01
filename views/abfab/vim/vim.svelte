<script>
    export let context;
    import { VimWasm, checkBrowserCompatibility } from '/db/my-app/node_modules/vim-wasm/vimwasm.js';
    import { compile } from '/db/my-app/node_modules/svelte/compiler.mjs';
    import { onMount } from 'svelte';

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
            saveFile(fullpath, contents);
            if (isSvelte) {
                const decoder = new TextDecoder('utf-8');
                const source = decoder.decode(contents);
                const { js } = compile(source, {
                    sveltePath: ABFAB_ROOT + '/node_modules/svelte',
                });
                const jsFilePath = fullpath + '.js';
                saveFile(jsFilePath, js.code.replace(RE, 'from "$1/index.mjs";'));
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

    function saveFile(filepath, body) {
        const filename = filepath.split('/').pop();
        fetch(filepath, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa('root:root'),
            },
            body: JSON.stringify({
                '@type': 'File',
                'id': filename,
            }),
        });
        fetch(filepath + '/@upload/file', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/octet-stream',
                'X-UPLOAD-FILENAME': filename,
                Authorization: 'Basic ' + btoa('root:root'),
            },
            body,
        });
    }

</script>
<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(100vh - 16px);
        width: calc(100vw - 16px);
        margin: 0px;
        padding: 0px;
        overflow: hidden;
    }

    #vim-editor {
        padding: 2px;
        margin: 0px;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background-color: #282c33;
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
</style>

<div class="container">
    <div id="vim-editor">
        <canvas id="vim-canvas"></canvas>
        <input id="vim-input"
                autocomplete="off"
                autofocus />
        
    </div>
</div>
