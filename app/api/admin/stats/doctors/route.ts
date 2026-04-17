import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { error, count } = await supabase
      .from("doctors")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching doctors count:", error);
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    return NextResponse.json({ count: count || 0 }, { status: 200 });
  } catch (error) {
    console.error("Error in doctors stats API:", error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
