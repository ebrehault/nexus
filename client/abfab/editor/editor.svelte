<script>
    export let context;
    import VimEditor from './vim.svelte';
    import AFButton from '../ui/button.svelte';
    let play = false;

    function togglePlay() {
        play = !play;
        window.dispatchEvent(new Event('resize'));
    }
</script>
<svelte:head>
    <link rel="stylesheet" href="/db/my-app/abfab/pastanaga/styles.a2374b02e1a26e40320b.css">
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
        width: calc(50vw - 3.5em);
    }
</style>
<header>
    <img src="/db/my-app/abfab/abfab.svg" alt="AbFab logo" />
    <ul>
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
                <AFButton kind="primary" aspect="basic" icon="data" label="Data" size="small" />
            </li>
            <li>
                <AFButton kind="primary" aspect="basic" icon="libraries" label="Libraries" size="small" />
            </li>
        </ul>
    </nav>
    <div class="editor-container {play ? 'half' : ''}">
        <VimEditor context={context}></VimEditor>
    </div>
</main>
