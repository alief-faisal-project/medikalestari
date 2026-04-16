import DoctorSection from "@/components/DoctorSection";

interface DoctorPageProps {
  searchParams: Promise<{ search?: string; specialty?: string }>;
}

export const metadata = {
  title: "Dokter Kami",
  description:
    "Lihat daftar dokter spesialis kami yang berpengalaman dan terpercaya",
};

export default async function DoctorPage({ searchParams }: DoctorPageProps) {
  const params = await searchParams;
  return (
    <div className="w-full min-h-screen bg-white">
      <DoctorSection
        initialSearch={params.search}
        initialSpecialty={params.specialty}
      />
    </div>
  );
}
