import AboutUs from "@/components/AboutUs";

export const metadata = {
  title: "Tentang Kami | RS Medika Lestari",
  description: "Sejarah, Visi, Misi, dan Profil Lengkap RS Medika Lestari",
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen">

      {/* Memanggil Komponen AboutUs */}
      <AboutUs />
    </main>
  );
}
