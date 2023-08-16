<script lang="ts">
	import { onMount } from 'svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Flex from '../../Modules/FlexAndGrid/Flex.svelte';

	onMount(() => {
		id = crypto.randomUUID();
	});

	export let id: string = '';
	export let cls = cubeCss('', '', '');
	export let label: string;
	export let checked: boolean = false;

	let _class = cls.extend('', '', 'input').toString();
</script>

<div class="input-container" data-input-type="checkbox">
	<Flex align="center">
		<input {id} class={_class} type="checkbox" bind:checked hidden />
		<label
			class="[ cursor-pointer pos-relative border-radius-max ]"
			for={id}
			data-checked={checked}
		>
			<p class="visually-hidden">{label}</p>
			<div class="[ circle ] [ pos-absolute border-radius-max ]" />
		</label>
		<p>{label}</p>
	</Flex>
</div>
