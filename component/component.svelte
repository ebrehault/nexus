<script>
	let name = 'world';
    async function getData() {
        let response = await fetch("http://localhost:8080/");
        let data = await response.json();
        return data;
    }
    const promise = getData();
</script>

<h1>Hello {name}!</h1>

<div>
    {#await promise}
        <p>Loading...</p>
    {:then data}
        <p>{data['@type']}</p>
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>