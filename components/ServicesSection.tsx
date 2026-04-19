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
      title: "Fasilitas & Layanan",
      targetId: null,
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
    // Menggunakan toLowerCase agar tidak error karena perbedaan huruf besar/kecil
    const checkTitle = title.toLowerCase();

    if (checkTitle === "lokasi") {
      window.open("https://maps.app.goo.gl/EP5qTWzim9XmoUbe6", "_blank");
    }

    if (checkTitle === "email") {
      const link = document.createElement("a");
      link.href = "mailto:marketing@rsmedikalestari.com";
      link.click();
    }

    if (checkTitle === "customer service") {
      window.open("https://wa.me/6282246232527", "_blank");
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-white to-slate-100 font-sans text-[#005cb3] relative py-16 overflow-hidden">
      <div className="relative z-10">
        {/* INFORMASI SECTION */}
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16 lg:mb-10 justify-center md:justify-start text-center md:text-left"
          >
            <h2 className="text-4xl font-light uppercase pb-2">Informasi</h2>
            <div className="hidden md:block flex-1 h-[1px] bg-gray-200/50" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                onClick={() => handleInfoClick(item.title)}
                className="flex flex-col items-center justify-center p-10 bg-white cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md"
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

        {/* PELAYANAN SECTION */}
        <div className="max-w-[1160px] mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16 lg:mb-10 justify-center md:justify-end text-center md:text-right"
          >
            <div className="hidden md:block flex-1 h-[1px] bg-gray-200/50" />
            <h2 className="text-4xl font-light uppercase pb-2">Pelayanan</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceClick(item)}
                className="aspect-square flex flex-col items-center justify-center text-center p-6 bg-white cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative w-14 h-14 mb-5">
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
      </div>
    </section>
  );
};

export default ServicesSection;
