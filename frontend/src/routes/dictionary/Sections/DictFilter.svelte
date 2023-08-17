<script lang="ts">
	import Button from '../../../components/Interactibles/Button/Button.svelte';
	import CheckBoxInput from '../../../components/Interactibles/Input/CheckBoxInput.svelte';
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Flex from '../../../components/Modules/FlexAndGrid/Flex.svelte';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { ICON_ARROW_LEFT, ICON_ARROW_RIGHT, ICON_EQUAL } from '../../../components/icons';
	import { dictStore } from '../../../stores/dictionaryStore';
	import { homeStore } from '../../../stores/homeStore';
	import type { Operator } from '../../../stores/types';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';

	function addFilter() {
		if (key && value && operator) {
			dictStore.addFilter(key, value, operator);
			key = value = operator = '';
		}
	}

	function addAttributeFilter() {
		if (key) {
			dictStore.addFilter(key, '', 'in');
			key = '';
		}
	}

	export let showOrganizedItems = false;

	let key: string = '';
	let value: string = '';
	let operator: Operator = '';
</script>

<Flex cls={cubeCss('', '', 'width-100')} useColumn={true} gap={2}>
	<Flex>
		<TextInput
			bind:value={key}
			showLabel={true}
			label="Attribute"
			placeholder="Eg. Weight"
			list={$homeStore.masterData.attrs}
		/>
		<TextInput bind:value showLabel={true} label="Value" placeholder="Eg. 50" />
	</Flex>
	<Flex cls={cubeCss('', '', 'flex-wrap width-100')} justify="center">
		<Flex align='center' gap={2}>
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
            <!-- <Flex>
                <Button
					on:click={() => (conditional = 'and')}
					selected={conditional === 'and'}
					attachments={['hologram', 'tiny-pad', 'mix']}
					>AND</Button
				>
                <Button
					on:click={() => (conditional = 'or')}
					selected={conditional === 'or'}
					attachments={['hologram', 'tiny-pad', 'mix']}
					>OR</Button
				>
            </Flex> -->
		</Flex>

		<Flex cls={cubeCss('', '', 'flex-wrap width-100')}>
			<Button
				on:click={addFilter}
				attachments={['hologram', 'small-pad', 'mix', 'capsule']}
				cls={cubeCss('', '', 'width-100')}>Add</Button
			>
			<Button
				on:click={addAttributeFilter}
				attachments={['hologram', 'small-pad', 'mix', 'capsule']}
				cls={cubeCss('', '', 'width-100')}>Add attribute</Button
			>
		</Flex>
	</Flex>

	<div class="width-100">
		<h3 class="fw-500">Filters</h3>
		<Card cls={cubeCss('', '', 'width-100')} variant="muted-light" padding={1}>
			<Flex cls={cubeCss('', '', 'flex-wrap')}>
				{#if Object.values($dictStore.filters).length === 0}
					<p>No filters found</p>
				{/if}
				{#each Object.values($dictStore.filters) as filter}
					<Button
						on:click={() => dictStore.removeFilter(filter.key)}
						variant={['and', 'or'].includes(filter.operator) ? 'muted' : 'primary'}
						attachments={['capsule', 'hologram', 'mix', 'tiny-pad']}
					>
						{#if ['in', 'and', 'or'].includes(filter.operator)}
							{filter.key}
						{:else}
							{filter.key}
							{filter.operator === '===' ? '=' : filter.operator}
							{filter.value}
						{/if}
					</Button>
				{/each}
			</Flex>
		</Card>
	</div>

	<h3 class="fw-500">Options</h3>
	<CheckBoxInput label='Organize items' bind:checked={showOrganizedItems} />
</Flex>
