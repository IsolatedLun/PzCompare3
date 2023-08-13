<script lang='ts'>
	import { onMount } from "svelte";

    onMount(() => {
        openDialog();
    })

    function openDialog() {
        _this.showModal();
    }

    let _this: HTMLDialogElement;
</script>

<dialog bind:this={_this}>

</dialog>