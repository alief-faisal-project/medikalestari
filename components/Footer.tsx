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
      globalThis.history.pushState(null, "", `#${id}`);
    }
  };

  const footerLinks: Array<{
    title: string;
    links: Array<{ name: string; id?: string; href?: string }>;
  }> = [
    {
      title: "Medika Lestari",
      links: [
        { name: "Beranda", id: "Beranda" },
        { name: "Dokter Kami", id: "DoctorSection" },
        { name: "Fasilitas & Layanan", id: "section-fasilitas" },
        { name: "Informasi Pasien", id: "section-informasi" },
        { name: "Tentang Kami", id: "section-tentang" },
      ],
    },
    {
      title: "Lainnya",
      links: [
        { name: "Syarat & Ketentuan", href: "#" },
        { name: "Privasi", href: "#" },
        { name: "Iklan", href: "#" },
      ],
    },
  ];

  // ICON SOSIAL (TIDAK DIUBAH)
  const socialMedia = [
    {
      name: "WhatsApp",
      href: "https://wa.me/6282246232527",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <path d="M20.52 3.48A11.82 11.82 0 0012.06 0C5.48 0 .12 5.36.12 11.94c0 2.1.55 4.16 1.6 5.98L0 24l6.25-1.64a11.9 11.9 0 005.8 1.48h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.18-3.48-8.42zM12.06 21.5c-1.8 0-3.57-.48-5.12-1.4l-.37-.22-3.7.97.99-3.6-.24-.37a9.43 9.43 0 01-1.44-5.04c0-5.22 4.25-9.47 9.47-9.47 2.53 0 4.9.98 6.68 2.77a9.39 9.39 0 012.78 6.7c0 5.22-4.25 9.47-9.47 9.47zm5.2-7.07c-.28-.14-1.65-.82-1.9-.91-.25-.09-.43-.14-.61.14-.18.28-.7.91-.86 1.1-.16.18-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.37-1.64-1.53-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.47.07-.72.35s-.95.93-.95 2.27.97 2.64 1.11 2.83c.14.18 1.91 2.92 4.63 4.1.65.28 1.15.45 1.55.58.65.21 1.24.18 1.7.11.52-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rsmedikalestari",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <path d="M7.75 2C4.13 2 2 4.13 2 7.75v8.5C2 19.87 4.13 22 7.75 22h8.5C19.87 22 22 19.87 22 16.25v-8.5C22 4.13 19.87 2 16.25 2h-8.5zm0 2h8.5C18.21 4 20 5.79 20 7.75v8.5c0 1.96-1.79 3.75-3.75 3.75h-8.5C5.79 20 4 18.21 4 16.25v-8.5C4 5.79 5.79 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/rsmedikalestari",
      target: "_blank",
      rel: "noopener noreferrer",
      icon: (
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      ),
    },
  ];

  return (
    <footer className="w-full text-white font-sans">
      {/* ===== BOTTOM ===== */}
      <div className="bg-[#0084BF] border-t border-white/10">
        <div className="max-w-[1140px] mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
            {/* LINK */}
            {footerLinks.map((section) => (
              <div key={section.title} className="md:col-span-3">
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6">
                  {section.title}
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.id ? `/#${link.id}` : link.href || "#"}
                        onClick={
                          link.id ? (e) => handleScroll(e, link.id!) : undefined
                        }
                        className="text-xs md:text-sm opacity-90 hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* SOCIAL */}
            <div className="col-span-2 md:col-span-6 md:pl-12 text-center md:text-left">
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6">
                Media Sosial
              </h3>

              <div className="flex justify-center md:justify-start gap-4">
                {socialMedia.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0084BF]">
                      {social.icon}
                    </svg>
                  </Link>
                ))}
              </div>

              <div className="mt-5 pt-2 border-t border-white/10">
                <a
                  href="mailto:marketing@rsmedikalestari.com"
                  className="font-bold hover:underline"
                >
                  marketing@rsmedikalestari.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 pt-6 border-t border-white/10 text-center">
            <p className="text-sm opacity-90">
              © 1994-{new Date().getFullYear()} RS Medika Lestari. Semua Hak Cipta Dilindungi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
