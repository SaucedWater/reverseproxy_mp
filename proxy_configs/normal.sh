DATA='{"model": "qwen2.5:1.5b", "prompt": "hi", "stream": false}'

curl -k -X POST https://www.dev.org/ollama/api/chat \
     --cookie "$COOKIE" \
     -H "X-Request-Timestamp: $(date +%s)000" \
     -d "$DATA"
echo ""

DATA='{"model": "qwen2.5:1.5b", "prompt": "hi", "stream": false}'

curl -k -X POST https://www.dev.org/ollama/api/chat \
     --cookie "$COOKIE" \
     -H "X-Request-Timestamp: 1768631128000" \
     -d "$DATA"
echo ""

DATA='{"model": "qwen2.5:1.5b", "prompt": "hi", "stream": false}'

curl -k -X POST https://www.dev.org/ollama/api/chat \
     --cookie "$COOKIE" \
     -d "$DATA"
echo ''

DATA='{"model": "qwen2.5:1.5b", "prompt": "hi", "stream": false}'

for i in {1..10}; do 
  echo "Request #$i"
  curl -k -s -w "%{http_code}\n" \
  -X POST \
  -H "Content-TYpe: application/json" \
  -d "$DATA" \
  --cookie "$COOKIE" \
  https://www.dev.org/ollama/api/chat
done
