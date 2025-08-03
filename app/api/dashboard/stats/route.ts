import { NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"
import type { DashboardStats } from "@/lib/types"

export async function GET() {
  try {
    const [products, transactions, cashflow] = await Promise.all([
      googleSheetsService.getProducts(),
      googleSheetsService.getTransactions(),
      googleSheetsService.getCashflowEntries(),
    ])

    const activeProducts = products.filter((p) => p.status === "active")
    const lowStockItems = activeProducts.filter((p) => p.currentStock <= p.minStock)
    const totalValue = activeProducts.reduce((sum, p) => sum + p.currentStock * p.unitCost, 0)

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyIncome = cashflow
      .filter((c) => {
        const date = new Date(c.date)
        return c.type === "income" && date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      .reduce((sum, c) => sum + c.amount, 0)

    const monthlyExpenses = cashflow
      .filter((c) => {
        const date = new Date(c.date)
        return c.type === "expense" && date.getMonth() === currentMonth && date.getFullYear() === currentYear
      })
      .reduce((sum, c) => sum + c.amount, 0)

    const stats: DashboardStats = {
      totalProducts: activeProducts.length,
      lowStockItems: lowStockItems.length,
      totalValue,
      monthlyRevenue: monthlyIncome,
      monthlyExpenses,
      netProfit: monthlyIncome - monthlyExpenses,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
