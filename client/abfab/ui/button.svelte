<script>
    export let label;
    export let icon;
    export let size = 'medium'; // small, medium, large
    export let aspect = 'solid'; // solid or basic
    export let kind = 'secondary'; // primary, secondary, destructive
    export let active = false;
    export let disabled = false;
</script>
<button class="pa-button pa-{size} pa-{kind} pa-{aspect}"
    class:pa-active={active}
    class:pa-button-icon={icon}
    type="button" aria-label={label} tabindex="0" disabled={disabled}
    on:click>
    <span tabindex="-1" class="pa-button-wrapper">
        {#if icon}
        <pa-icon>
            <svg class="pa-{size}">
                <use xlink:href="/db/my-app/abfab/pastanaga/icons.svg#{icon}"></use>
            </svg>
        </pa-icon>
        {/if}
        <span class="pa-button-label" class:pa-sr-only={!!icon}>{label}</span>
    </span>
</button>