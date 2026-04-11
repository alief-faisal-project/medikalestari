#!/bin/bash

# RS Medika Lestari - Setup Script
# This script helps you setup the complete doctor management system

echo "🏥 RS Medika Lestari - Doctor Management System Setup"
echo "=================================================="
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install
# atau pnpm install

echo ""
echo "✅ Dependencies installed!"
echo ""

# Step 2: Create .env.local
echo "⚙️  Step 2: Creating .env.local file..."

cat > .env.local << 'EOF'
# Supabase Configuration
# Get these values from: https://supabase.com > Project > Settings > API

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF

echo "✅ .env.local created!"
echo ""
echo "📝 Please update .env.local with your Supabase credentials:"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""

# Step 3: Show next steps
echo "🚀 Next Steps:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Run SQL migrations from SQL_MIGRATIONS.sql in Supabase SQL Editor"
echo "3. Create admin user in Supabase Authentication:"
echo "   - Email: admin@medika.com"
echo "   - Password: admin123456"
echo "4. Update .env.local with Supabase credentials"
echo "5. Run: npm run dev"
echo ""

echo "📚 Helpful Resources:"
echo "- README.md - Full documentation"
echo "- TESTING_GUIDE.md - Testing checklist"
echo "- SQL_MIGRATIONS.sql - Database setup"
echo ""

echo "✨ Setup complete! Read README.md for detailed instructions."
