<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    export let context;
    let textarea;
    let codeMirror;
    let mode = 'svelte';
    const dispatch = createEventDispatcher();

    function saveFile(value) {
        dispatch('save', value);
    }

    async function loadPlugins() {
        await import('/~/node_modules/codemirror/addon/mode/simple.js');
        await import('/~/node_modules/codemirror/addon/mode/multiplex.js');
        await import('/~/node_modules/codemirror/mode/javascript/javascript.js');
        await import('/~/node_modules/codemirror/mode/handlebars/handlebars.js');
        await import('/~/node_modules/codemirror/mode/htmlmixed/htmlmixed.js');
        await import('/~/node_modules/codemirror/mode/xml/xml.js');
        await import('/~/node_modules/codemirror/mode/css/css.js');
        await import('/~/node_modules/codemirror/mode/markdown/markdown.js');
        await import('/~/node_modules/codemirror/addon/edit/closebrackets.js');
        await import('/~/node_modules/codemirror/addon/edit/closetag.js');
        await import('/~/node_modules/codemirror/addon/edit/continuelist.js');
        await import('/~/node_modules/codemirror/addon/comment/comment.js');
        await import('/~/node_modules/codemirror/addon/fold/foldcode.js');
        await import('/~/node_modules/codemirror/addon/fold/foldgutter.js');
        await import('/~/node_modules/codemirror/addon/fold/brace-fold.js');
        await import('/~/node_modules/codemirror/addon/fold/xml-fold.js');
        await import('/~/node_modules/codemirror/addon/fold/indent-fold.js');
        await import('/~/node_modules/codemirror/addon/fold/markdown-fold.js');
        await import('/~/node_modules/codemirror/addon/fold/comment-fold.js');
    }

    onMount(async () => {
        if (!window.CodeMirror) {
            await import('/~/node_modules/codemirror/lib/codemirror.js');
            await loadPlugins();
            init();
        }
    });

    $: if (codeMirror) {
        codeMirror.setValue(context);
    }
    
    function init() {
        const modes = {
            js: {
                name: 'javascript',
                json: false
            },
            json: {
                name: 'javascript',
                json: true
            },
            svelte: {
                name: 'handlebars',
                base: 'text/html'
            },
            md: {
                name: 'markdown'
            }
        };

        const opts = {
			lineNumbers: true,
			lineWrapping: true,
			indentWithTabs: true,
			indentUnit: 2,
			tabSize: 2,
			value: '',
			mode: modes[mode] || {
				name: mode
			},
			autoCloseBrackets: true,
			autoCloseTags: true,
            extraKeys: {
                'Enter': 'newlineAndIndentContinueMarkdownList',
                'Ctrl-/': 'toggleComment',
                'Cmd-/': 'toggleComment',
                'Ctrl-Q': function (cm) {
                    cm.foldCode(cm.getCursor());
                },
                'Cmd-Q': function (cm) {
                    cm.foldCode(cm.getCursor());
                },
                'Ctrl-S': function (cm) {
                    saveFile(cm.getValue());
                },
                'Cmd-S': function (cm) {
                    saveFile(cm.getValue());
                },
            },
			foldGutter: true,
			gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
            theme: 'blackboard',
		};

        codeMirror = CodeMirror.fromTextArea(textarea, opts);
        codeMirror.setValue(context);
    };
</script>
<textarea bind:this={textarea}></textarea>
<svelte:head>
    <link rel="stylesheet" href="/~/node_modules/codemirror/lib/codemirror.css">
    <link rel="stylesheet" href="/~/node_modules/codemirror/theme/blackboard.css">
</svelte:head>
<style>
    textarea {
        display: none;
    }
    :global(.CodeMirror) {
        width: calc(100vw - 16px);
        height: calc(100vh - 16px) !important;
    }
</style>