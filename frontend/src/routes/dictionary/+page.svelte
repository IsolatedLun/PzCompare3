<script lang="ts">
	import Modal from '../../components/Modules/Modal/Modal.svelte';
	import DictFilter from './Sections/DictFilter.svelte';
	import DictHeader from './Sections/DictHeader.svelte';
	import DictItems from './Sections/DictItems.svelte';
	import DictSearch from './Sections/DictSearch.svelte';

	let showOrganizedItems = false;
</script>

<title>PzCompare Dictionary - Search items in Project Zomboid</title>

<div class="[ dictionary-grid ] [ flex-grow-1 ]">
	<section class="[ padding-block-2 padding-inline-1 ]" data-desktop="true">
		<DictFilter bind:showOrganizedItems />
	</section>
	<section class="[ container ] [ margin-block-2 ]" data-type="full">
		<DictHeader />
		{#if showOrganizedItems}
			<DictItems />
			{:else}
			<DictSearch />
		{/if}
	</section>
</div>

<Modal id='dict-mobile-filters-modal'>
	<DictFilter bind:showOrganizedItems />
</Modal>