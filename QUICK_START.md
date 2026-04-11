# 🏥 QUICK START - RS Medika Lestari

## ⚡ 5 Langkah Instalasi

### 1️⃣ Install npm packages

```bash
npm install
```

### 2️⃣ Create .env.local

Buat file `.env.local` di root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Dapat dari:** Supabase Dashboard > Settings > API

### 3️⃣ Setup Database

1. Go to https://supabase.com & create project
2. Copy `SQL_MIGRATIONS.sql` content
3. Paste ke Supabase SQL Editor
4. Run semua queries

### 4️⃣ Create Admin User

Di Supabase > Authentication > Users:

- **Email:** admin@medika.com
- **Password:** admin123456

### 5️⃣ Run Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🔑 Login Admin

- URL: `http://localhost:3000/admin/login`
- Email: `admin@medika.com`
- Password: `admin123456`

---

## 📍 URLs

| Page                | URL                |
| ------------------- | ------------------ |
| Homepage            | `/`                |
| Doctor List         | `/dokter`          |
| Admin Login         | `/admin/login`     |
| Admin Dashboard     | `/admin/dashboard` |
| Doctor Management   | `/admin/doctors`   |
| Schedule Management | `/admin/schedules` |

---

## ✅ Validation Checklist

- [ ] npm install selesai tanpa error
- [ ] .env.local dibuat dengan credentials
- [ ] Supabase project created
- [ ] SQL migrations dijalankan
- [ ] Admin user dibuat di Supabase
- [ ] npm run dev berjalan
- [ ] Homepage accessible di localhost:3000
- [ ] Bisa login ke admin panel
- [ ] Doctor page loading doctors dari database

---

## 🆘 Help

**Forgot Supabase credentials?**

- Go to: https://supabase.com > Project > Settings > API

**Module not found error?**

```bash
npm install @supabase/supabase-js
```

**Port 3000 already in use?**

```bash
npm run dev -- -p 3001
```

---

**Need detailed setup?** → Read `README.md`
**Want to test everything?** → Check `TESTING_GUIDE.md`
