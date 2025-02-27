import json
import re
import csv
import argparse

def fix_js_object(js_text):
    """Convert JavaScript-style object syntax to valid JSON"""
    # Remove 'export const verbs = ' and trailing semicolon
    js_text = js_text.replace('export const verbs = ', '').rstrip(';')
    
    # Wrap unquoted keys with double quotes
    js_text = re.sub(r'([{,])\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1 "\2":', js_text)
    
    # Remove trailing commas before closing braces
    js_text = re.sub(r',\s*([}\]])', r'\1', js_text)
    
    return js_text

def convert_verbs_to_csv(input_file, output_file='verbs.csv'):
    with open(input_file, 'r', encoding='utf-8') as f:
        js_text = f.read()
    
    json_text = fix_js_object(js_text)
    print("Fixed JSON:", json_text)  # Debugging step to ensure transformation is happening
    
    try:
        verbs = json.loads(json_text)
    except json.JSONDecodeError as e:
        print("JSON Error:", e)
        return
    
    rows = []
    for verb in verbs:
        base_info = {
            'verb': verb['verb'],
            'language': verb['language'],
            'translation': verb['translation']
        }
        
        for tense, tense_forms in verb['forms'].items():
            mood, actual_tense = tense.split('_') if '_' in tense else ('indicative', tense)
            for person, details in tense_forms.items():
                pronoun = details.get('pronoun', '')
                form = details.get('form', '')
                rows.append({
                    **base_info,
                    'mood': mood,
                    'tense': actual_tense,
                    'person': person,
                    'pronoun': pronoun,
                    'form': form
                })
    
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['verb', 'language', 'translation', 'mood', 'tense', 'person', 'pronoun', 'form'])
        writer.writeheader()
        writer.writerows(rows)
    
    print(f"CSV saved to {output_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert JS object-style verb data to CSV.")
    parser.add_argument("input_file", help="Path to the input JavaScript file")
    parser.add_argument("output_file", nargs="?", default="verbs.csv", help="Path to the output CSV file")
    args = parser.parse_args()
    
    convert_verbs_to_csv(args.input_file, args.output_file)
