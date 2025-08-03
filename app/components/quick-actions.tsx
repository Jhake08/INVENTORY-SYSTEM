"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Download, RefreshCw } from "lucide-react"

export default function QuickActions() {
  const router = useRouter()

  const handleAction = (action: string) => {
    switch (action) {
      case "Add Product":
        router.push("/products")
        break
      case "Import Data":
        // Trigger import functionality
        handleImportData()
        break
      case "Export Data":
        // Trigger export functionality
        handleExportData()
        break
      case "Sync Data":
        // Refresh the page
        window.location.reload()
        break
      default:
        console.log(`${action} clicked`)
    }
  }

  const handleExportData = async () => {
    try {
      // Create a simple CSV export
      const [products, transactions] = await Promise.all([
        fetch("/api/products")
          .then((res) => res.json())
          .catch(() => []),
        fetch("/api/transactions")
          .then((res) => res.json())
          .catch(() => []),
      ])

      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,"
      csvContent += "Type,Name,SKU,Category,Stock,Value,Date\n"

      products.forEach((product: any) => {
        csvContent += `Product,"${product.name}","${product.sku}","${product.category}",${product.currentStock},${product.sellingPrice},"${product.lastUpdated}"\n`
      })

      transactions.forEach((transaction: any) => {
        csvContent += `Transaction,"${transaction.productName}","","${transaction.type}",${transaction.quantity},${transaction.totalAmount},"${transaction.date}"\n`
      })

      // Download the file
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `inventory_export_${new Date().toISOString().split("T")[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    }
  }

  const handleImportData = () => {
    // Trigger import functionality
    console.log("Import Data clicked")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-20 flex-col space-y-2" onClick={() => handleAction("Add Product")}>
            <Plus className="h-6 w-6" />
            <span className="text-sm">Add Product</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
            onClick={() => handleAction("Import Data")}
          >
            <Upload className="h-6 w-6" />
            <span className="text-sm">Import Data</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
            onClick={() => handleAction("Export Data")}
          >
            <Download className="h-6 w-6" />
            <span className="text-sm">Export Data</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
            onClick={() => handleAction("Sync Data")}
          >
            <RefreshCw className="h-6 w-6" />
            <span className="text-sm">Sync Data</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
