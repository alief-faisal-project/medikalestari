import Image from "next/image";
import HeroSection from "@/components/HeroSection"; // Sesuaikan path folder komponenmu

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* HeroSection tepat di bawah navbar */}
      <main>
        <HeroSection />

        {/* Konten tambahan di bawah hero jika perlu */}
        <div className="container-custom py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Selamat Datang di RS Medika Lestari
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kami berkomitmen untuk memberikan layanan kesehatan terbaik...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
