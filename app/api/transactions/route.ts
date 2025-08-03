import { type NextRequest, NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"

export async function GET() {
  try {
    const transactions = await googleSheetsService.getTransactions()
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const transaction = await request.json()
    await googleSheetsService.addTransaction(transaction)

    // Add corresponding cashflow entry
    const cashflowEntry = {
      date: transaction.date,
      type: transaction.type === "sale" ? "income" : ("expense" as "income" | "expense"),
      amount: Math.abs(transaction.totalAmount),
      description: `${transaction.type} - ${transaction.productName}`,
      category: transaction.type,
      transactionId: transaction.id,
    }

    await googleSheetsService.addCashflowEntry(cashflowEntry)

    // Log audit
    await googleSheetsService.logAudit({
      userId: "system",
      action: "CREATE",
      entityType: "transaction",
      entityId: transaction.productId,
      changes: transaction,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding transaction:", error)
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 })
  }
}
