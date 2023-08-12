<script lang="ts">
	export let tag = 'span';
	export let value: number;
</script>

<svelte:element this={tag}>
	{Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 4 }).format(value)}
</svelte:element>