import { NextResponse } from "next/server"
import { databaseManager } from "@/lib/database-manager"

export async function GET() {
  try {
    console.log("🔍 Checking Google Sheets health...")
    const health = await databaseManager.checkDatabaseHealth()

    return NextResponse.json({
      primary: {
        name: "Google Sheets",
        status: health.googleSheets.status,
        error: health.googleSheets.error,
      },
      message:
        health.googleSheets.status === "online"
          ? "Google Sheets connection is healthy"
          : "Google Sheets connection failed",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Health check failed:", error)
    return NextResponse.json(
      {
        error: "Health check failed",
        primary: {
          name: "Google Sheets",
          status: "offline",
          error: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    console.log("📊 Exporting all data from Google Sheets...")
    const exportData = await databaseManager.exportAllData()

    return NextResponse.json({
      success: true,
      message: "Data exported successfully",
      data: {
        products: exportData.products.length,
        transactions: exportData.transactions.length,
        cashflow: exportData.cashflow.length,
        exportDate: exportData.exportDate,
        fullData: exportData,
      },
    })
  } catch (error) {
    console.error("❌ Export failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Export failed",
      },
      { status: 500 },
    )
  }
}
