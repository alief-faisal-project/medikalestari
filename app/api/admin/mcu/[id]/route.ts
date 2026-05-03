import { createServerSupabaseClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET specific MCU package
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = await params;

    const { data, error } = await supabase
      .from("mcu_packages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching MCU package:", error);
    return NextResponse.json(
      { error: "Failed to fetch MCU package" },
      { status: 500 },
    );
  }
}

// PATCH update MCU package
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = await params;
    const body = await request.json();
    const { title, price, image_url, href, display_order } = body;

    console.log("PATCH request - ID:", id, "Body:", body);

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 },
      );
    }

    // Build update object with all provided fields
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (price !== undefined) updateData.price = price;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (href !== undefined) updateData.href = href;
    if (display_order !== undefined) updateData.display_order = display_order;
    updateData.updated_at = new Date().toISOString();

    console.log("Update data:", updateData);

    const { data, error } = await supabase
      .from("mcu_packages")
      .update(updateData)
      .eq("id", id)
      .select();

    console.log("Update response:", { data, error });

    if (error) {
      console.error("Update error from Supabase:", {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn("No package found with ID:", id);
      return NextResponse.json(
        { error: "Package not found or no changes made" },
        { status: 404 },
      );
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating MCU package:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to update MCU package: ${errorMsg}` },
      { status: 500 },
    );
  }
}

// DELETE MCU package
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const supabase = createServerSupabaseClient();
    const { id } = await params;

    console.log("DELETE request - ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("mcu_packages").delete().eq("id", id);

    console.log("Delete response:", { error });

    if (error) {
      console.error("Delete error from Supabase:", {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting MCU package:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to delete MCU package: ${errorMsg}` },
      { status: 500 },
    );
  }
}
