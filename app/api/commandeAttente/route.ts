import { GetCommandesAttente } from "@/services/commandeService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const commandes = await GetCommandesAttente();
    return NextResponse.json(commandes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}