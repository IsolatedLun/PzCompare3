import copy 

items = [
    {
        'weight': [0.1, 0],
    },
    {
        'weight': [1, 0],
    }
]

def compare_stats(current_item: dict, items: list[dict]):
    _current_item = current_item
    organized_stats = organize_stats(items)
    for (key, (val, _)) in current_item.items():
        stats = organized_stats[key]
        average =  sum(stats) / len(stats)
        abs_diff = val - average

        _current_item[key][1] = round((abs_diff / average) * 100, 2)
    return _current_item

def organize_stats(items: list[dict]):
    results = {}
    for item in items:
        for (key, (val, _)) in item.items():
            if not results.get(key, False):
                results[key] = []
            results[key].append(val)

    return results

for (i, item) in enumerate(items):
    _items = copy.deepcopy(items)
    _items.pop(i)

    print(compare_stats(item, _items))