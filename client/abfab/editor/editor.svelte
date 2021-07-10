<script>
    import VimEditor from './vim.svelte';
    import Viewer from './viewer.svelte';
    import AFButton from '../ui/button.svelte';
    
    export let context;
    
    let play = false;
    let componentPath;
    let viewer;

    function togglePlay() {
        componentPath = location.pathname.replace('/@edit', '');
        play = !play;
        window.dispatchEvent(new Event('resize'));
    }
    
    function refreshViewer() {
        viewer.refresh();
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/db/my-app/abfab/pastanaga/pastanaga.css">
</svelte:head>
<style>
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
    nav {
        width: 3em;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: center;
    }
    nav li {
        padding: 1em 0;
    }
    .editor-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(100vh - 2.5em);
        width: calc(100vw - 3.5em);
        margin: 0px;
        padding: 0px;
        overflow: hidden;
    }
    .editor-container.half {
        width: 50vw;
    }
</style>
<header>
    <img src="/db/my-app/abfab/abfab.svg" alt="AbFab logo" />
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
    <nav>
        <ul>
            <li>
                <AFButton kind="primary" aspect="basic" icon="components" label="Components" size="small" active={true}/>
            </li>
            <li>
                <AFButton kind="primary" aspect="basic" icon="globe" label="Data" size="small" />
            </li>
            <li>
                <AFButton kind="primary" aspect="basic" icon="libraries" label="Libraries" size="small" />
            </li>
        </ul>
    </nav>
    <div class="editor-container {play ? 'half' : ''}">
        <VimEditor context={context} on:save={refreshViewer}></VimEditor>
    </div>
    {#if play}
    <Viewer bind:this={viewer} componentPath={componentPath}></Viewer>
    {/if}
</main>
