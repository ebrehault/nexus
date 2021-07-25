<script>
    import VimEditor from './vim.svelte';
    import Viewer from './viewer.svelte';
    import AFButton from '../ui/button.svelte';
    import Toolbar from './toolbar.svelte';
    import Navigation from './navigation.svelte';
    import { showNavigation, loadTree } from './editor.js';
    import { onMount } from 'svelte';
    
    export let context;
    let _context = '';
    let type;
    $: {
        try {
            const obj = JSON.parse(context);
            type = obj.type;
            _context = type === 'Content' ? JSON.stringify(obj.data) : context;
            console.log(obj, _context);
        } catch (e) {
            type = 'File';
            _context = context;
        }
    }
    
    let play = false;
    let componentPath;
    let viewer;

    function togglePlay() {
        componentPath = location.pathname.replace('/@edit', '');
        play = !play;
        window.dispatchEvent(new Event('resize'));
    }
    
    function refreshViewer() {
        if (viewer) {
            viewer.refresh();
        }
    }

    onMount(() => loadTree());
</script>

<svelte:head>
    <link rel="stylesheet" href="/~/abfab/pastanaga/pastanaga.css">
</svelte:head>
<header>
    <img src="/~/abfab/abfab.svg" alt="AbFab logo" />
    <ul>
        {#if play}
        <li>
            <AFButton aspect="basic" icon="refresh" label="Refresh" size="small"
                on:click={refreshViewer}/>
        </li>
        {/if}
        <li>
            <AFButton kind="primary" aspect="basic" icon="play" label="Play" size="small" active={play}
                on:click={togglePlay}/>
        </li>
    </ul>
</header>
<main>
    <Toolbar></Toolbar>
    {#if $showNavigation}
    <Navigation></Navigation>
    {/if}
    <div class="editor-container {play ? 'half' : ''}" class:with-nav={$showNavigation}>
        <VimEditor context={_context} {type} on:save={refreshViewer}></VimEditor>
    </div>
    {#if play}
    <Viewer bind:this={viewer} componentPath={componentPath}></Viewer>
    {/if}
</main>
<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    header {
        height: 2em;
        display: flex;
        align-items: center;
    }
    header img {
        height: 2em;
        padding: 0.2em;
        margin-left: 0.2em;
    }
    header ul {
        margin-left: auto;
        margin-right: 1em;
        display: flex;
    }
    main {
        display: flex;
    }
    .editor-container {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 2.5em);
        width: calc(100vw - 3.5em);
        margin: 0px;
        padding: 0px;
        overflow: hidden;
    }
    .editor-container.half {
        width: 50vw;
    }
    .editor-container.with-nav {
        width: calc(100vw - 14em);
    }
    .editor-container.half.with-nav {
        width: calc(50vw - 10em);
    }
</style>