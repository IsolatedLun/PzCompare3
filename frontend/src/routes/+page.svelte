<script>
	import Button from '../components/Interactibles/Button/Button.svelte';
	import Navbar from '../components/Layouts/Navbar/Navbar.svelte';
	import Flex from '../components/Modules/FlexAndGrid/Flex.svelte';
	import Icon from '../components/Modules/Icon/Icon.svelte';
	import HomePage from '../components/Pages/HomePage.svelte';
	import { ICON_CALCULATOR, ICON_FILTER, ICON_SETTINGS } from '../components/icons';
	import { cubeCss } from '../utils/cubeCss/cubeCss';
</script>

<div class="[ home-grid ] [ flex-grow-1 height-100 ]">
	<section class="height-100" data-desktop='true'>
		<Flex align="center" useColumn={true} gap={2}>
			<Button cls={cubeCss('', '', 'width-100')} attachments={['hologram', 'mix', 'big-pad', 'capsule']}
				><Icon>{ICON_CALCULATOR}</Icon></Button
			>
			<Button cls={cubeCss('', '', 'width-100')} attachments={['hologram', 'mix', 'big-pad', 'capsule']}
				><Icon>{ICON_FILTER}</Icon></Button
			>
			<Button cls={cubeCss('', '', 'width-100 margin-block-start-2')} attachments={['hologram', 'mix', 'big-pad', 'capsule']}
				><Icon>{ICON_SETTINGS}</Icon></Button
			>
		</Flex>
	</section>
	<section>
		<Navbar />
		<HomePage />
	</section>
</div>
