import type { Item } from "../stores/types"

const NEGATIVE_ATTRS = [
    "AimingTime",
    "RecoilDelay",
    "ReloadTime"
]

export function calculateDifferences(currentItem: Item, items: Item[]) {
    const differences: Record<string, number> = {};
    const [keys, organizedStats] = organizeStats(items); 
    keys.forEach(key => {
        const stats = organizedStats[key];
        const average = stats.reduce((sum, a) => sum + a) / stats.length;
        const abs_diff = (currentItem[key] as number) - average;

        let diff = (abs_diff / average) * 100;
        if(!Number.isNaN(diff)) {
            if(!Number.isFinite(diff))
                diff = 100;
            if(NEGATIVE_ATTRS.includes(key))
                diff = diff * -1;
            differences[key] = Math.round(diff);
        }
    });

    return differences;
}

export function organizeStats(items: Item[]): [string[], Record<string, number[]>] {
    const results: Record<string, number[]> = {};
    const keys: string[] = [];

    items.forEach((item) => {
        Object.keys(item).forEach(key => {
            const val = item[key];
            if(typeof(val) === 'number') {
                if(!results[key]) {
                    results[key] = [];
                };

                results[key].push(val);
                keys.push(key);
            };
        });
    });

    return [keys, results];
}
