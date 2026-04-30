"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/AdminSidebar";
import EmergencyWA from "@/components/EmergencyWA";
import MobileBottomNavbar from "@/components/MobileBottomNavbar";
import { AuthProvider } from "@/context/AuthProvider";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: "RS Medika Lestari",
    url: "https://www.rsmedikalestari.com",
    logo: "https://www.rsmedikalestari.com/icons/icon-512x512.png",
    hasPart: [
      {
        "@type": "WebPage",
        name: "Cari Dokter",
        url: "https://www.rsmedikalestari.com/admin/doctors",
      },
      {
        "@type": "WebPage",
        name: "Jadwal Dokter",
        url: "https://www.rsmedikalestari.com/admin/schedules",
      },
      {
        "@type": "WebPage",
        name: "Layanan Farmasi",
        url: "https://www.rsmedikalestari.com/farmasi",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* SEO Metadata */}
        <title>RS Medika Lestari</title>
        <meta
          name="description"
          content="RS Medika Lestari menyediakan layanan kesehatan profesional, farmasi 24 jam, dan tim dokter spesialis."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* --- PWA & iOS Settings (INTEGRASI DISINI) --- */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* iOS Specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RS Medika Lestari" />

        {/* Apple Touch Icon - Menggunakan ukuran 180x180 yang Anda minta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/icon-180x180.png"
        />
        {/* Tambahan cadangan jika perlu */}
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/icon-192x192.png"
        />
        {/* -------------------------------------------- */}

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-full bg-white text-black">
        <AuthProvider>
          {isAdminPage && !isLoginPage ? (
            <div className="flex min-h-screen">
              <AdminSidebar />
              <main className="flex-1 md:ml-64 bg-[#F2F2F2] min-h-screen">
                {children}
              </main>
            </div>
          ) : (
            <div className="flex flex-col min-h-screen">
              {!isAdminPage && <Navbar />}
              <main className="flex-1">{children}</main>
              <EmergencyWA />
              {!isAdminPage && <MobileBottomNavbar />}
              {!isAdminPage && <Footer />}
              {isLoginPage && children}
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
