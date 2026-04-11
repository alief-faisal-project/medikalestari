# 🔧 SUPABASE SETUP GUIDE

## ⚠️ Important: Network Error Fix

Jika Anda melihat error: `TypeError: NetworkError when attempting to fetch resource`

### Root Cause

- Supabase URL atau API Key belum valid
- Database belum disetup dengan migrations
- Project Supabase belum aktif

### 🔴 Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click **"New Project"**
3. Fill form:
   - **Organization**: Create or select existing
   - **Project Name**: `rs-medika-lestari` (or any name)
   - **Database Password**: Save this securely!
   - **Region**: Closest to your location
4. Click **"Create new project"**
5. Wait 2-3 minutes for project to initialize

### 🟢 Step 2: Get Your Credentials

1. Click **Settings** (gear icon) in left sidebar
2. Click **API** under Settings
3. Copy these values:
   - **Project URL** → Paste in `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → Paste in `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Example:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_anon_key...
```

### 🟢 Step 3: Run SQL Migrations

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy entire content from `SQL_MIGRATIONS.sql` file
4. Paste into SQL Editor
5. Click **"Run"**
6. Wait for success message

This will create:

- ✅ `doctors` table
- ✅ `schedules` table
- ✅ `admin_users` table
- ✅ Storage bucket for images
- ✅ Row Level Security policies

### 🟢 Step 4: Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Invite"**
3. Fill form:
   - **Email**: `admin@medika.com` (or your email)
   - **Password**: `admin123456` (change this later!)
4. Click **"Send Invite"** or **"Create User"**

### 🟢 Step 5: Test Connection

1. Save `.env.local` file
2. Restart dev server: `npm run dev`
3. Go to `http://localhost:3000/dokter`
4. Doctor list should load from database

If still seeing error, check:

- [ ] URL is correct format: `https://xxxxx.supabase.co`
- [ ] Anon Key is pasted completely
- [ ] SQL migrations have run successfully
- [ ] Browser console for specific errors

---

## 📝 .env.local Template

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Database tables exist in Supabase
- [ ] Storage bucket `doctors` exists
- [ ] Admin user created
- [ ] `.env.local` has correct values
- [ ] Server restarted after env changes
- [ ] Doctor page loads without errors
- [ ] Can login to admin panel
- [ ] Can add/edit/delete doctors

---

## 🆘 Troubleshooting

### Error: "No valid Supabase URL"

- Solution: Make sure URL starts with `https://` and ends with `.supabase.co`

### Error: "Invalid authentication token"

- Solution: Regenerate Anon Key in Supabase Settings > API

### Error: "PGSQL relation 'doctors' does not exist"

- Solution: Run SQL migrations again, check for errors

### Doctor page loads but no doctors shown

- Solution: Add doctors via admin panel first, or manually insert test data

### Can't login to admin

- Solution: Make sure admin user was created in Supabase Auth

---

## 🎯 Command Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

---

**Once setup complete, your system will be fully functional!** 🚀
