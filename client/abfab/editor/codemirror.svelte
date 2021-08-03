<script>
    import { onMount } from 'svelte';

    import '/~/node_modules/codemirror/lib/codemirror.js';
    
    let textarea;
    let codeMirror;
    
    // onMount(() => init());

    function init() {
        import('/~/node_modules/codemirror/mode/javascript/javascript.js');
        // import('/~/node_modules/codemirror/mode/handlebars/handlebars.js');
        import('/~/node_modules/codemirror/mode/htmlmixed/htmlmixed.js');
        import('/~/node_modules/codemirror/mode/xml/xml.js');
        import('/~/node_modules/codemirror/mode/css/css.js');
        import('/~/node_modules/codemirror/mode/markdown/markdown.js');
        import('/~/node_modules/codemirror/addon/edit/closebrackets.js');
        import('/~/node_modules/codemirror/addon/edit/closetag.js');
        import('/~/node_modules/codemirror/addon/edit/continuelist.js');
        import('/~/node_modules/codemirror/addon/comment/comment.js');
        import('/~/node_modules/codemirror/addon/fold/foldcode.js');
        import('/~/node_modules/codemirror/addon/fold/foldgutter.js');
        import('/~/node_modules/codemirror/addon/fold/brace-fold.js');
        import('/~/node_modules/codemirror/addon/fold/xml-fold.js');
        import('/~/node_modules/codemirror/addon/fold/indent-fold.js');
        import('/~/node_modules/codemirror/addon/fold/markdown-fold.js');
        import('/~/node_modules/codemirror/addon/fold/comment-fold.js');
        codeMirror = CodeMirror.fromTextArea(textarea);
    };
</script>
<textarea bind:this={textarea}></textarea>
<button on:click={init}>Init</button>
<svelte:head>
    <link rel="stylesheet" href="/~/node_modules/codemirror/lib/codemirror.css">
</svelte:head>