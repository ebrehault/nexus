<script>
    import { EditorStore } from './editor.js';
    import NavItem from './navigation.item.svelte';
    import AFButton from '../ui/button.svelte';
</script>
<div class="navigation">
    <ul class="toolbar">
        <li><AFButton kind="primary" aspect="basic" icon="plus" label="Add" size="small"/></li>
        <li><AFButton kind="primary" aspect="basic" icon="trash" label="Remove" size="small"/></li>
    </ul>
    <nav>
        <ul>
            {#each $EditorStore.tree as item}
            <li class="level-1"><NavItem {item}></NavItem></li>
            {/each}
        </ul>
    </nav>
</div>
<style>
    .navigation {
        width: 12em;
        background-color: var(--color-neutral-primary-lighter);
        padding: 0.5em 0.5em 0 0;
    }
    nav {
        height: calc(100vh - 72px);
        overflow: auto;
        font-size: var(--font-size-s);
    }
    nav :global(ul) {
        list-style-type: none;
        padding: 0 0 0 0.5em;
        margin: 0;
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
    nav :global(a.selected) {
        background-color: var(--color-neutral-secondary-lighter);
    }
    .toolbar {
    list-style: none;
        padding: 0;
        margin: 0;
        text-align: right;
    }
    .toolbar li {
        display: inline-block;
    }
</style>