"use client";

import React from "react";
import {
  AlertCircle,
  Bed,
  Users,
  Microscope,
  Heart,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      icon: AlertCircle,
      title: "Instalasi Gawat Darurat (IGD)",
      description:
        "Layanan darurat 24/7 dengan peralatan medis modern dan tim profesional siap membantu.",
      color: "from-red-500 to-rose-600",
    },
    {
      id: 2,
      icon: Bed,
      title: "Rawat Inap",
      description:
        "Fasilitas rawat inap nyaman dengan standar internasional dan perawatan terbaik.",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      icon: Users,
      title: "Rawat Jalan",
      description:
        "Konsultasi dengan dokter spesialis berpengalaman untuk diagnosis dan treatment.",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      icon: Microscope,
      title: "Laboratorium",
      description:
        "Laboratorium berstandar tinggi dengan teknologi diagnosis terkini dan akurat.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: 5,
      icon: Heart,
      title: "Radiologi",
      description:
        "Pemeriksaan imaging dengan CT scan, MRI, dan X-ray teknologi terbaru.",
      color: "from-green-500 to-teal-600",
    },
    {
      id: 6,
      icon: Stethoscope,
      title: "Klinik Spesialis",
      description:
        "Layanan klinik spesialis untuk berbagai bidang kesehatan dan medis.",
      color: "from-indigo-500 to-blue-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full py-20 md:py-32 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#003d79] mb-6 tracking-tight">
            Layanan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            RS Medika Lestari menyediakan berbagai layanan kesehatan komprehensif
            dengan fasilitas modern dan tenaga medis profesional untuk kesejahteraan
            Anda.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <div className="h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-blue-200">
                  {/* Icon Container */}
                  <div
                    className={`inline-flex p-4 rounded-lg bg-linear-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent size={28} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#003d79] mb-4 group-hover:text-[#0084BF] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bottom Border Animation */}
                  <div className="h-1 w-0 group-hover:w-full bg-linear-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-300"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-8">
            Ingin mengetahui lebih lanjut tentang layanan kami?
          </p>
          <button className="px-10 py-4 bg-[#003d79] text-white font-bold rounded-full hover:bg-[#002b55] transition-colors duration-300 uppercase text-sm tracking-wide shadow-lg hover:shadow-xl">
            Hubungi Kami Sekarang
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
