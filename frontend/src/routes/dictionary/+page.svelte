<script lang="ts">
	import Button from '../../components/Interactibles/Button/Button.svelte';
	import TextInput from '../../components/Interactibles/Input/TextInput.svelte';
	import Card from '../../components/Modules/Card/Card.svelte';
	import Flex from '../../components/Modules/FlexAndGrid/Flex.svelte';
	import Icon from '../../components/Modules/Icon/Icon.svelte';
	import Modal from '../../components/Modules/Modal/Modal.svelte';
	import {
		ICON_ARROW_LEFT,
		ICON_ARROW_RIGHT,
		ICON_EQUAL
	} from '../../components/icons';
	import { dictStore } from '../../stores/dictionaryStore';
	import { homeStore } from '../../stores/homeStore';
	import type { Operator } from '../../stores/types';
	import { cubeCss } from '../../utils/cubeCss/cubeCss';
	import { filterItems, paginate } from '../../utils/functions';
	import DictFilter from './Sections/DictFilter.svelte';
	import DictHeader from './Sections/DictHeader.svelte';

	function changePage(n: number) {
		dictStore.changePage(n);
	}

	let currentItems: string[] = [];
	dictStore.subscribe(x => {
		const filteredItems = filterItems(homeStore.getItemNames(), x.filters);
		let data = paginate(filteredItems, x.itemsPerPage, x.page);

		currentItems = data[0];
		x.page = data[1];
		x.pages = data[2];
	})
</script>

<div class="[ dictionary-grid ] [ flex-grow-1 ]">
	<section class="[ padding-block-2 padding-inline-1 ]" data-desktop="true">
		<DictFilter />
	</section>
	<section class="[ container ] [ margin-block-2 ]" data-type="full">
		<DictHeader />
		<div class="margin-block-start-1">
			<Flex useColumn={true}>
				{#each currentItems as item}
					<Card cls={cubeCss('', '', 'fs-350 width-100')}>
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
					</Card>
				{/each}
			</Flex>
		</div>

		<Flex cls={cubeCss('', '', 'margin-block-start-1')} align="center">
			<Button
				on:click={() => changePage($dictStore.page - 1)}
				disabled={$dictStore.page === 0}
				variant="muted"
				attachments={['small-pad', 'hologram', 'mix']}
			>
				Previous
			</Button>

			
			<p class="clr-neutral-800">Page {$dictStore.page + 1}/{$dictStore.pages + 1}</p>
			

			<Button
				on:click={() => changePage($dictStore.page + 1)}
				disabled={$dictStore.page === $dictStore.pages}
				variant="muted"
				attachments={['small-pad', 'hologram', 'mix']}
			>
				Next
			</Button>
		</Flex>
	</section>
</div>

<Modal id='dict-mobile-filters-modal'>
	<DictFilter />
</Modal>