import { type NextRequest, NextResponse } from "next/server"
import { databaseManager } from "@/lib/database-manager"

export async function GET() {
  try {
    console.log("📊 API: Fetching products (Google Sheets Primary)")
    const products = await databaseManager.getProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error("❌ API: Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json()
    console.log("📊 API: Adding product (Google Sheets Primary)")
    await databaseManager.addProduct(product)

    // Log audit
    await databaseManager.logAudit({
      userId: "system",
      action: "CREATE",
      entityType: "product",
      entityId: product.sku,
      changes: product,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Product added to Google Sheets with Supabase backup" })
  } catch (error) {
    console.error("❌ API: Error adding product:", error)
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}
