"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/currency"
import { settingsManager } from "@/lib/settings"
import type { Product } from "@/lib/types"

// Simple Cashflow Chart
export function CashflowChart() {
  const [cashflowData, setCashflowData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCashflowData()
  }, [])

  const fetchCashflowData = async () => {
    try {
      const response = await fetch("/api/cashflow")
      if (response.ok) {
        const data = await response.json()
        const processedData = processMonthlyData(data)
        setCashflowData(processedData)
      } else {
        setCashflowData(getMockData())
      }
    } catch (error) {
      console.error("Error fetching cashflow data:", error)
      setCashflowData(getMockData())
    } finally {
      setLoading(false)
    }
  }

  const getMockData = () => [
    { month: "Jan", income: 152000, expenses: 121000 },
    { month: "Feb", income: 187500, expenses: 142000 },
    { month: "Mar", income: 168000, expenses: 135000 },
    { month: "Apr", income: 221000, expenses: 158000 },
    { month: "May", income: 195000, expenses: 149000 },
    { month: "Jun", income: 213000, expenses: 162000 },
  ]

  const processMonthlyData = (data: any[]) => {
    const monthlyData: { [key: string]: { income: number; expenses: number } } = {}

    data.forEach((entry) => {
      const month = new Date(entry.date).toLocaleDateString("en-US", { month: "short" })
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 }
      }

      if (entry.type === "income") {
        monthlyData[month].income += entry.amount
      } else {
        monthlyData[month].expenses += entry.amount
      }
    })

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      income: data.income,
      expenses: data.expenses,
    }))
  }

  const currency = settingsManager.getCurrency()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cashflow Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  const maxValue = Math.max(...cashflowData.map((d) => Math.max(d.income, d.expenses)))
  const currentMonth = cashflowData[cashflowData.length - 1] || { income: 0, expenses: 0 }
  const netCashflow = currentMonth.income - currentMonth.expenses

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cashflow Trends</CardTitle>
        <p className="text-sm text-muted-foreground">Monthly income vs expenses</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64 space-y-4">
            {cashflowData.map((month, index) => {
              const incomeWidth = (month.income / maxValue) * 100
              const expenseWidth = (month.expenses / maxValue) * 100

              return (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className="text-gray-500">
                      Net: {formatCurrency(month.income - month.expenses, currency)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 text-xs text-green-600">Income</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${incomeWidth}%` }}
                        ></div>
                      </div>
                      <div className="w-20 text-xs text-right">{formatCurrency(month.income, currency)}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 text-xs text-red-600">Expenses</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-red-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${expenseWidth}%` }}
                        ></div>
                      </div>
                      <div className="w-20 text-xs text-right">{formatCurrency(month.expenses, currency)}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm font-medium text-green-600">Income</p>
              <p className="text-lg font-bold">{formatCurrency(currentMonth.income, currency)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-red-600">Expenses</p>
              <p className="text-lg font-bold">{formatCurrency(currentMonth.expenses, currency)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">Net</p>
              <p className={`text-lg font-bold ${netCashflow >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(netCashflow, currency)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Simple Inventory Chart
export function InventoryChart() {
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInventoryData()
  }, [])

  const fetchInventoryData = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const products: Product[] = await response.json()
        const processedData = processCategoryData(products)
        setCategoryData(processedData)
      } else {
        setCategoryData(getMockCategoryData())
      }
    } catch (error) {
      console.error("Error fetching inventory data:", error)
      setCategoryData(getMockCategoryData())
    } finally {
      setLoading(false)
    }
  }

  const getMockCategoryData = () => [
    { name: "Electronics", value: 456000, items: 156, color: "bg-blue-500" },
    { name: "Accessories", value: 234000, items: 89, color: "bg-green-500" },
    { name: "Computers", value: 678000, items: 234, color: "bg-yellow-500" },
    { name: "Mobile", value: 342000, items: 123, color: "bg-red-500" },
    { name: "Audio", value: 189000, items: 67, color: "bg-purple-500" },
  ]

  const processCategoryData = (products: Product[]) => {
    const categories: { [key: string]: { value: number; items: number } } = {}
    const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"]

    products.forEach((product) => {
      if (!categories[product.category]) {
        categories[product.category] = { value: 0, items: 0 }
      }
      categories[product.category].value += product.currentStock * product.unitCost
      categories[product.category].items += 1
    })

    return Object.entries(categories).map(([name, data], index) => ({
      name,
      value: data.value,
      items: data.items,
      color: colors[index % colors.length],
    }))
  }

  const currency = settingsManager.getCurrency()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  const totalValue = categoryData.reduce((sum, category) => sum + category.value, 0)
  const maxValue = Math.max(...categoryData.map((c) => c.value))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory by Category</CardTitle>
        <p className="text-sm text-muted-foreground">Value distribution across categories</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64 space-y-3">
            {categoryData.map((category, index) => {
              const percentage = totalValue > 0 ? (category.value / totalValue) * 100 : 0
              const barWidth = maxValue > 0 ? (category.value / maxValue) * 100 : 0

              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{formatCurrency(category.value, currency)}</div>
                      <div className="text-xs text-gray-500">{category.items} items</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-700 ${category.color}`}
                        style={{ width: `${barWidth}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium w-12">{percentage.toFixed(1)}%</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(totalValue, currency)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-xl font-bold text-green-600">{categoryData.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Simple Sales Chart
export function SalesChart() {
  const [salesData, setSalesData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalesData()
  }, [])

  const fetchSalesData = async () => {
    try {
      const response = await fetch("/api/transactions")
      if (response.ok) {
        const transactions = await response.json()
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
    { month: "Jan", sales: 45000, orders: 156 },
    { month: "Feb", sales: 52000, orders: 189 },
    { month: "Mar", sales: 48000, orders: 167 },
    { month: "Apr", sales: 61000, orders: 203 },
    { month: "May", sales: 55000, orders: 178 },
    { month: "Jun", sales: 58000, orders: 195 },
  ]

  const processSalesData = (transactions: any[]) => {
    const monthlyData: { [key: string]: { sales: number; orders: number } } = {}

    transactions
      .filter((t) => t.type === "sale")
      .forEach((transaction) => {
        const month = new Date(transaction.date).toLocaleDateString("en-US", { month: "short" })
        if (!monthlyData[month]) {
          monthlyData[month] = { sales: 0, orders: 0 }
        }
        monthlyData[month].sales += transaction.totalAmount || 0
        monthlyData[month].orders += 1
      })

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      sales: data.sales,
      orders: data.orders,
    }))
  }

  const currency = settingsManager.getCurrency()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  const maxSales = Math.max(...salesData.map((d) => d.sales))
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0)
  const totalOrders = salesData.reduce((sum, d) => sum + d.orders, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Performance</CardTitle>
        <p className="text-sm text-muted-foreground">Monthly sales and order trends</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64 space-y-4">
            {salesData.map((month, index) => {
              const salesWidth = maxSales > 0 ? (month.sales / maxSales) * 100 : 0

              return (
                <div key={month.month} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{month.month}</span>
                    <span className="text-gray-500">{month.orders} orders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-blue-600">Sales</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-700"
                        style={{ width: `${salesWidth}%` }}
                      ></div>
                    </div>
                    <div className="w-20 text-xs text-right">{formatCurrency(month.sales, currency)}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-600">Total Sales</p>
              <p className="text-xl font-bold">{formatCurrency(totalSales, currency)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-green-600">Total Orders</p>
              <p className="text-xl font-bold">{totalOrders}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
