import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      {/* Gunakan container-custom agar margin kiri-kanan sama dengan Navbar */}
      <div className="container-custom py-16">
        <main className="max-w-3xl flex flex-col items-start gap-8 bg-white dark:bg-black p-12 border border-zinc-100 shadow-sm rounded-sm">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter text-black dark:text-zinc-50 leading-tight">
              To get started, edit the page.tsx file.
            </h1>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Project ini sekarang menggunakan font <strong>Helvetica</strong>{" "}
              untuk tampilan industrial yang lebih kuat.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row w-full pt-4">
            <a
              className="flex h-12 items-center justify-center gap-2 bg-black text-white px-8 font-bold transition-all hover:bg-[#d62300] dark:bg-white dark:text-black"
              href="https://vercel.com/new"
            >
              DEPLOY NOW
            </a>
            <a
              className="flex h-12 items-center justify-center border-2 border-zinc-200 px-8 font-bold transition-all hover:border-black dark:border-zinc-700"
              href="https://nextjs.org/docs"
            >
              DOCUMENTATION
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
