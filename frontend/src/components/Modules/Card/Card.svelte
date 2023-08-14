<script lang="ts">
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";


	export let cls = cubeCss('', '', '');
    export let variant = 'muted';
    export let padding: number = 1;

	const _class = cls.extend(
        '',
        'card',
        `padding-${padding}`
    )
</script>

<div class="{_class.toString()}" data-variant={variant}>
    <slot />
</div>