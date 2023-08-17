<script lang='ts'>
	import Button from "../../components/Interactibles/Button/Button.svelte";
	import Card from "../../components/Modules/Card/Card.svelte";
	import Flex from "../../components/Modules/FlexAndGrid/Flex.svelte";
	import Icon from "../../components/Modules/Icon/Icon.svelte";
	import { ICON_CALCULATOR, ICON_FILTER, ICON_PLUS } from "../../components/icons";
</script>

<Card padding={2}>
    <h2 class="[ fw-500 margin-block-end-1 ]">Start searching items</h2>
    <Flex align="center" useColumn={true} gap={2}>
        <Flex align="center" useColumn={true}>
            <p class="clr-neutral-800">Add items</p>
            <Button
                variant="muted"
                attachments={['hologram', 'capsule', 'mix', 'big-pad']}
                disabled={true}><Icon>{ICON_PLUS}</Icon></Button
            >
        </Flex>
        <Flex align="center" useColumn={true}>
            <p class="clr-neutral-800">Calculate the differences</p>
            <Button
                variant="muted"
                attachments={['hologram', 'capsule', 'mix', 'big-pad']}
                disabled={true}><Icon>{ICON_CALCULATOR}</Icon></Button
            >
        </Flex>
        <Flex align="center" useColumn={true}>
            <p class="clr-neutral-800">Filter attributes</p>
            <Button
                variant="muted"
                attachments={['hologram', 'capsule', 'mix', 'big-pad']}
                disabled={true}><Icon>{ICON_FILTER}</Icon></Button
            >
        </Flex>
        <Flex align="center" useColumn={true}>
            <p class="clr-neutral-800">Clear items</p>
            <Button
                variant="error"
                attachments={['hologram', 'capsule', 'mix', 'big-pad']}
                disabled={true}>C</Button
            >
        </Flex>
    </Flex>
</Card>