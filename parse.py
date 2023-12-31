import json
import os
from datetime import datetime

def is_valid_key(key: str) -> bool:
    return (
        key not in FILTERS 
        and not key.endswith('Sound') 
        and not key.endswith('Anim')
    )

def clean_text(value: str) -> str:
    return value.strip() \
            .replace('*', '').replace('/', '') \
            .replace('\n', '').replace('\t', '').strip()

def try_num_convert(x: str) -> str | int | float:
    try:
        if x.isdigit():
            return int(x)
        return float(x)
    except:
        return x
    
def try_clean_val(x: str | int | float):
    if type(x) in [int, float]:
        return x
    
    if x.lower() == 'true':
        return True
    if x.lower() == 'false':
        return False
    return x

def parse_item(text: str) -> dict:
    result = {}
    keys = []

    split_text = text.split(',')
    for x in split_text:
        key_value = x.split('=')
        if len(key_value) > 1:
            key = clean_text(key_value[0])

            if is_valid_key(key):
                if key in ['EvolvedRecipe', 'Tags']:
                    val = [x.strip().replace(':', ': ') for x in key_value[1].split(';')]
                else:
                    val = try_clean_val(
                        try_num_convert(clean_text(key_value[1]))
                    )

                keys.append(key)
                result[key] = val
    return (keys, dict(sorted(result.items())))

def parse_file(fpath: str, fname: str) -> dict:
    with open(fpath, 'r') as f:
        data = f.read() 
        items = {}
        keys = []

        for i, char in enumerate(data):
            if char == '{':
                j = data[i::].index('}')

                (_keys, item) = parse_item(data[i + 1:i + j])
                keys.extend(_keys)
            
                if fpath.startswith('data/mods'):
                    item['ModName'] = fname.split('.')[0];

                items[item['DisplayName']] = item
                i = i + j

        return (keys, items, fname)
    
def organize_items(items: dict):
    results = {'vanilla': {}, 'mods': {}}
    for x in items.values():
        if not x.get('ModName', False):
            results['vanilla'].setdefault(x['Type'], []).append(x['DisplayName'])
        else:
            results['mods'].setdefault(x['ModName'], {}) \
                .setdefault(x['Type'], []) \
                .append(x['DisplayName'])
            
    return results

GAME_VERSION = 'v41.78.16'
KEYS = set()
VALUES = set()
MASTER_DATA = {
    'version': GAME_VERSION,
    'date_updated': datetime.now().strftime('%d/%m/%Y at %I:%M %p'),
    'items': {},
    'organized_items': {
        'vanilla': {},
        'mods': {}
    },
    'mod_keys': {},
    'attrs': [],
    'values': [],
}
FILTERS = [
    "WeaponReloadType",
    "BringToBearSound",
    "SwingSound",
    "WeaponSprite",
    "ModelWeaponPart",
    "WorldStaticModel",
    "Icon",
    "CustomEatSound",
    "StaticModel",
    "EvolvedRecipeName",
    "CantAttackWithLowestEndurance",
    "ManuallyRemoveSpentRounds",
    "secondaryAnimMask",
    "clothingExtraSubmenu",
    "CustomContextMenu",
    "MountOn",
    "IconsForTexture",
    "ReplaceInPrimaryHand",
    "ReplaceInSecondHand",
    "SoundParameter",
    "BloodLocation"
]

for fname in os.listdir('data/vanilla/'):
    keys, results, file_name = parse_file('data/vanilla/' + fname, fname)
    KEYS.update(keys)
    MASTER_DATA['items'] = {**MASTER_DATA['items'], **results}

for fname in os.listdir('data/mods/'):
    keys, results, file_name = parse_file('data/mods/' + fname, fname)
    KEYS.update(keys)
    MASTER_DATA['items'] = {**MASTER_DATA['items'], **results}

    mod_name = fname.split('.')[0]
    for x in results.keys():
        if not MASTER_DATA['mod_keys'].get(mod_name, False):
            MASTER_DATA['mod_keys'][mod_name] = []
        MASTER_DATA['mod_keys'][mod_name].append(x)

MASTER_DATA['attrs'] = list(KEYS)
MASTER_DATA['organized_items'] = organize_items(MASTER_DATA['items'])

with open('master_data.json', 'w') as f:
    # separators=(',', ':')
    json.dump(MASTER_DATA, f, indent=3)