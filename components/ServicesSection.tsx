"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ServicesSection = () => {
  const router = useRouter();

  const scrollToSection = (id: string | null) => {
    if (!id) return;
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 150;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  };

  const infoData = [
    { id: 1, img: "/icons/informasi/telephone.png", title: "Customer service" },
    { id: 2, img: "/icons/informasi/email.png", title: "Email" },
    { id: 3, img: "/icons/informasi/map.png", title: "Lokasi" },
  ];

  const serviceData = [
    {
      id: 1,
      img: "/icons/pelayanan/hospital.png",
      title: "Kamar Perawatan",
      targetId: null,
      href: "/services/kamar-perawatan",
    },
    {
      id: 2,
      img: "/icons/pelayanan/doctor.png",
      title: "Dokter Kami",
      targetId: "section-dokter",
      href: null,
    },
    {
      id: 3,
      img: "/icons/pelayanan/calendar.png",
      title: "Jadwal Dokter",
      targetId: null,
      href: "/jadwal-dokter",
    },
    {
      id: 4,
      img: "/icons/pelayanan/clock.png",
      title: "Jam Operasional",
      targetId: null,
      href: null,
    },
  ];

  const handleServiceClick = (item: {
    id: number;
    img: string;
    title: string;
    targetId: string | null;
    href?: string | null;
  }) => {
    if (item.href) {
      router.push(item.href);
      return;
    }

    if (!item.targetId) return;

    const el = document.getElementById(item.targetId);
    if (el) {
      scrollToSection(item.targetId);
      return;
    }

    router.push(`/dokter#${item.targetId}`);
  };

  const handleInfoClick = (title: string) => {
    const checkTitle = title.toLowerCase();

    if (checkTitle === "lokasi") {
      window.open("https://maps.app.goo.gl/EP5qTWzim9XmoUbe6", "_blank");
    }

    if (checkTitle === "email") {
      const emailRecipient = "marketing@rsmedikalestari.com";

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailRecipient}`;
      const newWindow = window.open(gmailUrl, "_blank");

      // Fallback jika window.open diblokir atau gagal
      if (!newWindow || newWindow.closed || newWindow.closed === undefined) {
        const link = document.createElement("a");
        link.href = `mailto:${emailRecipient}`;
        link.click();
      }
    }

    if (checkTitle === "customer service") {
      window.open("https://wa.me/6282246232527", "_blank");
    }
  };

  return (
    <section className="w-full bg-slate-50 font-sans text-[#005cb3] relative py-20 overflow-hidden">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Garis Grid Halus */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#005cb3 0.5px, transparent 0.5px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Garis Diagonal Dekoratif */}
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="10%"
            x2="100%"
            y2="40%"
            stroke="#005cb3"
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
          <line
            x1="0"
            y1="60%"
            x2="100%"
            y2="90%"
            stroke="#005cb3"
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
          <line
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
            stroke="#005cb3"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
        </svg>

        {/* Lingkaran blur untuk kedalaman */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10">
        {/* PELAYANAN SECTION */}
        <div className="max-w-290 mx-auto px-4 md:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16 lg:mb-10 justify-center md:justify-end text-center md:text-right"
          >
            <div className="hidden md:block flex-1 h-0.5 bg-linear-to-l from-[#005cb3]/30 to-transparent" />
            <h2 className="text-4xl font-light uppercase pb-2 tracking-widest">
              Pelayanan
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceClick(item)}
                className="aspect-square flex flex-col items-center justify-center text-center p-6 bg-white/80 backdrop-blur-sm border border-white cursor-pointer shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:bg-white transition-all duration-300"
              >
                <div className="relative w-16 h-16 mb-5">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm md:text-base font-black uppercase tracking-tighter leading-tight">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INFORMASI SECTION */}
        <div className="max-w-290 mx-auto px-4 md:px-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16 lg:mb-10 justify-center md:justify-start text-center md:text-left"
          >
            <h2 className="text-4xl font-light uppercase pb-2 tracking-widest">
              Informasi
            </h2>
            <div className="hidden md:block flex-1 h-0.5 bg-linear-to-r from-[#005cb3]/30 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -8 }}
                onClick={() => handleInfoClick(item.title)}
                className="flex flex-col items-center justify-center p-10 bg-white/80 backdrop-blur-sm border border-white cursor-pointer transition-all duration-300 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:bg-white"
              >
                <div className="relative w-16 h-16 mb-6">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tighter">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
