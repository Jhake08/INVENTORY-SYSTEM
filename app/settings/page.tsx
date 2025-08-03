"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Settings, Database, Download, CheckCircle, XCircle, Info } from "lucide-react"
import { settingsManager } from "@/lib/settings"

export default function SettingsPage() {
  const [currency, setCurrency] = useState<string>(settingsManager.getCurrency())
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  const [dbStatus, setDbStatus] = useState<"checking" | "online" | "offline">("checking")

  // New states for Google Sheets integration inputs
  const [gsEmail, setGsEmail] = useState("")
  const [gsPrivateKey, setGsPrivateKey] = useState("")
  const [baseUrl, setBaseUrl] = useState("")

  useEffect(() => {
    // Load saved Google Sheets integration settings from localStorage or settingsManager if implemented
    const savedGsEmail = localStorage.getItem("gsServiceAccountEmail") || ""
    const savedGsPrivateKey = localStorage.getItem("gsPrivateKey") || ""
    const savedBaseUrl = localStorage.getItem("baseUrl") || ""

    setGsEmail(savedGsEmail)
    setGsPrivateKey(savedGsPrivateKey)
    setBaseUrl(savedBaseUrl)
  }, [])

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency)
    settingsManager.updateSettings({ currency: newCurrency as "PHP" | "USD" })
  }

  const handleGsEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGsEmail(e.target.value)
  }

  const handleGsPrivateKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGsPrivateKey(e.target.value)
  }

  const handleBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseUrl(e.target.value)
  }

  const saveIntegrationSettings = () => {
    localStorage.setItem("gsServiceAccountEmail", gsEmail)
    localStorage.setItem("gsPrivateKey", gsPrivateKey)
    localStorage.setItem("baseUrl", baseUrl)
    alert("Integration settings saved locally. Please restart the app if needed.")
  }

  const checkDatabaseHealth = async () => {
    setDbStatus("checking")
    try {
      const response = await fetch("/api/sync")
      if (response.ok) {
        const data = await response.json()
        setDbStatus(data.primary?.status === "online" ? "online" : "offline")
      } else {
        setDbStatus("offline")
      }
    } catch (error) {
      setDbStatus("offline")
    }
  }

  const exportData = async () => {
    try {
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "export" }),
      })

      if (response.ok) {
        const data = await response.json()
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `inventory-backup-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your system preferences and configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    <SelectItem value="PHP">PHP - Philippine Peso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Low Stock Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts when products are running low</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">Automatically backup data daily</p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Database Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Your system uses Google Sheets as the primary database. Ensure your service account has proper access
                  permissions.
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Google Sheets Connection</h3>
                  <p className="text-sm text-muted-foreground">Primary database connection status</p>
                </div>
                <div className="flex items-center space-x-2">
                  {dbStatus === "checking" && <Badge variant="secondary">Checking...</Badge>}
                  {dbStatus === "online" && (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </>
                  )}
                  {dbStatus === "offline" && (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <Badge variant="destructive">Offline</Badge>
                    </>
                  )}
                </div>
              </div>

              <Button onClick={checkDatabaseHealth} variant="outline">
                Check Connection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>API & Google Sheets Integration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gsEmail">Google Service Account Email</Label>
                  <Input
                    id="gsEmail"
                    type="email"
                    value={gsEmail}
                    onChange={handleGsEmailChange}
                    placeholder="Enter Google Service Account Email"
                  />
                </div>
                <div>
                  <Label htmlFor="gsPrivateKey">Google Private Key</Label>
                  <Input
                    id="gsPrivateKey"
                    type="password"
                    value={gsPrivateKey}
                    onChange={handleGsPrivateKeyChange}
                    placeholder="Enter Google Private Key"
                  />
                </div>
                <div>
                  <Label htmlFor="baseUrl">API Base URL</Label>
                  <Input
                    id="baseUrl"
                    type="url"
                    value={baseUrl}
                    onChange={handleBaseUrlChange}
                    placeholder="Enter API Base URL"
                  />
                </div>
                <Button onClick={saveIntegrationSettings}>Save Integration Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Data Backup</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Export your data as JSON for backup purposes. This includes all products, transactions, and cashflow
                  data.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Manual Backup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a complete backup of your inventory data in JSON format.
                  </p>
                  <Button onClick={exportData} className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export Data</span>
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Backup Schedule</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Configure automatic backup frequency (requires server setup).
                  </p>
                  <Select defaultValue="daily">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
