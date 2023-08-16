import { get, writable } from "svelte/store";
import type { HomeStore, MasterData } from "./types";
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
        selectedItems: {},
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
        
        getItems: () => Object.values(get(store).masterData.items),
        getItemsLenght: () => Object.keys(get(store).masterData.items).length,
        getModsLength: () => Object.keys(get(store).masterData.mod_keys).length,
        getItemNames: () => Object.keys(get(store).masterData.items),
        getItemByName: (name: string) => get(store).masterData.items[name],

        addItem: (name: string) => store.update(x => {
            if(x.masterData.items[name])
                x.selectedItems[name] = x.masterData.items[name];
            return x;
        }),
        removeItem: (name: string) => store.update(x => {
            delete x.selectedItems[name];
            x.differences = {};

            return x;
        }),
        clearAllItems: () => store.update(x => {
            x.selectedItems = {};
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
                Object.keys(x.selectedItems).forEach(itemKey => {
                    const items = structuredClone(x.selectedItems);
                    const item = structuredClone(items[itemKey])
                    delete items[itemKey];
                    
                    x.differences[itemKey] = calculateDifferences(item, Object.values(items));
                });

                return x;
            })
        },

        paginateItems: (page: number, query: string[]) => {
            const items = Object.keys(get(store).masterData.items);

            return items.splice(page * 20, page * 20 + 20);
        }
    }
};

export const homeStore = createHomeStore();