import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

async function getInventoryReport() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch inventory report")
  }

  return res.json()
}

export default async function InventoryReport() {
  const products = await getInventoryReport()
  const activeProducts = products.filter((p: any) => p.status === "active")

  const totalValue = activeProducts.reduce((sum: number, p: any) => sum + p.currentStock * p.unitCost, 0)

  const lowStockItems = activeProducts.filter((p: any) => p.currentStock <= p.minStock)

  const categoryBreakdown = activeProducts.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = { count: 0, value: 0 }
    }
    acc[product.category].count += 1
    acc[product.category].value += product.currentStock * product.unitCost
    return acc
  }, {})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Total Products</p>
            <p className="text-2xl font-bold">{activeProducts.length}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Total Value</p>
            <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Low Stock Items</p>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">No low stock items</p>
          ) : (
            <div className="space-y-2">
              {lowStockItems.slice(0, 5).map((item: any) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span className="text-sm">{item.name}</span>
                  <Badge variant="destructive">
                    {item.currentStock}/{item.minStock}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Category Breakdown</p>
          <div className="space-y-2">
            {Object.entries(categoryBreakdown).map(([category, data]: [string, any]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm">{category}</span>
                <div className="text-right">
                  <p className="text-sm font-medium">{data.count} items</p>
                  <p className="text-xs text-muted-foreground">${data.value.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
