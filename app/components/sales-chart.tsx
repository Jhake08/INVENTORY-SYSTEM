"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"
import { settingsManager } from "@/lib/settings"
import type { Transaction } from "@/lib/types"

export default function SalesChart() {
  const [salesData, setSalesData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalesData()
  }, [])

  const fetchSalesData = async () => {
    try {
      const response = await fetch("/api/transactions")
      if (response.ok) {
        const transactions: Transaction[] = await response.json()
        const processedData = processSalesData(transactions)
        setSalesData(processedData)
      } else {
        setSalesData(getMockSalesData())
      }
    } catch (error) {
      console.error("Error fetching sales data:", error)
      setSalesData(getMockSalesData())
    } finally {
      setLoading(false)
    }
  }

  const getMockSalesData = () => [
    { category: "Electronics", revenue: 354000, color: "bg-blue-500" },
    { category: "Computers", revenue: 289000, color: "bg-green-500" },
    { category: "Mobile", revenue: 221000, color: "bg-yellow-500" },
    { category: "Accessories", revenue: 156000, color: "bg-red-500" },
    { category: "Audio", revenue: 128000, color: "bg-purple-500" },
  ]

  const processSalesData = (transactions: Transaction[]) => {
    const salesByCategory: { [key: string]: number } = {}
    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"]

    // Filter only sales transactions
    const sales = transactions.filter((t) => t.type === "sale")

    // Group by product category (you might need to fetch product details)
    sales.forEach((sale) => {
      const category = "General" // You'd need to map product to category
      if (!salesByCategory[category]) {
        salesByCategory[category] = 0
      }
      salesByCategory[category] += sale.totalAmount
    })

    return Object.entries(salesByCategory).map(([category, revenue], index) => ({
      category,
      revenue,
      color: colors[index % colors.length],
    }))
  }

  const currency = settingsManager.getCurrency()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <p className="text-sm text-muted-foreground">Revenue breakdown by category</p>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  const totalSales = salesData.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <p className="text-sm text-muted-foreground">Revenue breakdown by category</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart - Simple donut representation */}
          <div className="h-64 relative">
            <div className="w-48 h-48 mx-auto relative">
              {/* Outer ring segments */}
              <div className="w-full h-full rounded-full border-8 border-gray-200 relative overflow-hidden">
                {salesData.map((item, index) => {
                  const percentage = totalSales > 0 ? (item.revenue / totalSales) * 100 : 0
                  const rotation = salesData
                    .slice(0, index)
                    .reduce((sum, prev) => sum + (totalSales > 0 ? (prev.revenue / totalSales) * 360 : 0), 0)

                  return (
                    <div
                      key={item.category}
                      className={`absolute inset-0 rounded-full ${item.color} opacity-80`}
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((rotation + percentage * 3.6) * Math.PI) / 180)}% ${50 - 50 * Math.sin(((rotation + percentage * 3.6) * Math.PI) / 180)}%, 50% 50%)`,
                        transform: `rotate(${rotation}deg)`,
                      }}
                    ></div>
                  )
                })}
              </div>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                  <p className="text-sm font-medium text-gray-600">Total Sales</p>
                  <p className="text-lg font-bold text-blue-600">{formatCurrency(totalSales, currency)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Category Breakdown</p>
            {salesData.map((item, index) => {
              const percentage = totalSales > 0 ? (item.revenue / totalSales) * 100 : 0
              return (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${item.color}`}></div>
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(item.revenue, currency)}</p>
                    <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
