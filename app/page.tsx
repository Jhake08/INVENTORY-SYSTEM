import { Suspense } from "react"
import DashboardStats from "./components/dashboard-stats"
import RecentTransactions from "./components/recent-transactions"
import LowStockAlerts from "./components/low-stock-alerts"
import QuickActions from "./components/quick-actions"
import { CashflowChart, InventoryChart, SalesChart } from "./components/charts"
import { Card, CardContent } from "@/components/ui/card"

// Loading fallback component
function LoadingCard({ title }: { title: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Loading {title}...</p>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-4xl font-bold mb-2">Professional Inventory Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Real-time inventory monitoring • Interactive analytics • Advanced reporting
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            System Online
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Google Sheets Connected
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            Last Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Suspense fallback={<LoadingCard title="Quick Actions" />}>
        <QuickActions />
      </Suspense>

      {/* Dashboard Stats */}
      <Suspense fallback={<LoadingCard title="Dashboard Statistics" />}>
        <DashboardStats />
      </Suspense>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<LoadingCard title="Cashflow Chart" />}>
          <CashflowChart />
        </Suspense>
        <Suspense fallback={<LoadingCard title="Sales Chart" />}>
          <SalesChart />
        </Suspense>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<LoadingCard title="Inventory Chart" />}>
            <InventoryChart />
          </Suspense>
          <Suspense fallback={<LoadingCard title="Recent Transactions" />}>
            <RecentTransactions />
          </Suspense>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <Suspense fallback={<LoadingCard title="Low Stock Alerts" />}>
            <LowStockAlerts />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
