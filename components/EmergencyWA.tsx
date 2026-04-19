"use client";

import { usePathname } from "next/navigation";

const EmergencyWA = () => {
  const pathname = usePathname();


  if (pathname !== "/") return null;

  return (
    <div className="hidden lg:block fixed bottom-0 right-0 z-[9999] w-[200px] h-[150px] overflow-hidden pointer-events-none">
      <a
        href="https://wa.me/6282246232527"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto absolute bottom-[30px] right-[-65px] block w-[250px] bg-[#005cb3] hover:bg-[#005cb3]/90 text-white text-center py-2.5 text-[12px] font-bold uppercase tracking-wider shadow-xl transform rotate-[-45deg] transition-colors duration-200 font-sans"
      >
        Hubungi kami
        {/* button */}
        <span className="absolute bottom-0 right-0 w-0 h-0 border-solid border-t-0 border-l-0 border-b-[20px] border-r-[20px] border-b-[#075e54] border-r-transparent"></span>
      </a>
    </div>
  );
};

export default EmergencyWA;
