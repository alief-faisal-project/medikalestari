"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

// Ikon Industrial SVG (Minimalis & Hitam)
const Icons = {
  Telepon: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Email: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Lokasi: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Jam: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Kirim: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  Panah: () => (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

const KontakKami = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const contactInfo = [
    {
      icon: Icons.Telepon,
      title: "Telepon",
      details: "(021) 585 4858",
      subtitle: "Layanan Umum",
    },
    {
      icon: Icons.Email,
      title: "Email",
      details: "marketing@rsmedikalestari.com",
      subtitle: "Korespondensi",
    },
    {
      icon: Icons.Lokasi,
      title: "Lokasi",
      details: "Jl. HOS Cokroaminoto No.1",
      subtitle: "Ciledug, Tangerang",
    },
    {
      icon: Icons.Jam,
      title: "Jam Kerja",
      details: "Buka 24 Jam",
      subtitle: "Senin - Minggu",
    },
  ];

  const departments = [
    { name: "IGD (Gawat Darurat)", phone: "(021) 584 4521" },
    { name: "Pendaftaran Jalan", phone: "(021) 585 4858" },
    { name: "Radiologi", phone: "Ext. 112" },
    { name: "Laboratorium", phone: "Ext. 105" },
    { name: "Farmasi", phone: "Ext. 201" },
    { name: "Informasi", phone: "021-585-4858" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailtoUrl = `mailto:marketing@rsmedikalestari.com?subject=${encodeURIComponent(formData.subjek)}&body=${encodeURIComponent(`Nama: ${formData.nama}\nEmail: ${formData.email}\n\nPesan:\n${formData.pesan}`)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-12">
        <nav className="flex items-center gap-2 text-xs font-semibold mb-6">
          <Link
            href="/"
            className="text-black hover:opacity-60 transition-opacity"
          >
            Beranda
          </Link>
          <Icons.Panah />
          <span>Kontak Kami</span>
        </nav>
        <h1 className="text-4xl font-bold mb-4">Kontak & Informasi</h1>
        <p className="text-black leading-relaxed max-w-2xl opacity-80">
          Silakan hubungi pusat layanan Rumah Sakit Medika Lestari untuk bantuan
          medis, jadwal dokter, atau informasi fasilitas kesehatan lainnya.
        </p>
      </section>

      {/* Grid Informasi Utama */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black border border-black">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white p-8 hover:bg-zinc-50 transition-colors"
            >
              <div className="mb-6">
                <info.icon />
              </div>
              <h3 className="text-[11px] font-bold uppercase mb-2 italic">
                {info.title}
              </h3>
              <p className="text-sm font-bold mb-1">{info.details}</p>
              <p className="text-xs opacity-70">{info.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-20">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold mb-8 underline underline-offset-8 decoration-2">
              Kirim Pesan
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Nama Lengkap
                  </label>
                  <input
                    required
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full bg-white border border-black p-3 text-sm focus:bg-zinc-50 outline-none"
                    placeholder="Nama anda"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-black p-3 text-sm focus:bg-zinc-50 outline-none"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase">
                  Subjek
                </label>
                <input
                  required
                  type="text"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleChange}
                  className="w-full bg-white border border-black p-3 text-sm focus:bg-zinc-50 outline-none"
                  placeholder="Tujuan pesan"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase">Pesan</label>
                <textarea
                  required
                  rows={5}
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  className="w-full bg-white border border-black p-3 text-sm focus:bg-zinc-50 outline-none resize-none"
                  placeholder="Tulis pesan anda..."
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 text-xs font-bold uppercase hover:bg-zinc-800 transition-all flex items-center gap-3"
              >
                Kirim Sekarang <Icons.Kirim />
              </button>
            </form>
          </div>

          {/* Departemen */}
          <div className="lg:col-span-5">
            <div className="border border-black p-8">
              <h2 className="text-lg font-bold mb-6 uppercase tracking-tight">
                Daftar Ekstensi
              </h2>
              <div className="divide-y divide-black/10">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 group"
                  >
                    <span className="text-xs font-medium group-hover:font-bold transition-all">
                      {dept.name}
                    </span>
                    <a
                      href={`tel:${dept.phone.replace(/\D/g, "")}`}
                      className="text-xs font-bold hover:underline"
                    >
                      {dept.phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-black">
                <p className="text-[10px] leading-relaxed font-bold uppercase italic">
                  * Untuk keadaan darurat, segera hubungi nomor IGD (021) 584
                  4521.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default KontakKami;
