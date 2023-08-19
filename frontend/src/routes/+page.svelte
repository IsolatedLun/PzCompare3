<script lang="ts">
	import Button from '../components/Interactibles/Button/Button.svelte';
	import type { ButtonAttachments } from '../components/Interactibles/Button/types';
	import TextInput from '../components/Interactibles/Input/TextInput.svelte';
	import Navbar from '../components/Layouts/Navbar/Navbar.svelte';
	import Flex from '../components/Modules/FlexAndGrid/Flex.svelte';
	import Icon from '../components/Modules/Icon/Icon.svelte';
	import Modal from '../components/Modules/Modal/Modal.svelte';
	import { openModal } from '../components/Modules/Modal/utils';
	import Table from '../components/Modules/Table/Table.svelte';
	import { ICON_CALCULATOR, ICON_FILTER, ICON_PLUS, ICON_SORT } from '../components/icons';
	import { homeStore } from '../stores/homeStore';
	import { cubeCss } from '../utils/cubeCss/cubeCss';
	import IntroCard from './Sections/IntroCard.svelte';

	function addFilter() {
		if (filterValue) homeStore.addFilter(filterValue);
		filterValue = '';
	}

	function sortTables() {
		if(sortByValue) {
			homeStore.setCurrentSortBy(sortByValue);
			homeStore.sortTablesByAttribute();

			sortByValue = '';
		}
	}

	let sortByValue: string = '';
	let filterValue: string = '';
	const buttonAttachments: ButtonAttachments[] = ['hologram', 'mix', 'big-pad', 'capsule'];
</script>

<div class="[ home-grid ] [ flex-grow-1 height-100 ]">
	<section class="height-100" data-desktop="true">
		<Flex align="center" useColumn={true} gap={1}>
			<Button
				on:click={() => homeStore.calculateDifferences()}
				cls={cubeCss('', '', 'width-100')}
				attachments={buttonAttachments}
			>
				<Icon ariaLabel="Calculate results">{ICON_CALCULATOR}</Icon>
			</Button>
			<Button
				on:click={() => openModal('filters-modal')}
				cls={cubeCss('', '', 'width-100 margin-block-end-2')}
				attachments={buttonAttachments}
			>
				<Icon ariaLabel="Open filter modal">{ICON_FILTER}</Icon>
			</Button>
			<Button
				on:click={() => homeStore.clearAllItems()}
				cls={cubeCss('', '', 'width-100')}
				variant="error"
				attachments={buttonAttachments}
			>
				<span class="fw-800">C</span> <span class="visually-hidden">Clear all items</span>
			</Button>
		</Flex>
	</section>
	<section>
		<Navbar />
		<div class="[ padding-inline-2 margin-block-end-3 ]" data-mobile="true">
			<Flex cls={cubeCss('', '', 'flex-wrap')} align="center" justify="space-between" gap={1}>
				<Button
					on:click={() => homeStore.calculateDifferences()}
					cls={cubeCss('', '', 'width-100')}
					attachments={buttonAttachments}
					><Icon ariaLabel="Calculate results">{ICON_CALCULATOR}</Icon></Button
				>
				<Button
					on:click={() => openModal('filters-modal')}
					cls={cubeCss('', '', 'width-100 margin-block-end-2')}
					attachments={buttonAttachments}
					><Icon ariaLabel="Open filter modal">{ICON_FILTER}</Icon></Button
				>
				<Button
					on:click={() => homeStore.clearAllItems()}
					cls={cubeCss('', '', 'width-100')}
					variant="error"
					attachments={buttonAttachments}
				>
					Clear all
				</Button>
			</Flex>
		</div>
		<div>
			<div class="[ margin-block-end-1 padding-inline-2 ]">
				<Flex alignCenterOnMobile={true} align="center" justify="end">
					<TextInput
						bind:value={sortByValue}
						label="Sort by"
						placeholder="Eg. MaxDamage"
						list={homeStore.getAttrs()}
					/>
					<Button
						on:click={sortTables}
						attachments={buttonAttachments}>
						<Icon ariaLabel='Sort tables'>{ICON_SORT}</Icon>
					</Button>
				</Flex>
			</div>
			<div class="[ flex-wrap justify-content-space-evenly gap-3 padding-1 margin-block-end-3 ]">
				{#if $homeStore.selectedItems.length === 0}
					<IntroCard />
				{/if}
				{#each $homeStore.selectedItems as item}
					<Table {item} />
				{/each}
			</div>
		</div>
	</section>
</div>

<Modal id="filters-modal">
	<Flex collapseOnMobile={true}>
		<TextInput
			bind:value={filterValue}
			containerCls={cubeCss('', '', 'width-100')}
			label="Enter filter"
			placeholder="Enter filter"
			list={$homeStore.masterData.attrs}
		/>
		<Button on:click={addFilter} attachments={['hologram', 'capsule', 'mix']}
			><Icon ariaLabel="Add filter">{ICON_PLUS}</Icon></Button
		>
	</Flex>
	<Flex justify="start" cls={cubeCss('', '', 'flex-wrap margin-block-start-2')}>
		{#each $homeStore.filters as filter}
			<Button
				on:click={() => homeStore.removeFilter(filter)}
				attachments={['hologram', 'tiny-pad', 'capsule', 'mix']}>{filter}</Button
			>
		{/each}
	</Flex>

	<div slot="buttons">
		<Flex cls={cubeCss('', '', 'margin-block-start-2')} align="end" gap={1}>
			<Button
				on:click={() => homeStore.resetFilters()}
				cls={cubeCss('', '', 'margin-inline-2')}
				variant="error"
				attachments={['hologram']}>Reset</Button
			>
			<Button on:click={() => homeStore.clearFilters()} variant="muted" attachments={['hologram']}
				>Clear</Button
			>
			<Button on:click={() => homeStore.saveFiltersToLocalStorage()} attachments={['hologram']}
				>Save</Button
			>
		</Flex>
	</div>
</Modal>
