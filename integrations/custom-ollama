#!/usr/bin/env python3
import sys
import json
import requests
import time

# --- DEBUG: PROVE EXECUTION ---
with open('/tmp/ollama-debug.txt', 'a') as debug_f:
    debug_f.write(f"Script started at {time.ctime()}\n")

# 1. Read the alert file
try:
    alert_file = sys.argv[1]
    with open(alert_file) as f:
        alert_json = json.load(f)
except Exception as e:
    with open('/tmp/ollama-debug.txt', 'a') as debug_f:
        debug_f.write(f"Error reading alert file: {str(e)}\n")
    sys.exit()

# --- SAFETY CHECKS ---
# A. Prevent Infinite Loop (Ignore AI's own alerts)
if str(alert_json['rule']['id']) == "100001":
    sys.exit()

# B. Filter: Only analyze alerts Level 10+
if int(alert_json['rule']['level']) < 10:
    sys.exit()

# 2. Extract and TRUNCATE Data
log_description = alert_json['rule']['description']
full_log = alert_json.get('full_log', '')

# Limit log to 2000 characters to prevent crashing the 1.5B model
if len(full_log) > 2000:
    full_log = full_log[:2000] + "... [TRUNCATED]"

# 3. Construct the prompt
prompt = f"""
Do not hallucinate. You are a cybersecurity analyst and a blue team expert. Analyze this log and output valid JSON only.

Log: {full_log}
Rule: {log_description}

JSON Schema required:
{{
    "summary": "1 sentence explanation of the attack",
    "recommended_action": "1 technical action to block it",
    "false_positive_score": 0 to 100 (integer)
}}
"""

# 4. Send to Local Ollama API
url = "http://192.168.1.20:11434/api/generate"
data = {
    "model": "qwen2.5:1.5b",
    "prompt": prompt,
    "stream": False,
    "format": "json"
}

try:
    with open('/tmp/ollama-debug.txt', 'a') as debug_f:
        debug_f.write("Sending request to Ollama...\n")
        
    response = requests.post(url, json=data, timeout=250) # Added timeout
    response_json = response.json()

    if 'error' in response_json:
        raise Exception(f"Ollama API Error: {response_json['error']}")
    
    if 'response' not in response_json:
        raise Exception(f"Unexpected JSON format: {str(response_json)}")

    ai_text = response_json['response']
    ai_data = json.loads(ai_text)

except Exception as e:
    with open('/tmp/ollama-debug.txt', 'a') as debug_f:
        debug_f.write(f"AI Failed: {str(e)}\n")
        
    ai_data = {
        "summary": f"AI Error: {str(e)}", 
        "recommended_action": "Check /tmp/ollama-debug.txt",
        "false_positive_score": 0
    }

# 5. Write enriched log
output_entry = {
    "integration": "ollama",
    "original_alert_id": alert_json['id'],
    "original_rule_id": alert_json['rule']['id'],
    "original_rule_level": alert_json['rule']['level'],
    "original_description": log_description,
    "ai": ai_data
}

with open('/var/ossec/logs/active-responses.log', 'a') as f:
    f.write(json.dumps(output_entry) + "\n")
    
with open('/tmp/ollama-debug.txt', 'a') as debug_f:
    debug_f.write("Success! Written to log.\n")

