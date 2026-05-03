import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET all MCU packages
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("mcu_packages")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Fetch error:", error);
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching MCU packages:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to fetch MCU packages: ${errorMsg}` },
      { status: 500 },
    );
  }
}

// POST create new MCU package
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, price, image_url, href } = body;

    console.log("POST request - Body:", body);

    if (!title || !price || !image_url) {
      return NextResponse.json(
        { error: "Missing required fields: title, price, image_url" },
        { status: 400 },
      );
    }

    // Get max display_order
    const { data: existingData, error: orderError } = await supabase
      .from("mcu_packages")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1);

    if (orderError) {
      console.error("Order fetch error:", orderError);
      throw orderError;
    }

    const nextOrder = (existingData?.[0]?.display_order || 0) + 1;

    console.log("Creating package with order:", nextOrder);

    const { data, error } = await supabase
      .from("mcu_packages")
      .insert([
        {
          title,
          price,
          image_url,
          href: href || "",
          display_order: nextOrder,
        },
      ])
      .select();

    console.log("Insert response:", { data, error });

    if (error) {
      console.error("Insert error from Supabase:", {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error("No data returned after insert");
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error creating MCU package:", error);
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to create MCU package: ${errorMsg}` },
      { status: 500 },
    );
  }
}
