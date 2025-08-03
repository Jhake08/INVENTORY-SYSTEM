import { Suspense } from "react"
import ProductsTable from "./components/products-table"
import AddProductDialog from "./components/add-product-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your inventory products and stock levels.</p>
        </div>
        <AddProductDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </AddProductDialog>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
        <ProductsTable />
      </Suspense>
    </div>
  )
}
