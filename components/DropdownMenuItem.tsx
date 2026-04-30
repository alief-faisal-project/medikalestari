"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DropdownItemProps {
  title: string;
  href: string;
}

const DropdownMenuItem = ({ title, href }: DropdownItemProps) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-all duration-300 relative overflow-hidden group"
    >
      <div className="flex items-center gap-2">
        {/* PANAH KIRI */}
        <div className="w-0 opacity-0 -ml-4 group-hover:w-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 ease-out">
          <ArrowRight size={18} style={{ color: "#007AFF" }} />
        </div>

        {/* TEKS */}
        <span className="text-[14px] text-gray-700 group-hover:text-[#007AFF] group-hover:font-medium transition-colors duration-300">
          {title}
        </span>
      </div>

      {/* PANAH KANAN */}
      <div className="opacity-100 group-hover:opacity-0 group-hover:translate-x-4 transition-all duration-300 ease-in">
        <ArrowRight size={16} className="text-gray-300" />
      </div>
    </Link>
  );
};

export default DropdownMenuItem;
