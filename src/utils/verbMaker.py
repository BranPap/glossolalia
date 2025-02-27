import csv
import json
import os
from collections import defaultdict

# Get the directory where the script is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

def convert_csv_to_json(csv_file, output_file='verbs.js'):
    # Construct full path to CSV file
    csv_path = os.path.join(SCRIPT_DIR, csv_file)
    
    print(f"Looking for CSV file at: {csv_path}")
    
    # Read CSV file
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    
    # Group by verb
    verbs_dict = defaultdict(lambda: defaultdict(lambda: defaultdict(dict)))
    
    for row in rows:
        verb = row['verb']
        language = row['language']
        
        # If this is our first time seeing this verb
        if 'translation' not in verbs_dict[verb]:
            verbs_dict[verb] = {
                'verb': verb,
                'language': language,
                'translation': row['translation'],
                'forms': defaultdict(dict)
            }
        
        # Combine mood and tense if mood is not indicative
        tense_key = f"{row['mood']}_{row['tense']}" if row['mood'] != 'indicative' else row['tense']
        
        # Add the conjugation
        verbs_dict[verb]['forms'][tense_key][row['person']] = {
            'pronoun': row['pronoun'],
            'form': row['form']
        }
    
    # Construct full path for output file
    output_path = os.path.join(SCRIPT_DIR, output_file)
    
    # Convert to list and write to file
    verbs_list = list(verbs_dict.values())
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f'export const verbs = {json.dumps(verbs_list, indent=2)};')
    
    print(f"Successfully converted {len(verbs_list)} verbs to {output_path}")

if __name__ == "__main__":
    convert_csv_to_json('output.csv')