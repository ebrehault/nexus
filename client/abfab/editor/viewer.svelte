<script>
    export let componentPath;
    let dataValue = '';
    let dataError = false;
    let path = componentPath;
	let timer;
	let data = '';
	function debounce(value) {
		clearTimeout(timer);
		setTimeout(() => updateData(value), 750);
	}
    function updateData(value) {
        try {
            data = JSON.stringify(JSON.parse(value));
            path = `${componentPath}?context=${data}`;
            console.log(path);
			dataError = false;
        } catch(e) {
            dataError = true;
        }
    }
</script>
<section>
    <iframe src={path}></iframe>
    <textarea on:keyup={({target: {value}}) => debounce(value)}></textarea>
    {dataValue}
</section>
<style>
section {
    margin-left: 1em;
	width: calc(50vw - 1.5em);
}
iframe {
	width: 100%;
	border: 0;
	display: block;
	height: 50vh;
}
</style>
