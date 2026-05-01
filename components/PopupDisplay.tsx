"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchPopups, type Popup } from "@/lib/popup-api";
import { X } from "lucide-react";

const PopupDisplay = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const tabLeftTimeRef = useRef<number | null>(null);

  const POPUP_KEY = "last_popup_exit_time";
  const SESSION_KEY = "has_seen_popup_session";
  const FIVE_MINUTES = 5 * 60 * 1000;

  const checkLogicAndShow = () => {
    const now = Date.now();
    const lastExit = localStorage.getItem(POPUP_KEY);
    const hasSeenThisSession = sessionStorage.getItem(SESSION_KEY);

    if (!hasSeenThisSession) {
      setIsVisible(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    } else if (lastExit && now - parseInt(lastExit) > FIVE_MINUTES) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const loadPopups = async () => {
      try {
        const popupData = await fetchPopups();
        if (popupData && popupData.length > 0) {
          setPopups(popupData);
          checkLogicAndShow();
        }
      } catch (error) {
        console.error("Error loading popups:", error);
      }
    };
    loadPopups();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const now = Date.now();
        tabLeftTimeRef.current = now;
        localStorage.setItem(POPUP_KEY, now.toString());
      } else {
        const now = Date.now();
        if (
          tabLeftTimeRef.current &&
          now - tabLeftTimeRef.current > FIVE_MINUTES
        ) {
          setIsVisible(true);
        }
        tabLeftTimeRef.current = null;
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleAction = () => {
    if (currentIndex < popups.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsVisible(false);
      setCurrentIndex(0);
      localStorage.setItem(POPUP_KEY, Date.now().toString());
    }
  };

  const handleForceClose = () => {
    setIsVisible(false);
    setCurrentIndex(0);
    localStorage.setItem(POPUP_KEY, Date.now().toString());
  };

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "unset";
  }, [isVisible]);

  if (!isVisible || popups.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleForceClose}
      />

      {/* Container - Dikecilkan max-w-nya agar tidak terlalu raksasa */}
      <div className="relative flex flex-col items-center animate-in fade-in zoom-in duration-300 max-w-[85%] md:max-w-[500px]">
        {/* Close Button - Ditempel pas di sudut gambar */}
        <button
          onClick={handleAction}
          className="absolute -top-8 -right-2 text-white/50 hover:text-white transition-colors p-1"
        >
          <X size={18} strokeWidth={3} />
        </button>

        {/* Image - Menggunakan h-auto dan w-full agar tidak ngecrop */}
        <div
          className="relative cursor-pointer flex justify-center items-center rounded-lg overflow-hidden shadow-2xl"
          onClick={handleAction}
        >
          <img
            src={popups[currentIndex].image_url}
            alt="Popup Content"
            className="w-full h-auto max-h-[70vh] object-contain block"
          />
        </div>

        {/* Counter Tipis (Hanya muncul jika lebih dari 1 gambar) */}
        {popups.length > 1 && (
          <span className="mt-3 text-[10px] text-white/20 font-mono tracking-tighter">
            {currentIndex + 1}/{popups.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default PopupDisplay;
