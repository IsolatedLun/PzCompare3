import { get, writable } from "svelte/store";
import type { HomeStore, MasterData } from "./types";

export function createHomeStore() {
    const store = writable<HomeStore>({
        masterData: {
            items: {},
            modKeys: {}
        },
        selectedItems: {},
        filters: [
            "MultipleHitConditionAffected",
            "SplatBloodOnNoDeath",
            "ManuallyRemoveSpentRounds",
            "DisplayName",
            "IsAimedFirearm",
            "SubCategory",
            "Categories",
            "IsAimedHandWeapon",
            "ShareDamage",
            "NPCSoundBoost",
            "haveChamber",
            "DamageCategory",
            "DamageMakeHole",
            "Tags",
            "AttachmentType",
            "DisplayCategory",
            "ConditionLowerChanceOneIn",
            "KnockBackOnNoDeath",
            "RequiresEquippedBothHands",
            "UseEndurance",
            "TwoHandWeapon",
            "EatType",
            "ReplaceOnUse",
            "*/\nEvolvedRecipeName",
            "/*EvolvedRecipeName",

            "EvolvedRecipe" // not implemented
        ],
        invertFilters: false
    });

    return {
        subscribe: store.subscribe,
        
        setMasterData: (masterData: MasterData) => store.update(x => {
            x.masterData = masterData;
            return x;
        }),
        
        getItemNames: () => Object.keys(get(store).masterData.items),

        addItem: (name: string) => store.update(x => {
            x.selectedItems[name] = x.masterData.items[name];
            return x;
        }),
        removeItem: (name: string) => store.update(x => {
            delete x.selectedItems[name];
            return x;
        }),
    }
};

export const homeStore = createHomeStore();