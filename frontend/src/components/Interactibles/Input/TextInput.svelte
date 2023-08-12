<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { TextInputAttachments, TextInputVariants } from './types';
	import Button from '../Button/Button.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import Flex from '../../Modules/FlexAndGrid/Flex.svelte';
	import type { Some } from '../../types';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';

	onMount(() => {
		id = crypto.randomUUID();
		use(_this!);
	});

	function handleInput(e: Event) {
		dispatch('input', e);
	}

	function handleKeyDown(e: KeyboardEvent) {
		dispatch(e.key.toLowerCase(), e);
	}

	export let cls = cubeCss('', '', '');
	export let use: (_this: HTMLElement) => void = () => null;
	export let containerCls = cubeCss('', '', '');
	export let variant: TextInputVariants = 'primary';
	export let attachments: TextInputAttachments[] = [];
	export let label: string;
	export let placeholder: string;
	export let showLabel = false;

	export let id = '';
	export let value = '';
	export let endIcon: string | null = null;

	const dispatch = createEventDispatcher();

	const _class = cls.extend(
		'input width-100',
		'',
		'outline-none'
	);
	const _containerCombinedClass = containerCls.extend(
		'input-container',
		'',
		'pos-relative width-100',
	);

	export let _this: Some<HTMLElement> = null;
</script>

<Flex
	cls={_containerCombinedClass}
	useColumn={true}
	use={(e) => e.setAttribute('data-variant', variant)}
>
	<label for={id} hidden={!showLabel}>
		{label}
	</label>
	<div class="[ pos-relative width-100 ]">
		<input
			bind:this={_this}
			bind:value
			on:input={handleInput}
			on:keydown={handleKeyDown}
			class={_class.toString()}
			data-variant={variant}
			data-attachments={attachments.join(',')}
			{id}
			type="text"
			{placeholder}
		/>

		{#if endIcon}
			<Button
				cls={cubeCss('input-end-button', '' ,'pos-absolute')}
				attachments={['transparent']}
				on:click={() => dispatch('endButtonClick', _this)}
			>
				<Icon>{endIcon}</Icon>
			</Button>
		{/if}
	</div>
</Flex>
