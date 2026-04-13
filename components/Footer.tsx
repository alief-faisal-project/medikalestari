"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  const footerLinks = [
    {
      title: "Layanan Unggulan",
      links: [
        "Orthopedic Center",
        "Spine Center",
        "Heart Centre",
        "Vascular Center",
        "Stroke Center",
      ],
    },
    {
      title: "Tentang Kami",
      links: [
        "Visi & Misi",
        "Akreditasi",
        "Karir",
        "Vendor Governance",
        "Kebijakan Antisuap",
      ],
    },
    {
      title: "Informasi",
      links: [
        "Fasilitas Kamar",
        "Medical Check Up",
        "Promo & Paket",
        "Hubungi Kami",
      ],
    },
  ];

  const SocialIcons = [
    {
      name: "Facebook",
      path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
    },
    {
      name: "Instagram",
      path: "M12.315 2c2.43 0 2.784.012 3.855.06 1.061.048 1.791.222 2.427.471.656.254 1.142.559 1.629 1.046.487.487.792.973 1.046 1.629.249.636.423 1.366.471 2.427.048 1.071.06 1.425.06 3.855 0 2.429-.012 2.783-.06 3.854-.048 1.062-.222 1.791-.471 2.428-.254.656-.559 1.142-1.046 1.629-.487.487-.973.792-1.629 1.046-.636.249-1.366.423-2.427.471-1.071.048-1.425.06-3.855.06-2.43 0-2.784-.012-3.854-.06-1.062-.048-1.791-.222-2.428-.471-.656-.254-1.142-.559-1.629-1.046-.487-.487-.792-.973-1.046-1.629-.249-.636-.423-1.366-.471-2.427-.048-1.071-.06-1.425-.06-3.855 0-2.43.012-2.784.06-3.854.048-1.062.222-1.791.471-2.428.254-.656.559-1.142 1.046-1.629.487-.487.973-.792 1.629-1.046.636-.249 1.366-.423 2.427-.471 1.07-.048 1.424-.06 3.854-.06zm0 2.25c-2.408 0-2.711.011-3.66.054-.882.04-1.362.188-1.68.312-.421.163-.721.358-1.037.674-.316.316-.511.616-.674 1.037-.124.318-.272.798-.312 1.68-.043.949-.054 1.252-.054 3.66s.011 2.711.054 3.66c.04.882.188 1.362.312 1.68.163.421.358.721.674 1.037.316.316.616.511 1.037.674.318.124.798.272 1.68.312.949.043 1.252.054 3.66.054s2.711-.011 3.66-.054c.882-.04 1.362-.188 1.68-.312.421-.163.721-.358 1.037-.674.316-.316.511-.616.674-1.037.124-.318.272-.798.312-1.68.043-.949.054-1.252.054-3.66s-.011-2.711-.054-3.66c-.04-.882-.188-1.362-.312-1.68-.163-.421-.358-.721-.674-1.037-.316-.316-.616-.511-1.037-.674-.318-.124-.798-.272-1.68-.312-.949-.043-1.252-.054-3.66-.054zM12 7.125A4.875 4.875 0 1012 16.875 4.875 4.875 0 0012 7.125zM12 14.625a2.625 2.625 0 110-5.25 2.625 2.625 0 010 5.25zm4.875-6.75a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z",
    },
    {
      name: "YouTube",
      path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ];

  return (
    <footer className="bg-white text-slate-900 border-t border-slate-100 relative pt-16 overflow-hidden">
      {/* Moving Line Shadow Only (No Color Line) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Brand Identity Section */}
          <div className="md:col-span-4 pr-0 md:pr-20 pb-12 border-b md:border-b-0 border-slate-100">
            <div className="space-y-8">
              <Image
                src="/logo.png"
                alt="RS Medika Lestari"
                width={190}
                height={55}
                className="h-11 w-auto object-contain"
              />
              <p className="text-[15px] leading-relaxed text-slate-500 font-medium max-w-sm">
                Rumah Sakit Medika Lestari adalah pusat layanan kesehatan terkemuka yang berada dikota tangerang...........
              </p>

              {/* Social Media - Bigger & Borderless */}
              <div className="flex gap-8">
                {SocialIcons.map((icon) => (
                  <Link
                    key={icon.name}
                    href="#"
                    className="text-slate-400 hover:text-[#0084BF] transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                      <path d={icon.path} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 md:pl-20 pt-12 md:pt-0">
            {footerLinks.map((section) => (
              <div
                key={section.title}
                className="md:border-l border-slate-100 md:pl-10"
              >
                <h3 className="text-[14px] font-bold uppercase text-slate-900 mb-8 pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="group flex items-center text-[14px] text-slate-500 hover:text-[#0084BF] transition-all font-medium"
                      >
                        <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 ease-out flex items-center">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="mt-20 border-t border-slate-100 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[12px] font-bold text-slate-400 ">
              © 2026 RS MEDIKA LESTARI
            </div>

            <div className="flex gap-10">
              {["Privacy", "Terms", "Compliance"].map((text) => (
                <Link
                  key={text}
                  href="#"
                  className="text-[11px] font-bold text-slate-400 uppercase hover:text-[#0084BF] transition-all relative group"
                >
                  {text}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0084BF] transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
