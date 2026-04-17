import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Test basic Supabase connection
    const { data: configData, error: configError } = await supabase
      .from("careers_config")
      .select("*")
      .limit(1);

    if (configError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to careers_config table",
          error: configError.message,
          details: configError.details,
        },
        { status: 500 },
      );
    }

    // Test registrations table
    const { data: registrationsData, error: registrationsError } =
      await supabase.from("career_registrations").select("*").limit(1);

    if (registrationsError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to connect to career_registrations table",
          error: registrationsError.message,
          details: registrationsError.details,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "All systems operational",
        tables: {
          careers_config: {
            connected: true,
            count: configData?.length || 0,
          },
          career_registrations: {
            connected: true,
            count: registrationsData?.length || 0,
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
