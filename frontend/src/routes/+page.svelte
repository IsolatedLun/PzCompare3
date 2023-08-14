<script lang="ts">
	import Button from '../components/Interactibles/Button/Button.svelte';
	import type { ButtonAttachments } from '../components/Interactibles/Button/types';
	import TextInput from '../components/Interactibles/Input/TextInput.svelte';
	import Navbar from '../components/Layouts/Navbar/Navbar.svelte';
	import Flex from '../components/Modules/FlexAndGrid/Flex.svelte';
	import Icon from '../components/Modules/Icon/Icon.svelte';
	import Modal from '../components/Modules/Modal/Modal.svelte';
	import { openModal } from '../components/Modules/Modal/utils';
	import HomePage from '../components/Pages/HomePage.svelte';
	import { ICON_CALCULATOR, ICON_FILTER, ICON_PLUS, ICON_SETTINGS } from '../components/icons';
	import { homeStore } from '../stores/homeStore';
	import { cubeCss } from '../utils/cubeCss/cubeCss';

	function addFilter() {
		if (filterValue) homeStore.addFilter(filterValue);
		filterValue = '';
	}

	let filterValue: string = '';
	const buttonAttachments: ButtonAttachments[] = ['hologram', 'mix', 'big-pad', 'capsule'];
</script>

<div class="[ home-grid ] [ flex-grow-1 height-100 ]">
	<section class="height-100" data-desktop="true">
		<Flex align="center" useColumn={true} gap={2}>
			<Button
				on:click={() => homeStore.calculateDifferences()}
				cls={cubeCss('', '', 'width-100')}
				attachments={buttonAttachments}><Icon>{ICON_CALCULATOR}</Icon></Button
			>
			<Button
				on:click={() => openModal('filters-modal')}
				cls={cubeCss('', '', 'width-100')}
				attachments={buttonAttachments}><Icon>{ICON_FILTER}</Icon></Button
			>
		</Flex>
	</section>
	<section>
		<Navbar />
		<HomePage />
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
			><Icon>{ICON_PLUS}</Icon></Button
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
		<Flex cls={cubeCss('', '', 'margin-block-start-2')} align='end' gap={1}>
			<Button on:click={() => homeStore.resetFilters()} cls={cubeCss('', '', 'margin-inline-2')} variant='error' attachments={['hologram']}>Reset</Button>
			<Button on:click={() => homeStore.clearFilters()} variant='muted' attachments={['hologram']}>Clear</Button>
			<Button on:click={() => homeStore.saveFiltersToLocalStorage()} attachments={['hologram']}>Save</Button>
		</Flex>
	</div>
</Modal>
