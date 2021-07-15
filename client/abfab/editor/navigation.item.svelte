<script>
    import { updateTreeItem } from './editor.js'
    export let item;

    const toggle = () => {
        updateTreeItem({...item, expanded: !item.expanded});
    };
</script>
{#if item.type === 'Directory' }
<pa-icon>
    <svg class="pa-small" on:click={toggle}>
        <use xlink:href="/db/my-app/abfab/pastanaga/icons.svg#{item.expanded ? 'chevron-down' : 'chevron-right'}"></use>
    </svg>
</pa-icon>
{:else}
<pa-icon>
    <svg class="pa-small">
        <use xlink:href="/db/my-app/abfab/pastanaga/icons.svg#file"></use>
    </svg>
</pa-icon>
{/if}
<a href={`/db/my-app${item.path}/@edit`}>{item.name}</a>
{#if item.children && item.expanded }
<ul>
    {#each item.children as item}
    <li><svelte:self {item}></svelte:self></li>
    {/each}
</ul>
{/if}