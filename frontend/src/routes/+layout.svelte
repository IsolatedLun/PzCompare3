<script lang='ts'>
	import { onMount } from "svelte";
	import { createHomeStore, homeStore } from "../stores/homeStore";
	import Footer from '../components/Layouts/Footer.svelte';

    async function fetchMasterData() {
        const masterData = await import("../master_data.json");
        homeStore.setMasterData(masterData as any);

        return Promise.resolve();
    }
</script>

{#await fetchMasterData() then _}
    <div class="[ flex flex-direction-column flex-grow-1 ]">
        <slot />
    </div>
    <Footer />
{/await}

<style>
    @import url('../../static/posty.css');
</style>