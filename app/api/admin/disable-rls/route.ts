import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Endpoint untuk disable RLS di storage.objects
 * Hanya bisa dijalankan sekali dengan service role key
 */
export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        {
          error: "Service role key not configured",
          details: "SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di .env.local",
        },
        { status: 500 },
      );
    }

    // Create admin client dengan service role key
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Run SQL untuk disable RLS
    const { data, error } = await adminClient.rpc("exec_sql", {
      sql: `
        ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
        CREATE POLICY IF NOT EXISTS "Allow all access to storage objects"
        ON storage.objects
        FOR ALL
        USING (true)
        WITH CHECK (true);
      `,
    });

    if (error) {
      console.error("RLS disable error:", error);
      return NextResponse.json(
        {
          error: "Failed to disable RLS",
          details: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "RLS successfully disabled for storage.objects",
      data,
    });
  } catch (error) {
    console.error("Error:", error);
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
