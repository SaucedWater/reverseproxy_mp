DATA='{"model": "qwen2.5:1.5b", "prompt": "hi", "stream": false}'

curl -k -X POST https://www.dev.org/ollama/api/generate \
     --cookie "$COOKIE" \
     -H "X-Request-Timestamp: $(date +%s)000" \
     -d "$DATA"
echo ""

DATA='{"model": "qwen2.5:1.5b", "prompt": "hi", "stream": false}'

curl -k -X POST https://www.dev.org/ollama/api/generate \
     --cookie "$COOKIE" \
     -H "X-Request-Timestamp: 1768631128000" \
     -d "$DATA"
echo ""

DATA='{"model": "qwen2.5:1.5b", "prompt": "hi", "stream": false}'

curl -k -X POST https://www.dev.org/ollama/api/generate \
     --cookie "$COOKIE" \
     -d "$DATA"
echo ''
