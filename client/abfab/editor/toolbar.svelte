<script>
    import AFButton from '/db/my-app/abfab/ui/button.svelte';
    import {AbFabStore} from '/db/my-app/abfab/api.js';
    import { clickOutside } from '/db/my-app/abfab/ui/clickOutside.js';

    let showMore = false;

    function logout() {
        AbFabStore.update((state) => ({
            ...state,
            logged: false,
        }))
    }
</script>
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
        <li class="more-button">
            <AFButton kind="primary" aspect="basic" icon="more-horizontal" label="Settings" size="small"
                on:click={() => showMore = !showMore}/>
            {#if showMore}
            <div class="menu" use:clickOutside on:clickoutside={() => showMore = false}>
                <div on:click={logout}>
                    Log out
                </div>
            </div>
            {/if}
        </li>
    </ul>
</nav>
<style>
    nav {
        width: 3em;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    li {
        padding: 1em 0;
    }
    .more-button {
        margin-top: auto;
    }
    .menu {
        position: absolute;
        bottom: 3em;
        left: 0.5em;
        width: 7em;
        background-color: var(--color-neutral-primary-lightest);
        z-index: 400;
        box-shadow: 0 1px 0.5rem rgb(2 19 34 / 12%), 0 0 0.25rem rgb(2 19 34 / 10%);
        border-radius: .125rem;
    }
    .menu div {
        padding: 0.25em 1em;
        cursor: pointer;
    }
</style>