# Setup & Testing Guide - RS Medika Lestari

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# atau
pnpm install
```

### 2. Create Supabase Project

- Go to https://supabase.com
- Sign up dan create new project
- Wait untuk project siap

### 3. Setup Environment Variables

Buat file `.env.local` di root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Ambil nilai dari Supabase Dashboard > Settings > API

### 4. Run SQL Migrations

Buka SQL Editor di Supabase dashboard dan copy-paste semua isi dari `SQL_MIGRATIONS.sql`

### 5. Create Admin User

Di Supabase Dashboard > Authentication > Users:

- Email: `admin@medika.com`
- Password: `admin123456`

### 6. Run Development Server

```bash
npm run dev
```

Akses di `http://localhost:3000`

---

## 📋 Testing Checklist

### Homepage

- [ ] Hero section carousel berfungsi (auto-play, manual nav)
- [ ] Navbar sticky dan responsive
- [ ] Mobile menu toggle bekerja
- [ ] Logo clickable ke homepage
- [ ] Top bar links (Kontak, Karir) clickable

### Doctor Page (`/dokter`)

- [ ] Doctor list loaded dari database
- [ ] Search by name bekerja real-time
- [ ] Filter by specialty bekerja
- [ ] Reset filter button bekerja
- [ ] Doctor cards menampilkan:
  - Photo
  - Name
  - Specialty
  - Bio
  - Experience
  - Phone (clickable tel:)
  - Email (clickable mailto:)
- [ ] Appointment & Schedule buttons visible
- [ ] Loading spinner tampil saat fetch
- [ ] Empty state tampil jika tidak ada dokter

### Search Bar (`navbar` dropdown)

- [ ] Dropdown opens saat click "Cari Dokter Spesialis"
- [ ] Search input accepts text
- [ ] Specialty quick links clickable
- [ ] Submit button works
- [ ] Redirect ke `/dokter?search=...`

### Navbar Active States

- [ ] Home button active saat di `/`
- [ ] Doctor button active saat di `/dokter`
- [ ] Dropdown menus hover effect
- [ ] Language dropdown functional
- [ ] Mobile menu closes saat navigate

### Admin Panel

#### Login (`/admin/login`)

- [ ] Username/password form works
- [ ] Error message tampil untuk wrong credentials
- [ ] Success login redirect ke dashboard
- [ ] Password field mask with eye toggle

#### Dashboard (`/admin/dashboard`)

- [ ] Protected route (redirect ke login jika belum login)
- [ ] Statistik cards display:
  - Total doctors count
  - Total schedules count
- [ ] Navigation buttons work
- [ ] Logout button works
- [ ] Admin navbar shows user email

#### Doctor Management (`/admin/doctors`)

- [ ] Protected route
- [ ] Doctor list loaded dari database
- [ ] Table columns: Photo, Name, Specialty, Experience, Email, Actions
- [ ] Add Doctor button opens modal
- [ ] Edit button opens modal dengan data pre-filled
- [ ] Delete button shows confirmation dialog
- [ ] Modal form fields:
  - Photo upload dengan preview
  - Name input
  - Specialty input
  - Experience years input
  - Bio textarea
  - Email input
  - Phone input
- [ ] Submit button saves ke database
- [ ] List refreshes setelah CRUD operations
- [ ] Photo upload works (check Supabase storage)

#### Schedule Management (`/admin/schedules`)

- [ ] Protected route
- [ ] Schedule list loaded dari database
- [ ] Table columns: Doctor, Day, Start Time, End Time, Status, Actions
- [ ] Add Schedule button opens modal
- [ ] Edit button opens modal dengan data pre-filled
- [ ] Delete button shows confirmation dialog
- [ ] Modal form fields:
  - Doctor select dropdown
  - Day of week select
  - Start time input
  - End time input
  - Available checkbox
- [ ] Submit button saves ke database
- [ ] List refreshes setelah CRUD operations

---

## 🔧 Database Testing

### Check Database Tables

Di Supabase SQL Editor:

```sql
-- Check doctors table
SELECT * FROM doctors;

-- Check schedules table
SELECT * FROM schedules;

-- Check admin users table
SELECT * FROM admin_users;
```

