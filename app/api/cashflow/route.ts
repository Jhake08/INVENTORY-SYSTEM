import { NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"

export async function GET() {
  try {
    const cashflow = await googleSheetsService.getCashflowEntries()
    return NextResponse.json(cashflow)
  } catch (error) {
    console.error("Error fetching cashflow:", error)
    return NextResponse.json({ error: "Failed to fetch cashflow" }, { status: 500 })
  }
}
