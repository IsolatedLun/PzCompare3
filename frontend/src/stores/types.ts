export type Item = Record<string, string | number | string[]>;
export type MasterData =  {
    items: Record<string, Item>,
    modKeys: Record<string, string[]>,
}

export interface HomeStore {
    masterData: MasterData,
    selectedItems: Record<string, Item>,
    filters: string[],
    invertFilters: boolean
}