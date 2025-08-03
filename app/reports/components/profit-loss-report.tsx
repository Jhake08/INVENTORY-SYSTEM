import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getProfitLossData() {
  const [transactionsRes, cashflowRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/transactions`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/cashflow`, {
      cache: "no-store",
    }),
  ])

  if (!transactionsRes.ok || !cashflowRes.ok) {
    throw new Error("Failed to fetch profit/loss data")
  }

  const [transactions, cashflow] = await Promise.all([transactionsRes.json(), cashflowRes.json()])

  return { transactions, cashflow }
}

export default async function ProfitLossReport() {
  const { transactions, cashflow } = await getProfitLossData()

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  // Calculate monthly revenue from sales
  const monthlySales = transactions.filter((t: any) => {
    const date = new Date(t.date)
    return t.type === "sale" && date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })

  const monthlyRevenue = monthlySales.reduce((sum: number, t: any) => sum + t.totalAmount, 0)

  // Calculate COGS (Cost of Goods Sold)
  const cogs = monthlySales.reduce((sum: number, t: any) => {
    // Assuming we can get the cost from the transaction or calculate it
    return sum + t.quantity * (t.unitPrice * 0.6) // Simplified COGS calculation
  }, 0)

  // Calculate expenses from cashflow
  const monthlyExpenses = cashflow
    .filter((c: any) => {
      const date = new Date(c.date)
      return c.type === "expense" && date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum: number, c: any) => sum + c.amount, 0)

  const grossProfit = monthlyRevenue - cogs
  const netProfit = grossProfit - monthlyExpenses
  const grossMargin = monthlyRevenue > 0 ? (grossProfit / monthlyRevenue) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit & Loss Report</CardTitle>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Revenue</span>
            <span className="text-lg font-bold text-green-600">${monthlyRevenue.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Cost of Goods Sold</span>
            <span className="text-lg font-bold text-red-600">${cogs.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Gross Profit</span>
            <span className={`text-lg font-bold ${grossProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${grossProfit.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Operating Expenses</span>
            <span className="text-lg font-bold text-red-600">${monthlyExpenses.toFixed(2)}</span>
          </div>

          <hr />

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Net Profit</span>
            <span className={`text-xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ${netProfit.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Gross Margin</span>
            <span className="text-lg font-bold">{grossMargin.toFixed(1)}%</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">Key Metrics</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="font-medium">Sales Count</p>
              <p>{monthlySales.length}</p>
            </div>
            <div>
              <p className="font-medium">Avg Sale Value</p>
              <p>${monthlySales.length > 0 ? (monthlyRevenue / monthlySales.length).toFixed(2) : "0.00"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
