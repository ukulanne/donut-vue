curl https://dev.methodfi.com/entities \
  -X POST \
  -H "Authorization: Bearer $METHOD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "c_corporation",
    "corporation": {
      "name": "Dunkin Donuts LLC",
      "dba": "Dunkin Donuts",
      "ein": "32120240",
      "owners": []
    },
    "address": {
      "line1": "999 Hayes Lights",
      "line2": null,
      "city": "Kerlukemoth",
      "state": "TX",
      "zip": "78681"
    }
  }'
echo -e ""
