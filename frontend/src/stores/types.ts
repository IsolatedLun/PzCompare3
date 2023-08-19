export type Item = Record<string, string | number | string[]> & {
    DisplayName: string,
    Type: string,
};
export type CategoryList = Record<string, string[]>;
export type MasterData =  {
    items: Record<string, Item>,
    organized_items: {
        vanilla: CategoryList,
        mods: Record<
            string, // Mod name
            CategoryList
        >
    },
    mod_keys: Record<string, string[]>,
    attrs: string[],
    
    version: string,
    date_updated: string
}


export interface HomeStore {
    masterData: MasterData,
    selectedItems: Item[],
    currentSortBy: string;
    differences: Record<string, Record<string, number>>,
    filters: string[],
    invertFilters: boolean
}

// ===================
export type Operator = '' | '<' | '===' | '>' | 'in'; 
export type OperatorFilter = {
    key: string,
    operator: Operator,
    value: string | number
}

export interface DictionaryStore {
    items: string[],
    currentItems: string[],
    filters: Record<string, OperatorFilter>,

    itemsPerPage: number,
    page: number,
    pages: number
}