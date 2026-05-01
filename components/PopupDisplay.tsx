"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchPopups, type Popup } from "@/lib/popup-api";
import { X } from "lucide-react";
import Image from "next/image";

const PopupDisplay = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const tabLeftTimeRef = useRef<number | null>(null);

  const checkAndShowPopup = () => {
    const popupKey = "popupSessionData";
    const now = Date.now();
    const sessionData = localStorage.getItem(popupKey);

    const data = sessionData
      ? JSON.parse(sessionData)
      : { firstShow: now, shown: false, tabLeftCount: 0, lastReturn: now };

    const timeSinceFirstShow = now - data.firstShow;
    const isActiveUser = timeSinceFirstShow < 5 * 60 * 1000; // 5 minutes = active user

    // Logic:
    // 1. Jika user baru pertama kali: tampilkan popup
    // 2. Jika user aktif (< 5 menit): tampilkan popup sekali saja
    // 3. Jika user jarang (keluar tab lama): tampilkan popup lagi
    if (!data.shown) {
      // First time showing
      setIsVisible(true);
      data.shown = true;
    } else if (!isActiveUser && data.tabLeftCount > 0) {
      // User jarang, dan sudah keluar-masuk tab: tampilkan lagi
      setIsVisible(true);
      data.shown = true;
    }

    localStorage.setItem(popupKey, JSON.stringify(data));
  };

  // Smart logic: detect user activity and tab switches
  useEffect(() => {
    const loadPopups = async () => {
      try {
        const popupData = await fetchPopups();
        if (popupData.length > 0) {
          setPopups(popupData);
          checkAndShowPopup();
        }
      } catch (error) {
        console.error("Error loading popups:", error);
      }
    };

    loadPopups();
  }, []);

  // Track tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const popupKey = "popupSessionData";
      const now = Date.now();
      const sessionData = localStorage.getItem(popupKey);
      const data = sessionData
        ? JSON.parse(sessionData)
        : { firstShow: now, shown: false, tabLeftCount: 0, lastReturn: now };

      if (document.hidden) {
        // User meninggalkan tab
        tabLeftTimeRef.current = now;
        data.tabLeftCount = (data.tabLeftCount || 0) + 1;
      } else {
        // User kembali ke tab
        if (tabLeftTimeRef.current) {
          const awayTime = now - tabLeftTimeRef.current;
          const isAwayLong = awayTime > 30 * 1000; // 30 detik = jarang

          if (isAwayLong && popups.length > 0) {
            // User jarang dan away lama: tampilkan popup lagi
            setIsVisible(true);
            data.shown = false; // Reset agar popup muncul lagi
          }
        }
        tabLeftTimeRef.current = null;
      }

      localStorage.setItem(popupKey, JSON.stringify(data));
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [popups.length]);

  const handleClose = () => {
    setIsVisible(false);
    setCurrentIndex(0);
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
  };

  // Auto-play gambar dengan timing
  useEffect(() => {
    if (isVisible && popups.length > 1) {
      // Auto next ke gambar berikutnya setiap 5 detik
      autoPlayTimerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev < popups.length - 1) {
            return prev + 1;
          } else {
            // Jika sudah gambar terakhir, close popup
            handleClose();
            return 0;
          }
        });
      }, 5000); // 5 detik
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [isVisible, currentIndex, popups.length]);

  const handleImageClick = () => {
    // Klik gambar = next atau close jika sudah terakhir
    if (currentIndex < popups.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleClose();
    }
  };

  // Lock scroll saat popup visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  if (!isVisible || popups.length === 0) {
    return null;
  }

  const currentPopup = popups[currentIndex];

  return (
    <>
      {/* FULL SCREEN OVERLAY */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={handleClose}
        role="presentation"
      />

      {/* FULL SCREEN POPUP - CLEAN & PROFESSIONAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl">
          {/* IMAGE - FULL WIDTH, CLICKABLE */}
          <div
            className="relative w-full bg-black cursor-pointer overflow-hidden"
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleImageClick();
              }
            }}
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={currentPopup.image_url}
              alt={`Popup ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              quality={95}
            />

            {/* PROGRESS BAR */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
              <div
                className="h-full bg-white/90 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / popups.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* CLOSE BUTTON - KECIL, PROFESSIONAL */}
          <button
            onClick={handleClose}
            className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition p-1"
            title="Tutup"
            aria-label="Close popup"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* COUNTER - MINIMAL */}
          <div className="text-center mt-3 text-white text-xs font-medium opacity-60">
            {currentIndex + 1} dari {popups.length}
          </div>

          {/* DOT INDICATORS - TINY */}
          {popups.length > 1 && (
            <div className="flex justify-center gap-1 mt-2">
              {popups.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (autoPlayTimerRef.current) {
                      clearTimeout(autoPlayTimerRef.current);
                    }
                  }}
                  className={`w-1 h-1 rounded-full transition ${
                    idx === currentIndex ? "bg-white" : "bg-white/30"
                  }`}
                  aria-label={`Gambar ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PopupDisplay;
