<script>

	import Flex from "../Modules/FlexAndGrid/Flex.svelte";

</script>

<footer class="padding-3">
    <Flex align='center' justify='space-between' collapseOnMobile={true} alignCenterOnMobile={true} gap={3}>
        <Flex align='end' gap={2}>
            <p class="[ fs-500 fw-500 ]">PzCompare</p>
            <p class="clr-neutral-800">© 2023 Isolated</p>
        </Flex>

        <ul class="[ flex gap-3 ]">
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">Dictionary</a>
            </li>
            <li>
                <a href="#">Source code</a>
            </li>
        </ul>
    </Flex>
</footer>