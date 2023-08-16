<script lang='ts'>
	import { homeStore } from "../../../stores/homeStore";
	import Button from "../../Interactibles/Button/Button.svelte";
	import Flex from "../FlexAndGrid/Flex.svelte";

    export let item: string;
</script>
<Flex align="center">
    <p class="fs-450 fw-500">{item}</p>
    {#if $homeStore.selectedItems[item] !== undefined}
        <Button
            on:click={() => homeStore.removeItem(item)}
            variant="error"
            attachments={['hologram', 'tiny-pad', 'mix']}
        >
            Remove
        </Button>
    {:else}
        <Button
            on:click={() => homeStore.addItem(item)}
            attachments={['hologram', 'tiny-pad', 'mix']}
        >
            Add
        </Button>
    {/if}
</Flex>