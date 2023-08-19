<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../../../components/Interactibles/Button/Button.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Flex from '../../../components/Modules/FlexAndGrid/Flex.svelte';
	import { homeStore } from '../../../stores/homeStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { ICON_FILTER } from '../../../components/icons';
	import { openModal } from '../../../components/Modules/Modal/utils';
	import { dictStore } from '../../../stores/dictionaryStore';

	onMount(() => {
		itemsLength = homeStore.getItemsLenght();
		modsLength = homeStore.getModsLength();
	});

	function addAllItems() {
		dictStore.getCurrentItems().forEach(itemName => {
			homeStore.addItem(itemName);
		})
	}

	function clearAllItems() {
		homeStore.clearAllItems();
	}

	let itemsLength = 0;
	let modsLength = 0;
</script>

<header>
	<Flex cls={cubeCss('', '', 'width-100')} align="center" collapseOnMobile={true}>
		<Button to="/" attachments={['hologram', 'mix']}>Go back</Button>
		<Card variant="muted-light" padding={1}>
			<Flex>
				<Button variant="muted" attachments={['capsule', 'hologram', 'mix']}>
					{$homeStore.selectedItems.length} selected
				</Button>
				<Button variant="muted" attachments={['capsule', 'hologram', 'mix']}>
					{itemsLength} items
				</Button>
				<Button variant="muted" attachments={['capsule', 'hologram', 'mix']}>
					{modsLength} mods
				</Button>
			</Flex>
		</Card>
		<div class="[ width-100 margin-block-1 ]" data-mobile="true">
			<Button
				on:click={() => openModal('dict-mobile-filters-modal')}
				cls={cubeCss('', '', 'width-100')}
				attachments={['hologram', 'mix', 'capsule']}><Icon>{ICON_FILTER}</Icon></Button
			>
		</div>
		<Flex>
			<Button on:click={addAllItems} attachments={['hologram', 'mix']}>Add all</Button>
			<Button on:click={clearAllItems} variant='error' attachments={['hologram', 'mix']}>Clear</Button>
		</Flex>
	</Flex>
</header>
