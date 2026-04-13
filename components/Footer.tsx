"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const TOP_HEIGHT = 120;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const footerLinks = [
    {
      title: "Medika Lestari",
      links: [
        { name: "Dokter Kami", id: "DoctorSection" },
        { name: "Tentang Kami", id: "section-tentang" },
        { name: "Fasilitas & Layanan", id: "section-fasilitas" },
      ],
    },
    {
      title: "Lainnya",
      links: [
        { name: "Syarat & Ketentuan", href: "#" },
        { name: "Privasi", href: "#" },
        { name: "Iklan", href: "#" },
        { name: "Gabung di Tim Dokter", href: "#" },
        { name: "Daftarkan Rumah Sakit Anda", href: "#" },
      ],
    },
  ];

  // ✅ ICON SOSIAL (FIX)
  const socialMedia = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
    },
  ];

  return (
    <footer className="w-full text-white font-sans">
      {/* ===== TOP FOOTER (GRADIENT FIX) ===== */}
      <div
        className="relative w-full flex items-center"
        style={{
          height: TOP_HEIGHT,
          background: "linear-gradient(90deg, #0084BF, #005075)",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between">
          {/* HP */}
          <div className="relative w-52 md:w-72 h-[260px] md:h-[340px] flex justify-center md:justify-start">
            <div className="absolute bottom-27 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0">
              <Image
                src="/hp.png"
                alt="App"
                width={300}
                height={400}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left md:ml-16 mt-6 md:mt-0">
            <h2 className="text-2xl md:text-[20px] font-bold leading-tight">
              Chat lebih dari 1.000 dokter di Aplikasi Medika Lestari!
            </h2>
            <p className="text-lg md:text-xl mt-2 opacity-90">
              Respons Cepat, Jawaban Akurat!
            </p>
          </div>

          {/* STORE */}
          <div className="flex flex-col gap-2 mt-8 md:mt-0 items-center md:items-end">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              width={150}
              height={55}
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
              width={150}
              height={55}
              className="bg-black rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* ===== BOTTOM FOOTER ===== */}
      <div className="bg-[#137CA3] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {footerLinks.map((section) => (
              <div key={section.title} className="md:col-span-3">
                <h3 className="text-lg font-bold mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.id ? `/#${link.id}` : link.href || "#"}
                        onClick={
                          link.id ? (e) => handleScroll(e, link.id!) : undefined
                        }
                        className="text-sm opacity-90 hover:underline hover:opacity-100"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* MEDIA SOSIAL FIX */}
            <div className="md:col-span-6 md:pl-12">
              <h3 className="text-lg font-bold mb-6">Media Sosial</h3>

              <div className="flex gap-4">
                {socialMedia.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center group hover:bg-blue-100 transition-all"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-[#0084BF] group-hover:scale-110 transition-transform"
                    >
                      {social.icon}
                    </svg>
                  </Link>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-xs opacity-70 mb-2">
                  Bagian dari Medika Lestari
                </p>
                <p className="font-bold">medikalestari.com</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-white/10 text-center">
            <p className="text-sm opacity-90">
              Hak Cipta © 2026 RS Medika Lestari
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
