import { writable } from "svelte/store";
import type { HomeStore } from "./types";

export const homeStore = writable<HomeStore>({
    items: [],
    filters: [
        "MultipleHitConditionAffected",
        "SplatBloodOnNoDeath",
        "ManuallyRemoveSpentRounds",
        "DisplayName",
        "IsAimedFirearm",
        "SubCategory",
        "ShareDamage",
        "NPCSoundBoost",
        "haveChamber"
    ],
    invertFilters: false
})