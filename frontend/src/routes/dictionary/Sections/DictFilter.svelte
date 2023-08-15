<script lang='ts'>
	import Button from "../../../components/Interactibles/Button/Button.svelte";
	import TextInput from "../../../components/Interactibles/Input/TextInput.svelte";
	import Card from "../../../components/Modules/Card/Card.svelte";
	import Flex from "../../../components/Modules/FlexAndGrid/Flex.svelte";
	import Icon from "../../../components/Modules/Icon/Icon.svelte";
	import { ICON_ARROW_LEFT, ICON_ARROW_RIGHT, ICON_EQUAL } from "../../../components/icons";
	import { dictStore } from "../../../stores/dictionaryStore";
	import { homeStore } from "../../../stores/homeStore";
	import type { Operator } from "../../../stores/types";
	import { cubeCss } from "../../../utils/cubeCss/cubeCss";

    function addFilter() {
		if(key && value && operator) {
			dictStore.addFilter(key, value, operator);
			key = value = operator = '';
		}
	}

    let key: string = '';
	let value: string = '';
	let operator: Operator = '';
</script>
<Flex cls={cubeCss('', '', 'width-100')} useColumn={true}>
    <Flex>
        <TextInput
            bind:value={key}
            showLabel={true}
            label="Attribute"
            placeholder="Eg. Damage"
            list={$homeStore.masterData.attrs}
        />
        <TextInput bind:value showLabel={true} label="Value" placeholder="Eg. 50" />
    </Flex>
    <Flex cls={cubeCss('', '', 'flex-wrap width-100')} justify="center">
        <Flex>
            <Button
                on:click={() => (operator = '<')}
                selected={operator === '<'}
                attachments={['hologram', 'small-pad', 'mix']}
                ><Icon fontSize={350}>{ICON_ARROW_LEFT}</Icon></Button
            >
            <Button
                on:click={() => (operator = '===')}
                selected={operator === '==='}
                attachments={['hologram', 'small-pad', 'mix']}
            >
                <Icon fontSize={350}>{ICON_EQUAL}</Icon>
            </Button>
            <Button
                on:click={() => (operator = '>')}
                selected={operator === '>'}
                attachments={['hologram', 'small-pad', 'mix']}
                ><Icon fontSize={350}>{ICON_ARROW_RIGHT}</Icon></Button
            >
        </Flex>

        <Button
            on:click={addFilter}
            attachments={['hologram', 'small-pad', 'mix', 'capsule']}
            cls={cubeCss('', '', 'width-100')}>Add</Button
        >
    </Flex>

    <h3 class="fw-500">Filters</h3>
    <Card cls={cubeCss('', '', 'width-100')} variant="muted-light" padding={1}>
        <Flex cls={cubeCss('', '', 'flex-wrap')}>
            {#if Object.values($dictStore.filters).length === 0}
                <p>No filters found</p>
            {/if}
            {#each Object.values($dictStore.filters) as filter}
                <Button 
                    on:click={() => dictStore.removeFilter(filter.key)}
                    attachments={['capsule', 'hologram', 'mix', 'tiny-pad']}>
                    {filter.key}  {filter.operator}  {filter.value}
                </Button>
            {/each}
        </Flex>
    </Card>
</Flex>