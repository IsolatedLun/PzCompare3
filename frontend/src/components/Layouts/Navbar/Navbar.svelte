<script lang="ts">
	import { onMount } from 'svelte';
	import { homeStore } from '../../../stores/homeStore';
	import Button from '../../Interactibles/Button/Button.svelte';
	import TextInput from '../../Interactibles/Input/TextInput.svelte';
	import Flex from '../../Modules/FlexAndGrid/Flex.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import { ICON_PLUS } from '../../icons';


	function addItem() {
		homeStore.addItem(name);
	}
	let name: string = '';
</script>

<nav class="[ navbar ] [ margin-block-end-2 ]">
	<Flex align="center">
		<h1 class="fw-normal">PzCompare</h1>
		<Flex align="center">
			<TextInput
				bind:value={name}
				list={homeStore.getItemNames()}
				label="Search item"
				placeholder={'Search x items...'}
			/>
			<Button on:click={addItem} attachments={['hologram', 'mix', 'capsule']}
				><Icon>{ICON_PLUS}</Icon></Button
			>
		</Flex>
	</Flex>
</nav>