### Test Data Insertion

```sql
-- Insert test doctor
INSERT INTO doctors (name, specialty, image_url, experience_years, bio, phone, email)
VALUES (
  'dr. Test Doctor',
  'Kardiologi',
  'https://images.unsplash.com/photo-1612349317150-e539c59dc62a?w=500&h=500&fit=crop',
  10,
  'Dokter berpengalaman',
  '081234567890',
  'test@example.com'
);

-- Insert test schedule
INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time, is_available)
SELECT id, 'Senin', '09:00', '17:00', true FROM doctors LIMIT 1;
```

---

## 🖼️ Storage Testing

### Upload Image via Admin Panel

1. Go to `/admin/doctors`
2. Click "Tambah Dokter"
3. Upload image di modal
4. Check Supabase Storage bucket `doctors`

### Manual Upload via SQL

```sql
-- Check storage files
SELECT * FROM storage.objects WHERE bucket_id = 'doctors';
```

---

## 🔐 Security Testing

### Test RLS Policies

```sql
-- Public read (should work)
SELECT * FROM doctors;

-- Authenticated insert (should work for logged-in users)
INSERT INTO doctors (...) VALUES (...);

-- Delete without permission (should fail)
DELETE FROM admin_users;
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@supabase/supabase-js'"

**Solution:**

```bash
npm install @supabase/supabase-js
```

### Issue: "Missing Supabase environment variables"

**Solution:**

- Check `.env.local` exists
- Verify variables are correct
- Restart dev server: `npm run dev`

### Issue: "Authentication failed on login"

**Solution:**

- Ensure admin user created in Supabase
- Double-check password
- Check email format

### Issue: "Cannot upload doctor image"

**Solution:**

- Verify storage bucket exists
- Check bucket name is `doctors`
- Verify RLS policies are correct
- Check file size < 5MB

### Issue: "Doctor list not loading"

**Solution:**

- Check Supabase connection in `.env.local`
- Verify doctors table exists and has data
- Check browser console for errors
- Ensure internet connection

### Issue: "Search not filtering results"

**Solution:**

- Check doctor names exist in database
- Verify search input is not empty
- Clear browser cache

---

## 📊 Performance Testing

### Lighthouse Audit

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for each page:
   - Homepage
   - Doctor page
   - Admin pages

### Load Testing

```bash
# Use web stress testing tools
# Recommended: Apache JMeter, k6, or similar
```

---

## 📱 Responsive Testing

### Test on Different Devices

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

### Use DevTools Device Emulation

1. Press F12
2. Click device toggle icon
3. Select device

---

## 🌐 Browser Testing

Test on multiple browsers:

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 📝 API Testing

### Test Doctor API

```bash
# Fetch all doctors
curl "http://localhost:3000/api/doctors"

# Fetch with filter
curl "http://localhost:3000/api/doctors?specialty=Kardiologi"

# Fetch with search
curl "http://localhost:3000/api/doctors?search=John"
```

---

## 🚢 Deployment Checklist

Before deploying to production:

- [ ] Environment variables set correctly
- [ ] Database migrations run successfully
- [ ] Admin user created
- [ ] Storage bucket configured
- [ ] RLS policies enabled
- [ ] All tests passed
- [ ] No console errors
- [ ] Images optimized
- [ ] Meta tags updated
- [ ] SSL certificate valid

---

## 📞 Support & Debugging

### Enable Debug Logging

In components, add:

```typescript
console.log("Debug info:", data);
```

### Check Supabase Logs

1. Go to Supabase Dashboard
2. Click "Logs" tab
3. View API calls and errors

### Browser DevTools

- Network tab: Check API responses
- Console: Check JavaScript errors
- Application: Check localStorage/cookies

---

## 🎯 Success Criteria

All of the following should work:

✅ Homepage displays correctly
✅ Doctor page loads and displays doctors
✅ Search and filter work
✅ Admin login works
✅ Doctor CRUD operations work
✅ Schedule CRUD operations work
✅ Image upload works
✅ Navbar active states correct
✅ Mobile responsive
✅ No console errors
✅ Database syncs correctly

---

**Version:** 1.0.0
**Last Updated:** April 2026
**Status:** Ready for testing
