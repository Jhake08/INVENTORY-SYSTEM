import { Suspense } from "react"
import InventoryReport from "./components/inventory-report"
import ProfitLossReport from "./components/profit-loss-report"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">View detailed reports on inventory, sales, and profitability.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
          <InventoryReport />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
          <ProfitLossReport />
        </Suspense>
      </div>
    </div>
  )
}
