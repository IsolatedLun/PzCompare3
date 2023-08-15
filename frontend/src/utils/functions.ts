import { homeStore } from "../stores/homeStore";
import type { Item, OperatorFilter } from "../stores/types";

export function filterItems(items: string[], filters: Record<string, OperatorFilter>) {
    if(Object.keys(filters).length === 0)
        return items;

    const filteredItems: string[] = [];
    items.forEach(itemName => {
        const itemObject = homeStore.getItemByName(itemName);
        Object.values(filters).forEach(filter => {
            if(itemObject[filter.key] !== undefined) {
                if(filter.operator === '>' && itemObject[filter.key] > filter.value)
                filteredItems.push(itemObject["DisplayName"] as string);
                if(filter.operator === '<' && itemObject[filter.key] < filter.value)
                    filteredItems.push(itemObject["DisplayName"] as string);
                if(filter.operator === '===' && itemObject[filter.key] === filter.value)
                    filteredItems.push(itemObject["DisplayName"] as string);
            }
        })
    })

    return filteredItems;
}

export function paginate(items: any[], itemsPerPage: number, page: number)
: [string[], number, number]
{
    if(page * itemsPerPage > items.length)
        page = Math.floor(items.length / itemsPerPage);
    if(page < 0) 
        page = 0;

    const currentItems = items.slice(
        page * itemsPerPage,
        page * itemsPerPage + itemsPerPage
    );

    return [currentItems, page, Math.floor(items.length / itemsPerPage)];
}