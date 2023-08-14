export type Item = Record<string, string | number | string[]>;
export type MasterData =  {
    items: Record<string, Item>,
    modKeys: Record<string, string[]>,
    attrs: string[],
    
    version: string,
    date_updated: string
}

export interface HomeStore {
    masterData: MasterData,
    selectedItems: Record<string, Item>,
    differences: Record<string, Record<string, number>>,
    filters: string[],
    invertFilters: boolean
}