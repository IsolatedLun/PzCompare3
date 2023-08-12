export interface HomeStore {
    items: Record<string, string | number | string[]>[],
    filters: string[],
    invertFilters: boolean
}