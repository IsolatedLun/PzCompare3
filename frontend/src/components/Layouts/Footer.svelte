<script>
	import { homeStore } from "../../stores/homeStore";


	import Flex from "../Modules/FlexAndGrid/Flex.svelte";

</script>

<footer class="padding-3">
    <Flex align='center' justify='space-between' collapseOnMobile={true} alignCenterOnMobile={true} gap={3}>
        <Flex align='end' gap={2} collapseOnMobile={true} alignCenterOnMobile={true}>
            <p class="[ fs-500 fw-500 ]">PzCompare <span class="visually-hidden">Project Zomboid Compare</span></p>
            <p class="clr-neutral-800">
                © 2023 Isolated | <span class="fs-350">Build {$homeStore.masterData.version}</span>
            </p>
        </Flex>

        <ul class="[ flex gap-2 flex-wrap justify-content-center ]">
            <li>
                <Flex gap={2}>
                    <a href="/">Home</a>
                    <a href="/dictionary">Dictionary</a>
                </Flex>
            </li>
            <div class="clr-neutral-800" aria-hidden="true">|</div>
            <li>
                <Flex gap={2}>
                    <a href="https://www.buymeacoffee.com/isolated" target="_blank">Donate</a>
                    <a href="https://github.com/IsolatedLun/PzCompare3" target="_blank">Source code</a>
                    <a href="mailto:isolunaj3@gmail.com" target="_blank">Contact</a>
                </Flex>
                
            </li>
            <div class="clr-neutral-800" aria-hidden="true">|</div>
            <li>
                <Flex gap={2}>
                    <a href="https://projectzomboid.com/blog/">Buy Project Zomboid</a>
                    <a href="https://pzwiki.net/wiki/Main_Page">Wiki</a>
                </Flex>
            </li>
        </ul>
    </Flex>
</footer>