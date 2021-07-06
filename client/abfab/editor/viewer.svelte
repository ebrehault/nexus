<script>
    export let componentPath;
    let component;
let data = {context: {year: 10}};
    let dataValue = '';
    async function getComponent(path) {
        const module = await import(path);
        component = module.default;
    }
    function updateData(event) {
        try {
            data = JSON.parse(event.target.value);
            dataError = false;
        } catch(e) {
            dataError = true;
        }
    }
    if(componentPath) {
        getComponent(componentPath);
    }
</script>
<section>
    <div class="view">
        <svelte:component this={component} {...data}></svelte:component>
    </div>
    <textarea bind:value={dataValue}></textarea>
    {dataValue}
</section>
<style>
section {
    margin-left: 1em;
}
</style>
