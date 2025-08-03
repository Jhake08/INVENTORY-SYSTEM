import { NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"

export async function GET() {
  try {
    const products = await googleSheetsService.getProducts()
    const lowStockItems = products.filter((p) => p.status === "active" && p.currentStock <= p.minStock)

    return NextResponse.json(lowStockItems)
  } catch (error) {
    console.error("Error fetching low stock alerts:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}
