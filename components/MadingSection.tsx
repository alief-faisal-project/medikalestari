"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { fetchMadingContent } from "@/lib/api";
import { MadingContent } from "@/lib/types";

const MadingSection = () => {
  const [activeTab, setActiveTab] = useState("Artikel");
  const [allData, setAllData] = useState<MadingContent[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse Drag Scroll Logic
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await fetchMadingContent();
        setAllData(content);
      } catch (error) {
        console.error("Error loading content:", error);
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const filteredData = allData.filter((item) =>
    activeTab === "Artikel" ? item.type === "edukasi" : item.type === "event",
  );

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-[1110px] mx-auto">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100">
          <h2 className="text-3xl font-bold text-slate-800 pb-4">
            Informasi & Artikel
          </h2>
          <div className="flex gap-8">
            {["Artikel", "Event"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-sm font-bold transition-all relative ${
                  activeTab === tab ? "text-[#005075]" : "text-gray-400"
                }`}
              >
                {tab.toUpperCase()}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#005075]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-6"
        >
          <div className="grid grid-flow-col auto-cols-[calc(50%-10px)] lg:grid-cols-4 lg:auto-cols-fr gap-5">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] bg-gray-50 animate-pulse rounded-xl"
                  />
                ))
              : filteredData.map((item) => (
                  /* TAMBAHAN: Class 'group' pada card utama agar elemen di dalamnya 
                    bisa bereaksi saat card ini di-hover 
                  */
                  <div
                    key={item.id}
                    className="bg-white overflow-hidden border border-gray-100 flex flex-col group transition-all hover:shadow-md h-full cursor-pointer"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Body */}
                    <div className="p-4 flex flex-col flex-grow">
                      <span className="text-slate-500 text-[10px] font-bold uppercase mb-2 tracking-widest">
                        {item.type === "edukasi" ? "Artikel" : "Event"}
                      </span>

                      <h3 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2 h-10 leading-snug group-hover:text-[#005075] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-[11px] text-slate-500 line-clamp-3 mb-4 flex-grow leading-relaxed">
                        {item.description}
                      </p>

                      {/* Date Section */}
                      <div className="flex items-center gap-2 text-[#005075] font-bold text-[10px] mb-4 uppercase tracking-tight">
                        {item.type === "event" ? (
                          <Calendar size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {item.type === "event"
                          ? item.start_date || item.date
                          : item.date}
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-gray-500 font-bold text-[12px] transition-all duration-300 group-hover:text-[#005075]">
                        <span>Baca Selengkapnya</span>
                        <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125">
                          <ChevronRight size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default MadingSection;
