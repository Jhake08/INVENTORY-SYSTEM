"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import type { Product } from "@/lib/types"

export default function LowStockAlerts() {
  const [lowStockItems, setLowStockItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLowStockAlerts()
  }, [])

  const fetchLowStockAlerts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/alerts/low-stock")
      if (!response.ok) {
        throw new Error("Failed to fetch low stock alerts")
      }
      const data = await response.json()
      setLowStockItems(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching low stock alerts:", err)
      setError("Failed to load alerts")
      // Fallback to mock data
      setLowStockItems([
        {
          id: "1",
          name: "iPhone 14 Pro",
          sku: "IPH14P",
          category: "Mobile",
          currentStock: 2,
          minStock: 10,
          maxStock: 100,
          unitCost: 50000,
          sellingPrice: 65000,
          supplier: "Apple",
          lastUpdated: new Date().toISOString(),
          status: "active",
        },
        {
          id: "2",
          name: "MacBook Air M2",
          sku: "MBA-M2",
          category: "Laptops",
          currentStock: 1,
          minStock: 5,
          maxStock: 50,
          unitCost: 60000,
          sellingPrice: 75000,
          supplier: "Apple",
          lastUpdated: new Date().toISOString(),
          status: "active",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
                <div className="text-right">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-8"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-red-600 mb-2">{error}</p>
            <button
              onClick={fetchLowStockAlerts}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockItems.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No low stock items</p>
        ) : (
          <div className="space-y-3">
            {lowStockItems.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <Badge variant={item.currentStock === 0 ? "destructive" : "secondary"}>
                    {item.currentStock}/{item.minStock}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Min: {item.minStock}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
