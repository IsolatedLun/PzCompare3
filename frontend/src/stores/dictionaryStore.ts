import { get, writable } from "svelte/store";
import type { DictionaryStore, Operator } from "./types";
import { filterItems } from "../utils/functions";
import { homeStore } from "./homeStore";

export function createDictStore() {
    const store = writable<DictionaryStore>({
        items: [],
        currentItems: [],
        filters: {},

        itemsPerPage: 20,
        page: 0,
        pages: 0,
    });

    return {
        subscribe: store.subscribe,

        getCurrentItems: () => get(store).currentItems,

        setItems: (items: string[]) => store.update(x => {
            x.items = items;
            x.pages = Math.floor(x.items.length / x.itemsPerPage);

            return x;
        }),
        setCurrentItems: (items: string[]) => store.update(x => {
            x.currentItems = items;
            return x;
        }),

        addFilter: (key: string, value: string, operator: Operator) => store.update(x => {
            x.filters[key] = { key, value, operator };

            return x;
        }),
        removeFilter: (key: string) => store.update(x => {
            delete x.filters[key];

            return x;
        }),

        changePage: (n: number) => {
            store.update(x => {
                x.page = n;
                return x;
            })
        },
    }
};

export const dictStore = createDictStore();