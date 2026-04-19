import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const path = formData.get("path") as string;

    if (!file || !path) {
      return NextResponse.json(
        { error: "File and path are required" },
        { status: 400 },
      );
    }

    // Validasi ukuran file
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    const bucketName = "uploads";
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Supabase configuration error" },
        { status: 500 },
      );
    }

    // Gunakan service role key jika tersedia untuk membuat bucket
    let adminClient: ReturnType<typeof createClient> | null = null;
    if (supabaseServiceKey) {
      adminClient = createClient(supabaseUrl, supabaseServiceKey);
    }

    const anonClient = createClient(supabaseUrl, supabaseAnonKey);

    // Jika punya service key, coba buat bucket jika tidak ada
    if (adminClient) {
      const { data: buckets } = await adminClient.storage.listBuckets();
      const bucketExists = buckets?.some((b) => b.name === bucketName);

      if (!bucketExists) {
        console.log(
          `Bucket "${bucketName}" tidak ditemukan, mencoba membuat...`,
        );
        const { error: createError } = await adminClient.storage.createBucket(
          bucketName,
          {
            public: true,
          },
        );

        if (createError) {
          console.error("Error creating bucket:", createError);
          // Lanjutkan dengan anon client, mungkin bucket sudah ada
        } else {
          console.log(`Bucket "${bucketName}" berhasil dibuat`);
        }
      }
    }

    // Gunakan admin client untuk upload jika tersedia (bypass RLS)
    const uploadClient = adminClient || anonClient;
    const { data, error } = await uploadClient.storage
      .from(bucketName)
      .upload(path, uint8Array, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", {
        message: error.message,
        name: error.name,
      });

      // Jika error RLS, berikan instruksi
      if (error.message.includes("row-level security")) {
        return NextResponse.json(
          {
            error:
              "RLS Policy error. Silakan nonaktifkan RLS di bucket 'uploads':\n1. Buka Supabase Dashboard\n2. Pergi ke Storage → Buckets → uploads\n3. Klik tab 'Policies'\n4. Disable semua RLS policies",
            details: error.message,
          },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          error: `Upload failed: ${error.message}`,
          hint: "Pastikan bucket 'uploads' bersifat public dan tidak memiliki RLS yang terlalu ketat",
        },
        { status: 500 },
      );
    }

    if (!data) {
      console.error("No data returned from upload");
      return NextResponse.json(
        { error: "No data returned from upload" },
        { status: 500 },
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = anonClient.storage.from(bucketName).getPublicUrl(data.path);

    console.log("Upload success:", { path: data.path, url: publicUrl });
    return NextResponse.json({ url: publicUrl, path: data.path });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 },
    );
  }
}
