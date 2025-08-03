"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Database, CheckCircle, AlertCircle, Download } from "lucide-react"

interface DatabaseHealth {
  primary: {
    name: string
    status: "online" | "offline"
    error?: string
  }
  message?: string
}

export default function DatabaseStatus() {
  const [health, setHealth] = useState<DatabaseHealth | null>(null)
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/sync")
      const data = await response.json()
      setHealth(data)
      setLastCheck(new Date())
    } catch (error) {
      console.error("Failed to check database health:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportData = async () => {
    setExporting(true)
    try {
      const response = await fetch("/api/sync", { method: "POST" })
      const result = await response.json()

      if (result.success) {
        alert(
          `✅ Data exported successfully!\n\nProducts: ${result.data.products}\nTransactions: ${result.data.transactions}\nCashflow: ${result.data.cashflow}`,
        )

        // Create and download JSON file
        const dataBlob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const a = document.createElement("a")
        a.href = url
        a.download = `inventory-export-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        alert("❌ Export failed: " + result.error)
      }
    } catch (error) {
      console.error("Export failed:", error)
      alert("❌ Export failed. Please try again.")
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Database Status</span>
          </div>
          <Button variant="outline" size="sm" onClick={checkHealth} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Checking..." : "Refresh"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Architecture:</strong> Google Sheets is your primary and only database. All data is stored directly
            in your Google Sheets.
          </AlertDescription>
        </Alert>

        {health && (
          <div className="space-y-4">
            {/* Primary Database Status */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">{health.primary.name} (Primary)</p>
                  <p className="text-sm text-gray-500">Main data source</p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={health.primary.status === "online" ? "default" : "destructive"}
                  className={health.primary.status === "online" ? "bg-green-100 text-green-800" : ""}
                >
                  {health.primary.status === "online" ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {health.primary.status.toUpperCase()}
                </Badge>
                {health.primary.error && <p className="text-xs text-red-500 mt-1">{health.primary.error}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Export Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Export</p>
              <p className="text-sm text-gray-500">Download all data as JSON backup</p>
            </div>
            <Button onClick={exportData} disabled={exporting}>
              <Download className={`h-4 w-4 mr-2 ${exporting ? "animate-spin" : ""}`} />
              {exporting ? "Exporting..." : "Export Data"}
            </Button>
          </div>

          {lastCheck && <p className="text-xs text-gray-500">Last checked: {lastCheck.toLocaleString()}</p>}
        </div>

        {/* Data Flow Diagram */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium mb-2">Data Flow:</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-green-600" />
              <span>Google Sheets</span>
            </div>
            <span>↔</span>
            <div className="flex items-center space-x-2">
              <span>Your App</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">Direct integration - no backup database needed</p>
        </div>
      </CardContent>
    </Card>
  )
}
