<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../../Interactibles/Button/Button.svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../FlexAndGrid/Flex.svelte';

	onMount(() => {
		if (id.length === 0) id = crypto.randomUUID();
	});

	export let id: string = '';

	let _this: HTMLDialogElement;
</script>

<dialog {id} bind:this={_this}>
	<slot />
	<Flex align='end' justify='space-between'>
		<Button
			on:click={() => _this.close()}
			cls={cubeCss('', '', 'margin-block-start-2')}
			variant="error">Close</Button
		>

		<slot name='buttons' />
	</Flex>
</dialog>
