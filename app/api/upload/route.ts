import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    console.log("Uploading file to bucket 'content' with path:", path);

    const { data, error } = await supabase.storage
      .from("content")
      .upload(path, uint8Array, {
        contentType: file.type,
        upsert: true, // changed to true untuk overwrite jika sudah ada
      });

    if (error) {
      console.error("Upload error details:", {
        message: error.message,
        status: (error as any).status,
        statusCode: (error as any).statusCode,
      });

      // Return detailed error untuk debugging
      return NextResponse.json(
        {
          error: "Failed to upload file to storage bucket",
          details: error.message,
          hint: "Pastikan bucket 'content' sudah dibuat di Supabase Storage dengan setting PUBLIC",
        },
        { status: 500 },
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("content").getPublicUrl(data.path);

    console.log("File uploaded successfully:", {
      path: data.path,
      publicUrl: publicUrl,
    });

    return NextResponse.json({ url: publicUrl, path: data.path });
  } catch (error) {
    console.error("Upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Internal server error",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}
