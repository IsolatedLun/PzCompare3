<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../Card/Card.svelte';
	import Flex from '../FlexAndGrid/Flex.svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Item from './Item.svelte';
	import Button from '../../Interactibles/Button/Button.svelte';
	import { homeStore } from '../../../stores/homeStore';

	function addAllItems() {
		categoryItems.forEach(item => homeStore.addItem(item));
	}

	export let categoryName: string;
	export let categoryItems: string[];
	export let canAddAll = false;

	let showItems = false;
</script>

<Card>
	<header class="category__header">
		<Flex align="center" justify="space-between">
			<h2 class="fw-500">
				{categoryName} <span class="fs-400 clr-neutral-800">[{categoryItems.length}]</span>
			</h2>
			<Flex align='center' gap={2}>
				<Button
					on:click={() => (showItems = !showItems)}
					variant={showItems ? 'error' : 'muted'}
					attachments={['hologram', 'mix']}
				>
					{#if showItems}
						Close
					{:else}
						Open
					{/if}
				</Button>
				{#if canAddAll}
					<Button
						on:click={addAllItems}
						attachments={['hologram', 'mix', 'tiny-pad', 'capsule']}
					>
						Add all
					</Button>
				{/if}
			</Flex>
		</Flex>
	</header>

	{#if showItems}
		<Flex cls={cubeCss('', '', 'width-100 margin-block-start-1')} useColumn={true}>
			{#each categoryItems as item}
				<Card cls={cubeCss('', '', 'width-100')} variant="muted-light">
					<Item {item} />
				</Card>
			{/each}
		</Flex>
	{/if}
</Card>
