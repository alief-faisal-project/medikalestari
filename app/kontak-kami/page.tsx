"use client";

import React, { useState } from "react"; // Menambahkan useState
import { Phone, Mail, MapPin, Clock, Send, ChevronRight } from "lucide-react";
import Link from "next/link";

const KontakKami = () => {
  // State untuk menangkap input form
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      details: "(021) 5854858",
      subtitle: "Layanan 24 Jam",
    },
    {
      icon: Mail,
      title: "Email",
      details: "marketing@rsmedikalestari",
      subtitle: "Balasan dalam 24 jam",
    },
    {
      icon: MapPin,
      title: "Lokasi",
      details: "Jl. HOS Cokroaminoto, Blok C1 No.1-2",
      subtitle: "Ciledug Kota Tanggerang 15157",
    },
    {
      icon: Clock,
      title: "Waktu Kerja",
      details: "Setiap Hari",
      subtitle: "Buka 24 Jam",
    },
  ];

  const departments = [
    { name: "IGD (Gawat Darurat)", phone: "(021) 1234-5678" },
    { name: "Poliklinik Umum", phone: "(021) 1234-5679" },
    { name: "Rawat Inap", phone: "(021) 1234-5680" },
    { name: "Laboratorium", phone: "(021) 1234-5681" },
    { name: "Radiologi", phone: "(021) 1234-5682" },
    { name: "Farmasi", phone: "(021) 1234-5683" },
  ];

  // Fungsi untuk menangani pengiriman form via mailto
  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:marketing@rsmedikalestari?subject=${encodeURIComponent(
      formData.subjek,
    )}&body=${encodeURIComponent(
      `Nama: ${formData.nama}\nEmail: ${formData.email}\n\nPesan:\n${formData.pesan}`,
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Simple Breadcrumb & Title */}
      <section className="max-w-[1100px] mx-auto px-6 pt-16 pb-12">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#0084BF]">
            Beranda
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-medium">Kontak Kami</span>
        </nav>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Kontak & Informasi
        </h1>
        <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
          Silakan hubungi kami melalui saluran di bawah ini atau kunjungi
          langsung fasilitas kesehatan kami untuk mendapatkan pelayanan medis
          terbaik.
        </p>
      </section>

      <div className="max-w-[1100px] mx-auto px-6 pb-24">
        {/* Main 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 mb-20">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white p-8 hover:bg-slate-50 transition-colors"
            >
              <info.icon size={20} className="text-[#0084BF] mb-6" />
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                {info.title}
              </h3>
              <p className="text-base font-semibold text-slate-900 mb-1">
                {info.details}
              </p>
              <p className="text-sm text-slate-500">{info.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold mb-8">Kirim Pesan</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">
                    Nama Lengkap
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData({ ...formData, nama: e.target.value })
                    }
                    className="w-full bg-white border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#0084BF] transition-colors rounded-sm"
                    placeholder="Contoh: Budi Santoso"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500">
                    Alamat Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#0084BF] transition-colors rounded-sm"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">
                  Subjek
                </label>
                <input
                  required
                  type="text"
                  value={formData.subjek}
                  onChange={(e) =>
                    setFormData({ ...formData, subjek: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#0084BF] transition-colors rounded-sm"
                  placeholder="Keluhan medis, pendaftaran, dll."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">
                  Pesan
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.pesan}
                  onChange={(e) =>
                    setFormData({ ...formData, pesan: e.target.value })
                  }
                  className="w-full bg-white border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#0084BF] transition-colors rounded-sm resize-none"
                  placeholder="Tuliskan pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#0084BF] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#0084BF]/90 transition-all rounded-sm"
              >
                Kirim Sekarang
                <Send size={14} />
              </button>
            </form>
          </div>

          {/* Right Column: Departments */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 p-8 rounded-sm">
              <h2 className="text-xl font-bold mb-6 tracking-tight">
                Nomor Departemen
              </h2>
              <div className="divide-y divide-slate-200">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="py-4 flex justify-between items-center group"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {dept.name}
                    </span>
                    <a
                      href={`tel:${dept.phone.replace(/\D/g, "")}`}
                      className="text-sm font-bold text-[#0084BF] group-hover:underline cursor-pointer"
                    >
                      {dept.phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-xs leading-relaxed text-slate-500 italic">
                  * Untuk keadaan darurat, silakan langsung menghubungi nomor
                  IGD yang tertera di atas untuk respon tercepat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default KontakKami;
