curl "https://api.groq.com/openai/v1/chat/completions" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${GROQ_API_KEY}" \
  -d '{
         "messages": [
           {
             "role": "assistant",
             "content": ""
           }
         ],
         "model": "mixtral-8x7b-32768",
         "temperature": 1,
         "max_tokens": 1024,
         "top_p": 1,
         "stream": true,
         "stop": null
       }'
  