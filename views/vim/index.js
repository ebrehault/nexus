import { VimWasm, checkBrowserCompatibility } from '/node_modules/vim-wasm/vimwasm.js';
import { compile } from '/node_modules/svelte/compiler.mjs';

console.log(`Wheels on fire,\nRolling down the road.\nBest notify my next of kin\nThis wheel shall explode\n\n`);

const errmsg = checkBrowserCompatibility();
if (errmsg !== undefined) {
    alert(errmsg);
}

const screenCanvasElement = document.getElementById('vim-canvas');
const vim = new VimWasm({
    canvas: screenCanvasElement,
    input: document.getElementById('vim-input'),
    workerScriptPath: '/node_modules/vim-wasm/vim.js',
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
    console.log(fullpath, contents);
    const decoder = new TextDecoder('utf-8');
    const source = decoder.decode(contents);
    if (fullpath.endsWith('.svelte')) {
        const { js, css } = compile(source, {
            sveltePath: ABFAB_ROOT + '/node_modules/svelte',
        });
        console.log(js.code, css?.code);
    }
    // const slashIdx = fullpath.lastIndexOf('/');
    // const filename = slashIdx !== -1 ? fullpath.slice(slashIdx + 1) : fullpath;
    // const blob = new Blob([contents], { type: 'application/octet-stream' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.style.display = 'none';
    // a.href = url;
    // a.rel = 'noopener';
    // a.download = filename;
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
};

vim.readClipboard = navigator.clipboard.readText;
vim.onWriteClipboard = navigator.clipboard.writeText;

vim.onError = console.error;

// Start Vim (give option object if necessary)
vim.start({
    cmdArgs: ['/test.svelte', '-c', 'set number\nset filetype=html'],
    // dirs: ['/'],
    files: {
        '/test.svelte': '<h1>hello, world!</h1>',
        // '/.vim/vimrc': 'set number\nset noexpandtab\nau BufRead,BufNewFile *.svelte set filetype=html',
    },
});
