<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../Card/Card.svelte';
	import Flex from '../FlexAndGrid/Flex.svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Button from '../../Interactibles/Button/Button.svelte';

	export let categoryTitle: string;
	export let categoryItemsLength: number;

	let showCategories = false;
</script>

<Card cls={cubeCss('category', '', 'width-100')}>
	<header class="category__header">
		<Flex align="center" justify="space-between">
			<h2 class="fw-500">
				{categoryTitle} <span class="[ fs-400 clr-neutral-800 ]">[{categoryItemsLength}]</span>
			</h2>
			<Button
				on:click={() => (showCategories = !showCategories)}
				variant={showCategories ? 'error' : 'muted'}
				attachments={['hologram', 'mix']}
			>
				{#if showCategories}
					Close
				{:else}
					Open
				{/if}
			</Button>
		</Flex>
	</header>

	{#if showCategories}
		<slot />
	{/if}
</Card>
