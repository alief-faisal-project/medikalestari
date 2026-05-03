#!/bin/bash
# Test MCU API Endpoints

BASE_URL="http://localhost:3000/api/admin/mcu"

echo "🧪 Testing MCU API Endpoints"
echo "============================"
echo ""

# Test GET - Fetch all packages
echo "📖 TEST 1: GET - Fetch all packages"
curl -X GET "$BASE_URL" \
  -H "Content-Type: application/json" \
  -v
echo ""
echo ""

# Test POST - Create new package
echo "📝 TEST 2: POST - Create new package"
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Package",
    "price": "Rp 500.000",
    "image_url": "https://via.placeholder.com/300",
    "href": ""
  }' \
  -v
echo ""
echo ""

# Get an ID for update/delete test
echo "🔍 Fetching package ID for update/delete test..."
PACKAGE_ID=$(curl -s "$BASE_URL" | jq -r '.[0].id' 2>/dev/null)

if [ -z "$PACKAGE_ID" ] || [ "$PACKAGE_ID" == "null" ]; then
  echo "❌ Could not fetch package ID"
  exit 1
fi

echo "✅ Package ID: $PACKAGE_ID"
echo ""

# Test PATCH - Update package
echo "✏️  TEST 3: PATCH - Update package"
curl -X PATCH "$BASE_URL/$PACKAGE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Package",
    "price": "Rp 750.000"
  }' \
  -v
echo ""
echo ""

# Test DELETE - Delete package
echo "🗑️  TEST 4: DELETE - Delete package"
curl -X DELETE "$BASE_URL/$PACKAGE_ID" \
  -H "Content-Type: application/json" \
  -v
echo ""
echo ""

echo "✅ All tests completed!"
