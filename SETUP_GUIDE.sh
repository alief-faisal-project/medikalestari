#!/bin/bash

# ============================================================
# QUICK SETUP SCRIPT - RS Medika Lestari
# ============================================================
# Jalankan script ini untuk quick setup

echo "🚀 RS Medika Lestari - Setup Helper"
echo "===================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version

# Check npm
echo "✓ Checking npm..."
npm --version

echo ""
echo "📋 SETUP CHECKLIST:"
echo ""
echo "1️⃣  DATABASE SETUP"
echo "   - Buka Supabase Console"
echo "   - Copy isi SUPABASE_COMPLETE_SETUP.sql"
echo "   - Paste di SQL Editor"
echo "   - Klik Run"
echo ""

echo "2️⃣  STORAGE SETUP"
echo "   - Buka Storage menu di Supabase"
echo "   - Buat bucket 'doctors' (jika belum ada)"
echo "   - Buat bucket 'content' (jika belum ada)"
echo "   - Set kedua bucket menjadi PUBLIC"
echo ""

echo "3️⃣  ENV VARIABLES"
echo "   - Cek .env.local punya:"
echo "     NEXT_PUBLIC_SUPABASE_URL"
echo "     NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""

echo "4️⃣  VERIFY DATABASE"
echo "   - Buka Data Editor di Supabase"
echo "   - Check tabel: doctors ✓"
echo "   - Check tabel: schedules ✓"
echo "   - Check tabel: mading_content ✓"
echo "   - Check tabel: hero_banners ✓"
echo ""

echo "5️⃣  START DEVELOPMENT"
echo "   Run: npm run dev"
echo "   Access: http://localhost:3000"
echo ""

echo "6️⃣  ACCESS ADMIN PANEL"
echo "   - /admin/login - Login"
echo "   - /admin/dashboard - Dashboard"
echo "   - /admin/doctors - Kelola Dokter"
echo "   - /admin/mading - Kelola Mading & Event"
echo "   - /admin/hero - Kelola Hero Banner"
echo ""

echo "✅ Setup checklist selesai!"
echo ""
echo "📚 Untuk detail lengkap, baca: DOKUMENTASI_SETUP_LENGKAP.md"
