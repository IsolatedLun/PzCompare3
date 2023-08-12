<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { spawnOverlay } from './utils';
	import type { ButtonAttachments } from './types';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';

	onMount(() => {
		use(_this);
	});

	function handleClick(e: MouseEvent) {
		spawnOverlay(e);
		dispatch('click', e);
	}

	export let cls = cubeCss('', '', '');
	export let use: (_this: HTMLElement) => void = () => null;
	export let variant = 'primary';
	export let attachments: ButtonAttachments[] = [];
	
    export let disabled = false;
	export let selected = false;
	export let isSubmit = false;
	
    export let to: string = '';

	const dispatch = createEventDispatcher();
	const _class = cls.extend(
		'',
		'button',
		`${to ? 'display-block' : ''}`
	);

	let _this: HTMLElement;
</script>

{#if to}
	<a
		bind:this={_this}
		on:click={handleClick}
		href={to}
		class={_class.toString()}

		data-variant={variant}
		data-attachments={attachments.join(',')}
		data-disabled={disabled}
	>
		<slot />
	</a>
{:else}
	<button
		bind:this={_this}
		on:click={handleClick}

		class={_class.toString()}
		type={isSubmit ? 'submit' : 'button'}
        
		data-variant={variant}
		data-attachments={attachments.join(',')}
		data-disabled={disabled}
		data-selected={selected}
	>
		<slot />
	</button>
{/if}