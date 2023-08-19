<script lang='ts'>
	import Button from "../../../components/Interactibles/Button/Button.svelte";
	import Card from "../../../components/Modules/Card/Card.svelte";
	import Item from "../../../components/Modules/Category/Item.svelte";
	import Flex from "../../../components/Modules/FlexAndGrid/Flex.svelte";
	import { dictStore } from "../../../stores/dictionaryStore";
	import { homeStore } from "../../../stores/homeStore";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";
	import { filterItems, paginate } from "../../../utils/functions";

    function changePage(n: number) {
		dictStore.changePage(n);
	}

	let currentItems: string[] = [];
	dictStore.subscribe(x => {
		const filteredItems = filterItems(homeStore.getItemNames(), x.filters);
		let data = paginate(filteredItems, x.itemsPerPage, x.page);

		currentItems = data[0];

		x.page = data[1];
		x.pages = data[2];
        x.currentItems = filteredItems;
	})
</script>
<div class="margin-block-start-1">
    <Flex useColumn={true}>
        {#each currentItems as item}
            <Card cls={cubeCss('', '', 'fs-350 width-100')}>
                <Item {item} />
            </Card>
        {/each}
    </Flex>
</div>

<Flex cls={cubeCss('', '', 'margin-block-start-2')} align="center">
    <Button
        on:click={() => changePage($dictStore.page - 1)}
        disabled={$dictStore.page === 0}
        variant="muted"
        attachments={['small-pad', 'hologram', 'mix']}
    >
        Previous
    </Button>
    
    <p class="clr-neutral-800">Page {$dictStore.page + 1}/{$dictStore.pages + 1}</p>
    
    <Button
        on:click={() => changePage($dictStore.page + 1)}
        disabled={$dictStore.page === $dictStore.pages}
        variant="muted"
        attachments={['small-pad', 'hologram', 'mix']}
    >
        Next
    </Button>
</Flex>