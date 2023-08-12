<script lang="ts">
	import { onMount } from 'svelte';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import type { FlexAlignTypes, FlexJustifyTypes } from './types';

	onMount(() => {
		use(_this!);
	});

	export let id = '';
	export let tag = 'div';
	export let cls = cubeCss('', '', '');
	export let justify: FlexJustifyTypes = 'space-between';
	export let align: FlexAlignTypes = 'start';
	export let gap: string | number = 1;
	export let useColumn = false;

	export let collapseOnMobile = false;
	export let alignCenterOnMobile = false;
	export let wrapOnMobile = false;
	
	export let use: (_this: HTMLElement) => void = () => null;
	const _class = cls.extend(
		'',
		'',
		`flex align-items-${align} justify-content-${justify} gap-${gap} ${
			useColumn ? 'flex-direction-column' : ''
		}`
	);
	export let _this: HTMLElement | null = null;
</script>

<svelte:element
    {id}
	this={tag}
	class={_class.toString()}

	bind:this={_this}
    
	data-collapse={collapseOnMobile}
	data-center-on-mobile={alignCenterOnMobile}
	data-flex-wrap={wrapOnMobile}
>
	<slot />
</svelte:element>