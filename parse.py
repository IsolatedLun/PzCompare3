import json
import os
from datetime import datetime

def is_valid_key(key: str) -> bool:
    return (
        key not in FILTERS 
        and not key.endswith('Sound') 
        and not key.endswith('Anim')
    )

def parse_item(text: str) -> dict:
    result = {}
    split_text = text.split(',')
    for x in split_text:
        key_value = x.split('=')
        if len(key_value) > 1:
            key = key_value[0].strip()

            if is_valid_key(key):
                if key in ['EvolvedRecipe', 'Tags']:
                    val = [x.strip().replace(':', ': ') for x in key_value[1].split(';')]
                else:
                    val = key_value[1].strip()

                result[key] = val
    return result

def parse_file(fpath: str, fname: str) -> dict:
    with open(fpath, 'r') as f:
        data = f.read() 
        items = {}

        for i, char in enumerate(data):
            if char == '{':
                j = data[i::].index('}')
                item = parse_item(data[i + 1:i + j])
                items[item['DisplayName']] = item

                i = i + j

        return (items, fname)


GAME_VERSION = 'v41.78.16'
MASTER_DATA = {
    'version': GAME_VERSION,
    'date_updatd': datetime.now().strftime('%d/%m/%Y at %I:%M %p'),
    'items': {},
    'mod_keys': {}
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
]

for fname in os.listdir('data/vanilla/'):
    results, file_name = parse_file('data/vanilla/' + fname, fname)
    MASTER_DATA['items'] = {**MASTER_DATA['items'], **results}

for fname in os.listdir('data/mods/'):
    results, file_name = parse_file('data/mods/' + fname, fname)
    MASTER_DATA['items'] = {**MASTER_DATA['items'], **results}

    mod_name = fname.split('.')[0]
    for x in results.keys():
        if not MASTER_DATA['mod_keys'].get(mod_name, False):
            MASTER_DATA['mod_keys'][mod_name] = []
        MASTER_DATA['mod_keys'][mod_name].append(x)

with open('master_data.json', 'w') as f:
    # separators=(',', ':')
    json.dump(MASTER_DATA, f, indent=3)