import { Suspense } from "react"
import TransactionsTable from "./components/transactions-table"
import AddTransactionDialog from "./components/add-transaction-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Record purchases, sales, and stock adjustments.</p>
        </div>
        <AddTransactionDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </AddTransactionDialog>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
        <TransactionsTable />
      </Suspense>
    </div>
  )
}
