<script>
	import { homeStore } from "../../stores/homeStore";


	import Flex from "../Modules/FlexAndGrid/Flex.svelte";

</script>

<footer class="padding-3">
    <Flex align='center' justify='space-between' collapseOnMobile={true} alignCenterOnMobile={true} gap={3}>
        <Flex align='end' gap={2} collapseOnMobile={true} alignCenterOnMobile={true}>
            <p class="[ fs-500 fw-500 ]">PzCompare</p>
            <p class="clr-neutral-800">
                © 2023 Isolated | <span class="fs-350">Build {$homeStore.masterData.version}</span>
            </p>
        </Flex>

        <ul class="[ flex gap-3 ]">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/dictionary">Dictionary</a>
            </li>
            <li>
                <a href="https://github.com/IsolatedLun/PzCompare3" target="_blank">Source code</a>
            </li>
            <li>
                <a href="https://www.buymeacoffee.com/isolated" target="_blank">Donate</a>
            </li>
        </ul>
    </Flex>
</footer>