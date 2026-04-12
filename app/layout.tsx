"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/AdminSidebar"; // Import Sidebar baru
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

  // Cek apakah halaman saat ini adalah bagian dari dashboard admin
  const isAdminPage = pathname?.startsWith("/admin");
  // Cek apakah halaman login (biasanya login tidak pakai sidebar)
  const isLoginPage = pathname === "/admin/login";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
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
            /* Layout Khusus Admin */
            <div className="flex min-h-screen">
              <AdminSidebar />
              <main className="flex-1 md:ml-64 bg-[#F2F2F2] min-h-screen">
                {children}
              </main>
            </div>
          ) : (
            /* Layout Publik */
            <div className="flex flex-col min-h-screen">
              {!isAdminPage && <Navbar />}
              <main className="flex-1">{children}</main>
              {!isAdminPage && <Footer />}
              {/* Jika halaman login admin, tetap tampilkan children tanpa navbar publik */}
              {isLoginPage && children}
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
