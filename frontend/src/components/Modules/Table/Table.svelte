<script lang="ts">
	import { homeStore } from '../../../stores/homeStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
	import Button from '../../Interactibles/Button/Button.svelte';
	import { ICON_TRASH } from '../../icons';
	import Flex from '../FlexAndGrid/Flex.svelte';
	import Icon from '../Icon/Icon.svelte';

    function removeItem() {
        homeStore.removeItem(item['DisplayName'] as string);
    }

	export let item: Record<string, string | number | string[]> = {};
</script>

<Flex useColumn={true} align='center' justify='start'>
	<Flex cls={cubeCss('', '', 'width-100')} align="center" gap={2}>
		<h2 class="[ fw-500 text-align-center ]">{item['DisplayName']}</h2>
		<Button on:click={removeItem} variant="error" attachments={['hologram', 'mix', 'tiny-pad']}
			><Icon fontSize={350} ariaLabel="Remove this item">{ICON_TRASH}</Icon></Button
		>
	</Flex>
	<div class="[ table-container ] [ width-fit-content overflow-hidden ]">
		<table>
			<thead>
			<tr class="[ fs-350 fw-500 ]">
					<td>Name</td>
					<td>Value</td>
					<td>%</td>
				</tr>
			</thead>
			<tbody class="fs-300">
				{#each Object.entries(item) as x}
					{#if 
					!$homeStore.invertFilters && !$homeStore.filters.includes(x[0])
					||
					$homeStore.invertFilters && $homeStore.filters.includes(x[0])
					}
						<tr data-target={$homeStore.currentSortBy === x[0]} data-type={
							$homeStore.differences[item['DisplayName']]?.[x[0]] === 0
							|| !$homeStore.differences[item['DisplayName']]?.[x[0]]
							? 'neutral'
							: $homeStore.differences[item['DisplayName']]?.[x[0]] > 0
							? 'positive'
							: 'negative'
							}
						>
							<td>{x[0]}</td>
							<td>{x[1]}</td>
							<td class="[ pct ] [ text-align-center ]">
								{
									$homeStore.differences[item['DisplayName']]?.[x[0]]
									? $homeStore.differences[item['DisplayName']]?.[x[0]] + '%'
									: '-'
								}
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</Flex>
