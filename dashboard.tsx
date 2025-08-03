"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Plus,
  ArrowRightLeft,
  FileText,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  BarChart3,
} from "lucide-react"

export default function Dashboard() {
  // Mock data - completely self-contained
  const stats = {
    totalProducts: 156,
    lowStockItems: 8,
    totalValue: 45678.9,
    monthlyRevenue: 12450.0,
    monthlyExpenses: 8230.5,
    netProfit: 4219.5,
  }

  const lowStockItems = [
    { id: "1", name: "iPhone 14 Pro", sku: "IPH14P", currentStock: 2, minStock: 10 },
    { id: "2", name: "MacBook Air M2", sku: "MBA-M2", currentStock: 1, minStock: 5 },
    { id: "3", name: "AirPods Pro", sku: "APP-2", currentStock: 3, minStock: 15 },
    { id: "4", name: "iPad Air", sku: "IPA-5", currentStock: 0, minStock: 8 },
    { id: "5", name: "Apple Watch", sku: "AW-S8", currentStock: 1, minStock: 12 },
  ]

  const transactions = [
    {
      id: "1",
      productName: "iPhone 14 Pro",
      type: "sale",
      quantity: 2,
      totalAmount: 2198.0,
      date: new Date().toISOString(),
    },
    {
      id: "2",
      productName: "MacBook Air M2",
      type: "purchase",
      quantity: 10,
      totalAmount: 11990.0,
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "3",
      productName: "AirPods Pro",
      type: "sale",
      quantity: 5,
      totalAmount: 1245.0,
      date: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "4",
      productName: "iPad Air",
      type: "adjustment",
      quantity: -2,
      totalAmount: 0,
      date: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "5",
      productName: "Apple Watch Series 8",
      type: "sale",
      quantity: 3,
      totalAmount: 1197.0,
      date: new Date(Date.now() - 345600000).toISOString(),
    },
  ]

  const categoryData = [
    { name: "Electronics", value: 45600, percentage: 35, color: "bg-blue-500" },
    { name: "Computers", value: 28900, percentage: 22, color: "bg-green-500" },
    { name: "Mobile", value: 22100, percentage: 17, color: "bg-yellow-500" },
    { name: "Accessories", value: 15600, percentage: 12, color: "bg-red-500" },
    { name: "Audio", value: 12800, percentage: 10, color: "bg-purple-500" },
    { name: "Other", value: 5000, percentage: 4, color: "bg-gray-500" },
  ]

  const monthlyData = [
    { month: "Jan", income: 15200, expenses: 12100 },
    { month: "Feb", income: 18750, expenses: 14200 },
    { month: "Mar", income: 16800, expenses: 13500 },
    { month: "Apr", income: 22100, expenses: 15800 },
    { month: "May", income: 19500, expenses: 14900 },
    { month: "Jun", income: 21300, expenses: 16200 },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "purchase":
        return <ArrowDownRight className="h-4 w-4 text-blue-500" />
      case "adjustment":
        return <RotateCcw className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "sale":
        return "bg-green-100 text-green-800"
      case "purchase":
        return "bg-blue-100 text-blue-800"
      case "adjustment":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAction = (action: string) => {
    alert(`${action} clicked - would navigate to respective page`)
  }

  const statsCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      description: "Active inventory items",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Low Stock Alerts",
      value: stats.lowStockItems,
      description: "Items need restocking",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: stats.lowStockItems > 0 ? "Action needed" : "All good",
      changeType: stats.lowStockItems > 0 ? "negative" : "positive",
    },
    {
      title: "Inventory Value",
      value: `$${stats.totalValue.toLocaleString()}`,
      description: "Total stock value",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      description: "This month's income",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+15.3%",
      changeType: "positive",
    },
    {
      title: "Monthly Expenses",
      value: `$${stats.monthlyExpenses.toLocaleString()}`,
      description: "This month's costs",
      icon: TrendingDown,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "-5.1%",
      changeType: "positive",
    },
    {
      title: "Net Profit",
      value: `$${stats.netProfit.toLocaleString()}`,
      description: "Monthly profit/loss",
      icon: Activity,
      color: stats.netProfit >= 0 ? "text-green-600" : "text-red-600",
      bgColor: stats.netProfit >= 0 ? "bg-green-50" : "bg-red-50",
      change: stats.netProfit >= 0 ? "Profitable" : "Loss",
      changeType: stats.netProfit >= 0 ? "positive" : "negative",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Professional Inventory Dashboard</h1>
              <p className="text-blue-100 text-lg">
                Real-time inventory monitoring • Advanced analytics • Professional reporting
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              System Online
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Dashboard Active
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              Last Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center bg-transparent hover:bg-blue-50"
                onClick={() => handleAction("Add Product")}
              >
                <Plus className="h-5 w-5 mb-1" />
                <span className="text-xs">Add Product</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center bg-transparent hover:bg-green-50"
                onClick={() => handleAction("New Transaction")}
              >
                <ArrowRightLeft className="h-5 w-5 mb-1" />
                <span className="text-xs">New Transaction</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center bg-transparent hover:bg-purple-50"
                onClick={() => handleAction("View Reports")}
              >
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-xs">View Reports</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center bg-transparent hover:bg-orange-50"
                onClick={() => handleAction("Export Data")}
              >
                <Download className="h-5 w-5 mb-1" />
                <span className="text-xs">Export Data</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex flex-col items-center justify-center bg-transparent hover:bg-gray-50"
                onClick={() => handleAction("Refresh")}
              >
                <RefreshCw className="h-5 w-5 mb-1" />
                <span className="text-xs">Refresh</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statsCards.map((card, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${card.color} mb-1`}>{card.value}</div>
                <p className="text-xs text-gray-500 mb-2">{card.description}</p>
                <div className="flex items-center">
                  <span
                    className={`text-xs font-medium ${card.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                  >
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cashflow Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Cashflow Trends</CardTitle>
              <p className="text-sm text-muted-foreground">Income vs expenses over 6 months</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((month, index) => {
                  const maxValue = Math.max(...monthlyData.map((m) => Math.max(m.income, m.expenses)))
                  const incomeWidth = (month.income / maxValue) * 100
                  const expenseWidth = (month.expenses / maxValue) * 100

                  return (
                    <div key={month.month} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{month.month}</span>
                        <span className="text-gray-500">Net: ${(month.income - month.expenses).toLocaleString()}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 text-xs text-green-600">Income</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${incomeWidth}%` }}
                            ></div>
                          </div>
                          <div className="w-20 text-xs text-right">${month.income.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 text-xs text-red-600">Expenses</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${expenseWidth}%` }}
                            ></div>
                          </div>
                          <div className="w-20 text-xs text-right">${month.expenses.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Category</CardTitle>
              <p className="text-sm text-muted-foreground">Value distribution across categories</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">${category.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{category.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Transactions - 2/3 width */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium">{transaction.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getTransactionColor(transaction.type)}>{transaction.type}</Badge>
                        <p className="text-sm font-medium mt-1">${transaction.totalAmount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">Qty: {Math.abs(transaction.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Low Stock Alerts - 1/3 width */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Low Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lowStockItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
