<script>
    import AFInput from '/~/abfab/ui/input.svelte';
    import AFTextarea from '/~/abfab/ui/textarea.svelte';
    import { getRealPath, getCorePath} from '/~/abfab/core.js';

    export let componentPath;
    const _componentPath = getRealPath(componentPath);
    let path = _componentPath;
    let contentPath = '';
    let dataError = false;
	let jsonData = '';
	let iframe;

    function displayData(value, timestamp) {
        try {
            const data = JSON.stringify(JSON.parse(value));
            path = `${_componentPath}?time=${timestamp}&context=${data}`;
			dataError = false;
        } catch(e) {
            dataError = true;
        }
    }

    export function refresh() {
        const timestamp = new Date().toISOString();
        if (contentPath) {
            path = `${contentPath}?view=${getCorePath(_componentPath)}&time=${timestamp}`;
        } else if (jsonData) {
            displayData(jsonData, timestamp);
        } else {
            path = `${_componentPath}?time=${timestamp}`;
        }
    }
</script>
<section>
    <iframe bind:this={iframe} src={path} title="Component viewer"></iframe>
    <AFInput id="content" label="Content path" placeholder="/path/to/content" bind:value={contentPath}
        hint="The corresponding data content will be rendered using the current component."/>
    <AFTextarea id="data" label="Data" placeholder="[1, 2, 3]"
        disabled={!!contentPath}
        error={dataError ? 'Invalid JSON' : ''}
        hint="If you do not have any relevant data content, you can just put a JSON sample here. (Content path will take precedence)"
        bind:value={jsonData} />
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
