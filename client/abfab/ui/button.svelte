<script>
    import { createEventDispatcher } from 'svelte';
    export let label;
    export let icon;
    export let size = 'medium'; // small, medium, large
    export let aspect = 'solid'; // solid or basic
    export let kind = 'secondary'; // primary, secondary, destructive
    export let active = false;
    export let disabled = false;
    const dispatch = createEventDispatcher();
    function dispatchClick(event) {
        dispatch('click', {event});
    }
</script>
<button class="pa-button pa-{size} pa-{kind} pa-{aspect} {active ? 'pa-active' : ''} pa-button-icon"
    type="button" aria-label={label} tabindex="0" disabled={disabled}
    on:click={dispatchClick}>
    <span tabindex="-1" class="pa-button-wrapper">
        <pa-icon>
            <svg class="pa-{size}">
                <use xlink:href="/db/my-app/abfab/pastanaga/icons.svg#{icon}"></use>
            </svg>
        </pa-icon>
        <span class="pa-button-label pa-sr-only">{label}</span>
    </span>
</button>