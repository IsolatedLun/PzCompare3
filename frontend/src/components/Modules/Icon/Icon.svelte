<script lang="ts">
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";


	export let tag = 'span';
	export let cls = cubeCss('', '', '');
	export let ariaLabel: string = '';
    export let fontSize: number = 400;

	const _class = cls.extend(
        'icon',
        '',
        `ignore-self fs-${fontSize}`
    )
</script>

<svelte:element 
    this={tag} 
    class={_class.toString()} 

    aria-hidden={ariaLabel.length === 0} 
    aria-label={ariaLabel}
>
	<slot />
</svelte:element>