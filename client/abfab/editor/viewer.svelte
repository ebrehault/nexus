<script>
    import AFInput from '/db/my-app/abfab/ui/input.svelte';
    import AFTextarea from '/db/my-app/abfab/ui/textarea.svelte';

    export let componentPath;
    let path = componentPath;
    let contentPath = '';
    let dataError = false;
	let jsonData = '';
	let iframe;

    function displayData(value) {
        try {
            const data = JSON.stringify(JSON.parse(value));
            path = `${componentPath}?context=${data}`;
			dataError = false;
        } catch(e) {
            dataError = true;
        }
    }

    export function refresh() {
        if (contentPath) {
            path = contentPath;
        } else if (jsonData) {
            displayData(jsonData);
        } else {
            path = componentPath;
        }
    }
</script>
<section>
    <iframe bind:this={iframe} src={path} title="Component viewer"></iframe>
    <AFTextarea id="data" label="Data" placeholder="[1, 2, 3]"
        disabled={!!contentPath}
        error={dataError ? 'Invalid JSON' : ''}
        bind:value={jsonData} />
    <AFInput id="content" label="Content path" placeholder="/path/to/content" bind:value={contentPath} />
</section>
<style>
section {
    margin-left: 1em;
	width: calc(50vw - 5em);
}
iframe {
	width: 100%;
	border: 1px solid var(--color-neutral-secondary-default);
    border-radius: .125rem;
	display: block;
	height: 50vh;
    margin-bottom: 2em;
}
</style>
