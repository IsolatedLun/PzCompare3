import { get, writable } from "svelte/store";
import type { HomeStore, Item, MasterData } from "./types";
import { calculateDifferences } from "../utils/comparator";
import { INITIAL_FILTERS } from "./consts";

export function createHomeStore() {
    const store = writable<HomeStore>({
        masterData: {
            items: {},
            organized_items: {
                vanilla: {},
                mods: {}
            },
            mod_keys: {},
            attrs: [],
            version: 'v41',
            date_updated: 'Now'
        },
        selectedItems: [],
        currentSortBy: '',
        differences: {},
        filters: INITIAL_FILTERS,
        invertFilters: false
    });

    return {
        subscribe: store.subscribe,
        
        setMasterData: (masterData: MasterData) => store.update(x => {
            x.masterData = masterData;
            return x;
        }),
        setCurrentSortBy: (sortBy: string) => store.update(x => {
            x.currentSortBy = sortBy;
            return x;
        }),
        
        getItems: () => Object.values(get(store).masterData.items),
        getAttrs: () => get(store).masterData.attrs,
        getItemsLenght: () => Object.keys(get(store).masterData.items).length,
        getModsLength: () => Object.keys(get(store).masterData.mod_keys).length,
        getItemNames: () => Object.keys(get(store).masterData.items),
        getItemByName: (name: string) => get(store).masterData.items[name],

        addItem: (name: string) => store.update(x => {
            if(
                x.masterData.items[name]
                &&
                !(x.selectedItems.find(item => item['DisplayName'] === name))
            )
                x.selectedItems.push(x.masterData.items[name]);
            return x;
        }),
        removeItem: (name: string) => store.update(x => {
            x.selectedItems = x.selectedItems.filter(item => item['DisplayName'] !== name);
            x.differences = {};
            x.currentSortBy = '';

            return x;
        }),
        clearAllItems: () => store.update(x => {
            x.selectedItems = [];
            x.differences = {};
            return x;
        }),

        addFilter: (filter: string) => store.update(x => {
            if(!x.filters.includes(filter))
                x.filters.push(filter);
            return x;
        }),
        removeFilter: (filter: string) => store.update(x => {
            x.filters = x.filters.filter(x => x !== filter);
            return x;
        }),

        saveFiltersToLocalStorage: () => {
            localStorage.setItem('filters', JSON.stringify(get(store).filters));
        },

        tryGetFiltersFromLocalStorage: () => {
            const filters = localStorage.getItem('filters');
            if(filters) {
                store.update(x => {
                    x.filters = JSON.parse(filters);
                    return x;
                });
            };
        },

        resetFilters: () => {
            localStorage.removeItem('filters');
            store.update(x => {
                x.filters = INITIAL_FILTERS;
                return x;
            });
        },

        clearFilters: () => {
            store.update(x => {
                x.filters = [];
                return x;
            })
        },

        calculateDifferences: () => {
            if(Object.keys(get(store).selectedItems).length < 1)
                return;

            store.update(x => {
                x.selectedItems.forEach(item => {
                    const itemName = item['DisplayName'] as string;
                    const otherItems: Item[] = x.selectedItems.filter(
                        item => item['DisplayName'] !== itemName
                    );
                    
                    x.differences[itemName] = calculateDifferences(item, otherItems);
                });

                return x;
            });
        },

        sortTablesByAttribute: () => store.update(x => {
            const attr = x.currentSortBy;
            // Since some items don't have the attribute
            // We exclude them, in order not to ruin the sort order
            const excludedItems = x.selectedItems.filter(item => item[attr] === undefined);
            x.selectedItems = x.selectedItems
                .filter(item => item[attr] !== undefined)
                .sort((a, b) => {
                        let attrA = Math.abs(a[attr] as number);
                        let attrB = Math.abs(b[attr] as number);

                        return attrB - attrA;
                    }
                ); 
            
            x.selectedItems.push(...excludedItems);
            return x;
        })
    }
};

export const homeStore = createHomeStore();