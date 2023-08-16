<script lang="ts">
	import Category from '../../../components/Modules/Category/Category.svelte';
	import ItemCategory from '../../../components/Modules/Category/ItemCategory.svelte';
	import Flex from '../../../components/Modules/FlexAndGrid/Flex.svelte';
	import { homeStore } from '../../../stores/homeStore';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';
</script>

<Flex cls={cubeCss('', '', 'width-100 margin-block-start-2')} useColumn={true} gap={2}>
	<Category
		categoryTitle="Vanilla"
		categoryItemsLength={Object.keys($homeStore.masterData.organized_items['vanilla']).length}
	>
		{#each Object.entries($homeStore.masterData.organized_items['vanilla']) as x}
			<div class="margin-block-2">
				<ItemCategory categoryName={x[0]} categoryItems={x[1]} />
			</div>
		{/each}
	</Category>

	<Category
		categoryTitle="Mods"
		categoryItemsLength={Object.keys($homeStore.masterData.organized_items['mods']).length}
	>
		{#each Object.entries($homeStore.masterData.organized_items['mods']) as mods}
			<div class="margin-block-2">
				<Category categoryTitle={mods[0]} categoryItemsLength={Object.values(mods[1]).length}>
					{#each Object.entries(mods[1]) as modCategory}
						<div class="margin-block-2">
							<ItemCategory categoryName={modCategory[0]} categoryItems={modCategory[1]} />
						</div>
					{/each}
				</Category>
			</div>
		{/each}
	</Category>
</Flex>
