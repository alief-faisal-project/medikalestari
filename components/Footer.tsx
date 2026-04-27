"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  const WhatsAppIcon = (
    <path
      fill="#25D366"
      d="M17.472 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.296-.769.966-.942 1.165-.173.199-.347.223-.647.075-.302-.15-1.274-.467-2.426-1.495-.893-.797-1.495-1.782-1.67-2.081-.174-.3-.018-.462.13-.61.137-.133.302-.354.453-.531.151-.177.201-.299.301-.497.102-.199.051-.372-.025-.521-.075-.148-.672-1.622-.921-2.227-.242-.584-.487-.504-.673-.513-.173-.008-.371-.01-.57-.01-.198 0-.523.074-.797.372-.273.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.76-.719 2.008-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
    />
  );

  const InstagramIcon = (
    <path
      fill="url(#instaGradientFooter)"
      d="M7.75 2C4.13 2 2 4.13 2 7.75v8.5C2 19.87 4.13 22 7.75 22h8.5C19.87 22 22 19.87 22 16.25v-8.5C22 4.13 19.87 2 16.25 2h-8.5zm0 2h8.5C18.21 4 20 5.79 20 7.75v8.5c0 1.96-1.79 3.75-3.75 3.75h-8.5C5.79 20 4 18.21 4 16.25v-8.5C4 5.79 5.79 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"
    />
  );

  const NewLocationIcon = (
    <g>
      <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
      <circle cx="12" cy="8" r="1.5" fill="white" />
    </g>
  );

  const contactItems = [
    {
      label: "Call Center",
      value: "(021) 585 4858",
      href: "tel:0215854858",
      icon: (
        <path d="M6.62 10.79c1.44 2.82 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      ),
    },
    {
      label: "Customer Service",
      value: "+62 822-4623-2527",
      href: "https://wa.me/6282246232527",
      icon: (
        <path d="M17.472 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.296-.769.966-.942 1.165-.173.199-.347.223-.647.075-.302-.15-1.274-.467-2.426-1.495-.893-.797-1.495-1.782-1.67-2.081-.174-.3-.018-.462.13-.61.137-.133.302-.354.453-.531.151-.177.201-.299.301-.497.102-.199.051-.372-.025-.521-.075-.148-.672-1.622-.921-2.227-.242-.584-.487-.504-.673-.513-.173-.008-.371-.01-.57-.01-.198 0-.523.074-.797.372-.273.299-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.76-.719 2.008-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      ),
    },
    {
      label: "Email Support",
      value: "marketing@rsmedikalestari.com",
      href: "mailto:marketing@rsmedikalestari.com",
      icon: (
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      ),
    },
    {
      label: "Instagram",
      value: "@rsmedikalestari",
      href: "https://instagram.com/rsmedikalestari",
      icon: (
        <path d="M7.75 2C4.13 2 2 4.13 2 7.75v8.5C2 19.87 4.13 22 7.75 22h8.5C19.87 22 22 19.87 22 16.25v-8.5C22 4.13 19.87 2 16.25 2h-8.5zm0 2h8.5C18.21 4 20 5.79 20 7.75v8.5c0 1.96-1.79 3.75-3.75 3.75h-8.5C5.79 20 4 18.21 4 16.25v-8.5C4 5.79 5.79 4 7.75 4zm8.75 1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
      ),
    },
    {
      label: "Lokasi Kami",
      value: "Lihat Maps",
      href: "https://maps.google.com",
      icon: NewLocationIcon,
    },
  ];

  const footerLinks = [
    {
      title: "Layanan Kami",
      links: [
        { name: "Beranda", href: "/" },
        { name: "Dokter Kami", href: "/dokter" },
        { name: "Jadwal Dokter", href: "/jadwal-dokter" },
        { name: "Kamar Perawatan", href: "/services/kamar-perawatan" },
      ],
    },
    {
      title: "Lainnya",
      links: [
        { name: "Karir", href: "/careers" },
        { name: "Kontak Kami", href: "/kontak-kami" },
        { name: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
        { name: "Tentang Kami", href: "/tentang-kami" },
      ],
    },
  ];

  const socialMedia = [
    {
      name: "WhatsApp",
      href: "https://wa.me/6282246232527",
      icon: WhatsAppIcon,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/rsmedikalestari",
      icon: InstagramIcon,
    },
    {
      name: "Facebook",
      href: "https://facebook.com/rsmedikalestari",
      icon: (
        <path
          fill="#1877F2"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        />
      ),
    },
  ];

  return (
    <footer className="w-full font-sans">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="instaGradientFooter"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
      </svg>

      {/* Gunakan 'hidden' untuk mobile, 'lg:block' untuk desktop (screen > 1024px) */}
      <div className="hidden lg:block bg-white border-t border-gray-100 py-6 lg:py-12 -mt-40 md:-mt-5">
        <div className="max-w-[1900px] mx-auto px-1 md:px-6">
          {/* Menggunakan flex-row agar selalu horizontal di semua layar */}
          <div className="flex flex-row justify-between items-start w-full">
            {contactItems.map((item, idx) => (
              <div
                key={idx}
                className={`flex-1 flex flex-col items-center text-center px-0.5 md:px-4 ${
                  idx !== contactItems.length - 1
                    ? "border-r border-gray-200"
                    : ""
                }`}
              >
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex flex-col items-center w-full"
                >
                  <div className="mb-2 md:mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 md:w-9 md:h-9 fill-[#004a8c] group-hover:fill-[#005cb3] transition-all duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {item.icon}
                    </svg>
                  </div>
                  {/* Label: Sangat kecil di mobile agar tidak makan tempat */}
                  <p className="text-[6px] md:text-[11px] text-gray-400 font-semibold uppercase leading-tight mb-1">
                    {item.label}
                  </p>
                  {/* Value: Link asli tetap ada, ukuran disesuaikan agar muat sebaris */}
                  <span className="text-[7px] md:text-[15px] font-bold text-[#004a8c] group-hover:text-[#005cb3] transition-all break-all md:break-normal leading-none">
                    {item.value}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Main Footer ===== */}
      <div className="relative bg-[#005cb3] text-white overflow-hidden">
        <div
          className="absolute top-0 right-0 h-full w-[45%] bg-gradient-to-l from-[#004585] to-transparent opacity-40 hidden md:block"
          style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        />

        <div className="relative max-w-[1140px] mx-auto px-6 py-12 md:py-16 z-10">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
            {footerLinks.map((section) => (
              <div key={section.title} className="md:col-span-3">
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href || "#"}
                        className="text-xs md:text-sm opacity-80 hover:opacity-100 hover:underline transition-opacity"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 md:col-span-6 md:pl-12 text-center md:text-left">
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 uppercase tracking-wider">
                Media Sosial
              </h3>
              <div className="flex justify-center md:justify-start gap-4">
                {socialMedia.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                      {social.icon}
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t border-white/10">
                <p className="font-bold text-sm md:text-base">
                  marketing@rsmedikalestari.com
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 mb-20 md:mb-1 d:mt-16 pt-6 border-t border-white/10 text-left">
            <p className="text-xs md:text-sm opacity-70">
              © 1994-{new Date().getFullYear()} RS Medika Lestari. Semua Hak
              Cipta Dilindungi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
