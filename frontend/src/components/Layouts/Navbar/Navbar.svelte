<script>
	import Button from "../../Interactibles/Button/Button.svelte";
import TextInput from "../../Interactibles/Input/TextInput.svelte";
	import Flex from "../../Modules/FlexAndGrid/Flex.svelte";

</script>
<nav class="[ navbar ]">
    <Flex align='center'>
        <h1 class="fw-normal">PzCompare</h1>
        <Flex align='center'>
            <TextInput label="Search item" placeholder={'Search x items...'} />
            <Button>Add</Button>
        </Flex>
    </Flex>
</nav>