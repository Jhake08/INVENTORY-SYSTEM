import { type NextRequest, NextResponse } from "next/server"
import { databaseManager } from "@/lib/database-manager"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    console.log("📊 API: Updating product (Google Sheets Primary)")
    await databaseManager.updateProduct(params.id, updates)

    // Log audit
    await databaseManager.logAudit({
      userId: "system",
      action: "UPDATE",
      entityType: "product",
      entityId: params.id,
      changes: updates,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Product updated in Google Sheets with Supabase backup" })
  } catch (error) {
    console.error("❌ API: Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("📊 API: Deleting product (Google Sheets Primary)")
    await databaseManager.deleteProduct(params.id)

    // Log audit
    await databaseManager.logAudit({
      userId: "system",
      action: "DELETE",
      entityType: "product",
      entityId: params.id,
      changes: { status: "inactive" },
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Product deleted from Google Sheets with Supabase backup" })
  } catch (error) {
    console.error("❌ API: Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
