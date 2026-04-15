"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ServicesSection = () => {
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
    { id: 1, img: "/icons/informasi/telephone.png", title: "Telepon" },
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
    },
    {
      id: 3,
      img: "/icons/pelayanan/calendar.png",
      title: "Jadwal Dokter",
      targetId: null,
    },
    {
      id: 4,
      img: "/icons/pelayanan/clock.png",
      title: "Jam Operasional",
      targetId: null,
    },
  ];

  const router = useRouter();

  const handleServiceClick = (item: {
    id: number;
    img: string;
    title: string;
    targetId: string | null;
  }) => {
    if (!item.targetId) return;

    const el = document.getElementById(item.targetId);
    if (el) {
      scrollToSection(item.targetId);
      return;
    }

    router.push(`/dokter#${item.targetId}`);
  };

  // HANDLE INFO CLICK (TAMBAHAN)
  const handleInfoClick = (title: string) => {
    if (title === "Lokasi") {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=RS+Medika+Lestari",
        "_blank",
      );
    }

    if (title === "Email") {
      window.location.href = "mailto:marketing@rsmedikalestari.com";
    }

    if (title === "Telepon") {
      window.open("https://wa.me/6282246232527", "_blank"); // ganti nomor
    }
  };

  return (
    <section className="w-full bg-white font-sans text-[#005075] relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full opacity-[0.05]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0084BF"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L0,0Z"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-full rotate-180 opacity-[0.08]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#005075"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128L1440,0L0,0Z"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* INFORMASI */}
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16"
          >
            <h2 className="text-4xl font-light uppercase border-b-4 border-[#005075] pb-2">
              Informasi
            </h2>
            <div className="flex-1 h-[1px] bg-gray-200/50" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {infoData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -12 }}
                onClick={() => handleInfoClick(item.title)}
                className="aspect-square flex flex-col items-center justify-center text-center p-6 rounded-full cursor-pointer group"
              >
                <div className="w-40 h-40 flex items-center justify-center mb-6 rounded-full bg-[#f8fafc] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] group-hover:scale-110 transition-transform duration-500 relative">
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tighter max-w-[160px]">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PELAYANAN */}
        <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16 justify-end"
          >
            <div className="flex-1 h-[1px] bg-gray-200/50" />
            <h2 className="text-4xl font-light uppercase border-b-4 border-[#005075] pb-2">
              Pelayanan
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {serviceData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -12 }}
                onClick={() => handleServiceClick(item)}
                className="aspect-square flex flex-col items-center justify-center text-center p-6 border border-gray-100 hover:shadow-[0px_30px_60px_rgba(0,80,117,0.12)] transition-all duration-500 rounded-full cursor-pointer group"
              >
                <div className="w-28 h-28 flex items-center justify-center mb-6 rounded-full bg-[#f8fafc] shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] group-hover:scale-110 transition-transform duration-500 relative">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tighter max-w-[160px]">
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
