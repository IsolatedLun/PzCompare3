<script lang="ts">
	import { onMount } from 'svelte';
	import { homeStore } from '../../../stores/homeStore';
	import Button from '../../Interactibles/Button/Button.svelte';
	import TextInput from '../../Interactibles/Input/TextInput.svelte';
	import Flex from '../../Modules/FlexAndGrid/Flex.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import { ICON_PLUS } from '../../icons';
	import { cubeCss } from '../../../utils/cubeCss/cubeCss';


	function addItem() {
		homeStore.addItem(name);
		name = '';
	}
	let name: string = '';
</script>

<nav class="[ navbar ] [ margin-block-end-2 ]">
	<Flex align="center" cls={cubeCss('', '', 'flex-wrap')} alignCenterOnMobile={true} gap={3}>
		<h1 class="fw-normal" data-desktop='true'>
			PzCompare <span class="visually-hidden">PzCompare - Project Zomboid Compare</span>
		</h1>
		<Flex align="center">
			<TextInput
				bind:value={name}
				list={homeStore.getItemNames()}
				label="Search item"
				cls={cubeCss('', '', 'width-100')}
				placeholder={`Search ${Object.keys($homeStore.masterData.items).length} items...`}
			/>
			<Button on:click={addItem} attachments={['hologram', 'mix', 'capsule']}
				><Icon>{ICON_PLUS}</Icon></Button
			>
		</Flex>
		<Button to='/dictionary' attachments={['hologram', 'mix']}>Dictionary</Button>
	</Flex>
</nav>
