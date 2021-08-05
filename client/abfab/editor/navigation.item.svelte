<script>
    import { getTreeItem, updateTreeItem } from './editor.js'
    export let item;

    const toggle = () => {
        updateTreeItem({...item, expanded: !item.expanded});
    };

    const click = () => {
        const currentSelected = getTreeItem(window.location.pathname.replace('/@edit', ''));
        if (currentSelected) {
            updateTreeItem({...currentSelected, selected: false});
        }
        updateTreeItem({...item, selected: true});
    }
</script>
{#if item.type === 'Directory' }
<pa-icon>
    <svg class="pa-small" on:click={toggle}>
        <use xlink:href="/~/abfab/pastanaga/icons.svg#{item.expanded ? 'chevron-down' : 'chevron-right'}"></use>
    </svg>
</pa-icon>
{:else}
<pa-icon>
    <svg class="pa-small">
        <use xlink:href="/~/abfab/pastanaga/icons.svg#file"></use>
    </svg>
</pa-icon>
{/if}
<a href={`${item.path}/@edit`} class:selected={item.selected} on:click={click}>{item.name}</a>
{#if item.children && item.expanded }
<ul>
    {#each item.children as item}
    <li><svelte:self {item}></svelte:self></li>
    {/each}
</ul>
{/if}