<script lang='ts'>
	import { homeStore } from "../../stores/homeStore";
	import Table from "../Modules/Table/Table.svelte";
</script>

<div class="[ flex-wrap justify-content-space-evenly gap-3 padding-1 margin-block-end-3 ]">
	{#each Object.values($homeStore.selectedItems) as item}
		<Table {item} />
	{/each}
</div>