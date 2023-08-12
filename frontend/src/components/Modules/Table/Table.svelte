<script lang='ts'>
	import { homeStore } from "../../../stores/homeStore";

    export let item: Record<string, string | number | string[]> = {}
</script>

<div>
    <h2 class="fw-500">{item['DisplayName']}</h2>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Value</td>
                    <td>%</td>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(item) as x}
                    {#if !$homeStore.invertFilters && !$homeStore.filters.includes(x[0])}
                        <tr>
                            <td>{x[0]}</td>
                            <td>{x[1]}</td>
                            <td></td>
                        </tr>

                        {:else if $homeStore.invertFilters && $homeStore.filters.includes(x[0])}
                        <tr>
                            <td>{x[0]}</td>
                            <td>{x[1]}</td>
                            <td></td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>