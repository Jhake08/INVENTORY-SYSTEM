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
  Users,
  ShoppingCart,
  Eye,
} from "lucide-react"

export default function ProfessionalDashboard() {
  // Complete mock data - no external dependencies
  const dashboardData = {
    stats: {
      totalProducts: 1247,
      lowStockItems: 23,
      totalValue: 156789.5,
      monthlyRevenue: 45230.75,
      monthlyExpenses: 28450.25,
      netProfit: 16780.5,
      totalCustomers: 892,
      pendingOrders: 34,
    },
    lowStockItems: [
      { id: "1", name: "iPhone 15 Pro Max", sku: "IP15PM-256", currentStock: 3, minStock: 15, category: "Mobile" },
      { id: "2", name: "MacBook Pro M3", sku: "MBP-M3-14", currentStock: 1, minStock: 8, category: "Laptops" },
      { id: "3", name: "AirPods Pro 2", sku: "APP2-USB", currentStock: 5, minStock: 25, category: "Audio" },
      { id: "4", name: "iPad Air M2", sku: "IPA-M2-11", currentStock: 0, minStock: 12, category: "Tablets" },
      { id: "5", name: "Apple Watch Ultra 2", sku: "AWU2-49", currentStock: 2, minStock: 18, category: "Wearables" },
      { id: "6", name: "Magic Keyboard", sku: "MK-12.9", currentStock: 4, minStock: 20, category: "Accessories" },
    ],
    recentTransactions: [
      {
        id: "T001",
        productName: "iPhone 15 Pro",
        type: "sale",
        quantity: 3,
        unitPrice: 1199.0,
        totalAmount: 3597.0,
        date: new Date().toISOString(),
        customer: "John Smith",
      },
      {
        id: "T002",
        productName: "MacBook Air M3",
        type: "purchase",
        quantity: 15,
        unitPrice: 1299.0,
        totalAmount: 19485.0,
        date: new Date(Date.now() - 3600000).toISOString(),
        supplier: "Apple Inc.",
      },
      {
        id: "T003",
        productName: "AirPods Pro 2",
        type: "sale",
        quantity: 8,
        unitPrice: 249.0,
        totalAmount: 1992.0,
        date: new Date(Date.now() - 7200000).toISOString(),
        customer: "Sarah Johnson",
      },
      {
        id: "T004",
        productName: "iPad Pro 12.9",
        type: "adjustment",
        quantity: -2,
        unitPrice: 0,
        totalAmount: 0,
        date: new Date(Date.now() - 86400000).toISOString(),
        reason: "Damaged units",
      },
      {
        id: "T005",
        productName: "Apple Watch Series 9",
        type: "sale",
        quantity: 5,
        unitPrice: 429.0,
        totalAmount: 2145.0,
        date: new Date(Date.now() - 172800000).toISOString(),
        customer: "Mike Wilson",
      },
    ],
    categoryData: [
      { name: "Mobile Devices", value: 67890, percentage: 43, color: "bg-blue-500", items: 234 },
      { name: "Computers", value: 45230, percentage: 29, color: "bg-green-500", items: 156 },
      { name: "Audio Equipment", value: 23450, percentage: 15, color: "bg-purple-500", items: 189 },
      { name: "Accessories", value: 12340, percentage: 8, color: "bg-orange-500", items: 345 },
      { name: "Wearables", value: 7879, percentage: 5, color: "bg-pink-500", items: 123 },
    ],
    monthlyTrends: [
      { month: "Jul", income: 38200, expenses: 24100, profit: 14100 },
      { month: "Aug", income: 42750, expenses: 26800, profit: 15950 },
      { month: "Sep", income: 39800, expenses: 25200, profit: 14600 },
      { month: "Oct", income: 47100, expenses: 28900, profit: 18200 },
      { month: "Nov", income: 44500, expenses: 27300, profit: 17200 },
      { month: "Dec", income: 45230, expenses: 28450, profit: 16780 },
    ],
    topProducts: [
      { name: "iPhone 15 Pro", sales: 156, revenue: 187044 },
      { name: "MacBook Air M3", sales: 89, revenue: 115611 },
      { name: "AirPods Pro 2", sales: 234, revenue: 58266 },
      { name: "iPad Air M2", sales: 67, revenue: 40199 },
      { name: "Apple Watch S9", sales: 123, revenue: 52767 },
    ],
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "purchase":
        return <ArrowDownRight className="h-4 w-4 text-blue-500" />
      case "adjustment":
        return <RotateCcw className="h-4 w-4 text-orange-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTransactionBadgeColor = (type: string) => {
    switch (type) {
      case "sale":
        return "bg-green-100 text-green-800 border-green-200"
      case "purchase":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "adjustment":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleQuickAction = (action: string) => {
    alert(`${action} functionality would be implemented here`)
  }

  const statsCards = [
    {
      title: "Total Products",
      value: dashboardData.stats.totalProducts.toLocaleString(),
      description: "Active inventory items",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Low Stock Alerts",
      value: dashboardData.stats.lowStockItems,
      description: "Items need restocking",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "Urgent",
      changeType: "negative",
    },
    {
      title: "Inventory Value",
      value: `$${dashboardData.stats.totalValue.toLocaleString()}`,
      description: "Total stock value",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8.7%",
      changeType: "positive",
    },
    {
      title: "Monthly Revenue",
      value: `$${dashboardData.stats.monthlyRevenue.toLocaleString()}`,
      description: "This month's income",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+15.3%",
      changeType: "positive",
    },
    {
      title: "Net Profit",
      value: `$${dashboardData.stats.netProfit.toLocaleString()}`,
      description: "Monthly profit",
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      change: "+22.1%",
      changeType: "positive",
    },
    {
      title: "Total Customers",
      value: dashboardData.stats.totalCustomers.toLocaleString(),
      description: "Active customers",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      change: "+5.2%",
      changeType: "positive",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Professional Inventory Dashboard</h1>
                <p className="text-blue-100 text-lg">
                  Real-time analytics • Advanced reporting • Business intelligence
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
              <div className="text-blue-200">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-6 text-sm">
            <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              System Online
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Dashboard Active
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              {dashboardData.stats.pendingOrders} Pending Orders
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
              <Badge variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Live Dashboard
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { icon: Plus, label: "Add Product", color: "hover:bg-blue-50 hover:border-blue-200" },
                { icon: ArrowRightLeft, label: "New Transaction", color: "hover:bg-green-50 hover:border-green-200" },
                { icon: FileText, label: "Generate Report", color: "hover:bg-purple-50 hover:border-purple-200" },
                { icon: Download, label: "Export Data", color: "hover:bg-orange-50 hover:border-orange-200" },
                { icon: RefreshCw, label: "Sync Data", color: "hover:bg-gray-50 hover:border-gray-200" },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${action.color}`}
                  onClick={() => handleQuickAction(action.label)}
                >
                  <action.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {statsCards.map((card, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${card.color} mb-2`}>{card.value}</div>
                <p className="text-sm text-gray-500 mb-3">{card.description}</p>
                <div className="flex items-center">
                  <span
                    className={`text-sm font-semibold px-2 py-1 rounded-full ${
                      card.changeType === "positive" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                    }`}
                  >
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Trends */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Monthly Performance Trends</span>
              </CardTitle>
              <p className="text-sm text-gray-500">6-month income, expenses, and profit analysis</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.monthlyTrends.map((month, index) => {
                  const maxValue = Math.max(...dashboardData.monthlyTrends.map((m) => Math.max(m.income, m.expenses)))
                  const incomeWidth = (month.income / maxValue) * 100
                  const expenseWidth = (month.expenses / maxValue) * 100
                  const profitMargin = ((month.profit / month.income) * 100).toFixed(1)

                  return (
                    <div key={month.month} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">{month.month} 2024</span>
                        <div className="text-right">
                          <span className="text-sm font-medium text-green-600">
                            Profit: ${month.profit.toLocaleString()}
                          </span>
                          <div className="text-xs text-gray-500">Margin: {profitMargin}%</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 text-xs font-medium text-green-600">Income</div>
                          <div className="flex-1 bg-gray-100 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${incomeWidth}%` }}
                            ></div>
                          </div>
                          <div className="w-24 text-xs text-right font-medium">${month.income.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-16 text-xs font-medium text-red-600">Expenses</div>
                          <div className="flex-1 bg-gray-100 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${expenseWidth}%` }}
                            ></div>
                          </div>
                          <div className="w-24 text-xs text-right font-medium">${month.expenses.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-purple-600" />
                <span>Inventory by Category</span>
              </CardTitle>
              <p className="text-sm text-gray-500">Value and item distribution across categories</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.categoryData.map((category, index) => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        <span className="font-medium text-gray-700">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-800">${category.value.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{category.items} items</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={category.percentage} className="flex-1 h-3" />
                      <span className="text-sm font-medium text-gray-600 w-12">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Transactions - Takes 2/3 width */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                  <span>Recent Transactions</span>
                </CardTitle>
                <p className="text-sm text-gray-500">Latest sales, purchases, and adjustments</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">{getTransactionIcon(transaction.type)}</div>
                        <div>
                          <p className="font-semibold text-gray-800">{transaction.productName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString()} •
                            {transaction.customer || transaction.supplier || transaction.reason}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className={getTransactionBadgeColor(transaction.type)}>
                          {transaction.type.toUpperCase()}
                        </Badge>
                        <p className="text-lg font-bold text-gray-800">
                          ${Math.abs(transaction.totalAmount).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">Qty: {Math.abs(transaction.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Takes 1/3 width */}
          <div className="space-y-6">
            {/* Low Stock Alerts */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span>Critical Stock Alerts</span>
                </CardTitle>
                <Badge variant="destructive" className="text-xs">
                  {dashboardData.lowStockItems.length} Items
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.lowStockItems.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                    >
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.sku} • {item.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={item.currentStock === 0 ? "destructive" : "secondary"}>
                          {item.currentStock}/{item.minStock}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Need: {item.minStock - item.currentStock}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Top Performers</span>
                </CardTitle>
                <p className="text-sm text-gray-500">Best selling products this month</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.topProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} units sold</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">${product.revenue.toLocaleString()}</p>
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
