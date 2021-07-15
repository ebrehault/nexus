<script>
    import { EditorStore } from './editor.js';
    import NavItem from './navigation.item.svelte';
</script>
<nav>
    <ul>
        {#each $EditorStore.tree as item}
        <li class="level-1"><NavItem {item}></NavItem></li>
        {/each}
    </ul>
</nav>
<style>
    nav {
        width: 12em;
        background-color: var(--color-neutral-primary-lighter);
        padding: 0.5em 0.5em 0.5em 0;
        overflow: auto;
        height: calc(100vh - 40px);
        font-size: var(--font-size-s);
    }
    nav :global(ul) {
        list-style-type: none;
        padding-left: 0.5em;
    }
    nav :global(svg) {
        fill: var(--color-neutral-secondary-light);
        cursor: hand;
    }
    nav :global(ul li:not(.level-1)) {
        border-left: 1px solid var(--color-neutral-secondary-lighter);
        padding-left: 0.5em;
        white-space: nowrap;
    }
    nav :global(a) {
        color: var(--color-neutral-secondary-default);
    }
</style>