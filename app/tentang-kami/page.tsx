import AboutUs from "@/components/AboutUs";

export const metadata = {
  title: "Tentang Kami",
  description: "Sejarah, Visi, Misi, dan Profil Lengkap RS Medika Lestari",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen">
      {/* Memanggil Komponen AboutUs */}
      <AboutUs />
    </main>
  );
}
