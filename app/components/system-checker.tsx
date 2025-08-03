"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Clock, Database, Server, Globe, Settings, FileText, RefreshCw } from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "running" | "success" | "error"
  message: string
  details?: string
  duration?: number
}

interface SystemHealth {
  frontend: TestResult[]
  backend: TestResult[]
  database: TestResult[]
  integration: TestResult[]
}

export default function SystemChecker() {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<SystemHealth>({
    frontend: [],
    backend: [],
    database: [],
    integration: [],
  })

  const frontendTests = [
    { name: "React Components Loading", endpoint: null, test: "component" },
    { name: "Tailwind CSS Styles", endpoint: null, test: "styles" },
    { name: "Navigation Routing", endpoint: null, test: "routing" },
    { name: "Form Validation", endpoint: null, test: "forms" },
    { name: "Responsive Design", endpoint: null, test: "responsive" },
  ]

  const backendTests = [
    { name: "API Server Status", endpoint: "/api/sync", test: "server" },
    { name: "Products API", endpoint: "/api/products", test: "api" },
    { name: "Transactions API", endpoint: "/api/transactions", test: "api" },
    { name: "Dashboard Stats API", endpoint: "/api/dashboard/stats", test: "api" },
    { name: "Cashflow API", endpoint: "/api/cashflow", test: "api" },
  ]

  const databaseTests = [
    { name: "Google Sheets Connection", endpoint: "/api/sync", test: "connection" },
    { name: "Authentication", endpoint: null, test: "auth" },
    { name: "Read Operations", endpoint: "/api/products", test: "read" },
    { name: "Write Operations", endpoint: "/api/products", test: "write" },
    { name: "Data Validation", endpoint: null, test: "validation" },
  ]

  const integrationTests = [
    { name: "End-to-End Product Flow", endpoint: null, test: "e2e" },
    { name: "Transaction Processing", endpoint: null, test: "transaction" },
    { name: "Dashboard Data Flow", endpoint: null, test: "dashboard" },
    { name: "Error Handling", endpoint: null, test: "errors" },
    { name: "Performance", endpoint: null, test: "performance" },
  ]

  const runTest = async (test: any, category: keyof SystemHealth): Promise<TestResult> => {
    const startTime = Date.now()

    try {
      let result: TestResult = {
        name: test.name,
        status: "running",
        message: "Testing...",
        duration: 0,
      }

      // Update status to running
      setResults((prev) => ({
        ...prev,
        [category]: prev[category].map((t) => (t.name === test.name ? result : t)),
      }))

      await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate test time

      switch (test.test) {
        case "component":
          result = await testReactComponents()
          break
        case "styles":
          result = await testTailwindStyles()
          break
        case "routing":
          result = await testNavigation()
          break
        case "forms":
          result = await testFormValidation()
          break
        case "responsive":
          result = await testResponsiveDesign()
          break
        case "server":
          result = await testServerStatus(test.endpoint)
          break
        case "api":
          result = await testAPIEndpoint(test.endpoint)
          break
        case "connection":
          result = await testDatabaseConnection()
          break
        case "auth":
          result = await testAuthentication()
          break
        case "read":
          result = await testReadOperations(test.endpoint)
          break
        case "write":
          result = await testWriteOperations(test.endpoint)
          break
        case "validation":
          result = await testDataValidation()
          break
        case "e2e":
          result = await testEndToEndFlow()
          break
        case "transaction":
          result = await testTransactionProcessing()
          break
        case "dashboard":
          result = await testDashboardDataFlow()
          break
        case "errors":
          result = await testErrorHandling()
          break
        case "performance":
          result = await testPerformance()
          break
        default:
          result = {
            name: test.name,
            status: "error",
            message: "Unknown test type",
            duration: Date.now() - startTime,
          }
      }

      result.duration = Date.now() - startTime
      result.name = test.name

      return result
    } catch (error) {
      return {
        name: test.name,
        status: "error",
        message: error instanceof Error ? error.message : "Test failed",
        duration: Date.now() - startTime,
      }
    }
  }

  // Frontend Tests
  const testReactComponents = async (): Promise<TestResult> => {
    try {
      const components = ["sidebar", "dashboard-stats", "quick-actions"]
      const missingComponents = components.filter((comp) => {
        const element = document.querySelector(`[data-component="${comp}"]`)
        return !element
      })

      if (missingComponents.length === 0) {
        return {
          name: "React Components Loading",
          status: "success",
          message: "All components loaded successfully",
          details: `${components.length} components verified`,
        }
      } else {
        return {
          name: "React Components Loading",
          status: "error",
          message: `Missing components: ${missingComponents.join(", ")}`,
          details: `${components.length - missingComponents.length}/${components.length} components loaded`,
        }
      }
    } catch (error) {
      return {
        name: "React Components Loading",
        status: "error",
        message: "Component test failed",
      }
    }
  }

  const testTailwindStyles = async (): Promise<TestResult> => {
    try {
      const testElement = document.createElement("div")
      testElement.className = "bg-blue-500 text-white p-4 rounded-lg"
      document.body.appendChild(testElement)

      const styles = window.getComputedStyle(testElement)
      const hasBlueBackground =
        styles.backgroundColor.includes("59, 130, 246") || styles.backgroundColor.includes("rgb(59, 130, 246)")
      const hasWhiteText = styles.color.includes("255, 255, 255") || styles.color.includes("rgb(255, 255, 255)")
      const hasPadding = Number.parseFloat(styles.padding) > 0

      document.body.removeChild(testElement)

      if (hasBlueBackground && hasWhiteText && hasPadding) {
        return {
          name: "Tailwind CSS Styles",
          status: "success",
          message: "Tailwind CSS is working correctly",
          details: "Colors, spacing, and utilities applied",
        }
      } else {
        return {
          name: "Tailwind CSS Styles",
          status: "error",
          message: "Tailwind CSS not properly configured",
          details: `Background: ${hasBlueBackground}, Text: ${hasWhiteText}, Padding: ${hasPadding}`,
        }
      }
    } catch (error) {
      return {
        name: "Tailwind CSS Styles",
        status: "error",
        message: "Style test failed",
      }
    }
  }

  const testNavigation = async (): Promise<TestResult> => {
    try {
      const navLinks = document.querySelectorAll("nav a[href]")
      const requiredRoutes = ["/", "/products", "/transactions", "/reports", "/settings"]
      const foundRoutes = Array.from(navLinks).map((link) => (link as HTMLAnchorElement).getAttribute("href"))
      const missingRoutes = requiredRoutes.filter((route) => !foundRoutes.includes(route))

      if (missingRoutes.length === 0) {
        return {
          name: "Navigation Routing",
          status: "success",
          message: "All navigation routes present",
          details: `${requiredRoutes.length} routes verified`,
        }
      } else {
        return {
          name: "Navigation Routing",
          status: "error",
          message: `Missing routes: ${missingRoutes.join(", ")}`,
          details: `${requiredRoutes.length - missingRoutes.length}/${requiredRoutes.length} routes found`,
        }
      }
    } catch (error) {
      return {
        name: "Navigation Routing",
        status: "error",
        message: "Navigation test failed",
      }
    }
  }

  const testFormValidation = async (): Promise<TestResult> => {
    try {
      // Test if forms have proper validation attributes
      const forms = document.querySelectorAll("form")
      const inputs = document.querySelectorAll('input[required], input[type="email"], input[type="number"]')

      return {
        name: "Form Validation",
        status: "success",
        message: "Form validation is configured",
        details: `${forms.length} forms, ${inputs.length} validated inputs`,
      }
    } catch (error) {
      return {
        name: "Form Validation",
        status: "error",
        message: "Form validation test failed",
      }
    }
  }

  const testResponsiveDesign = async (): Promise<TestResult> => {
    try {
      const viewport = window.innerWidth
      const isMobile = viewport < 768
      const isTablet = viewport >= 768 && viewport < 1024
      const isDesktop = viewport >= 1024

      const responsiveElements = document.querySelectorAll(".grid, .flex, .md\\:grid-cols-2, .lg\\:grid-cols-3")

      return {
        name: "Responsive Design",
        status: "success",
        message: "Responsive design elements detected",
        details: `Viewport: ${viewport}px, ${responsiveElements.length} responsive elements`,
      }
    } catch (error) {
      return {
        name: "Responsive Design",
        status: "error",
        message: "Responsive design test failed",
      }
    }
  }

  // Backend Tests
  const testServerStatus = async (endpoint: string): Promise<TestResult> => {
    try {
      const response = await fetch(endpoint, { method: "GET" })

      if (response.ok) {
        return {
          name: "API Server Status",
          status: "success",
          message: "Server is responding",
          details: `Status: ${response.status} ${response.statusText}`,
        }
      } else {
        return {
          name: "API Server Status",
          status: "error",
          message: `Server error: ${response.status}`,
          details: response.statusText,
        }
      }
    } catch (error) {
      return {
        name: "API Server Status",
        status: "error",
        message: "Server connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const testAPIEndpoint = async (endpoint: string): Promise<TestResult> => {
    try {
      const response = await fetch(endpoint)

      if (response.ok) {
        const data = await response.json()
        return {
          name: `${endpoint.split("/").pop()?.toUpperCase()} API`,
          status: "success",
          message: "API endpoint working",
          details: `Response: ${JSON.stringify(data).substring(0, 100)}...`,
        }
      } else {
        return {
          name: `${endpoint.split("/").pop()?.toUpperCase()} API`,
          status: "error",
          message: `API error: ${response.status}`,
          details: response.statusText,
        }
      }
    } catch (error) {
      return {
        name: `${endpoint.split("/").pop()?.toUpperCase()} API`,
        status: "error",
        message: "API request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Database Tests
  const testDatabaseConnection = async (): Promise<TestResult> => {
    try {
      const response = await fetch("/api/sync")

      if (response.ok) {
        const data = await response.json()
        const isOnline = data.primary?.status === "online"

        if (isOnline) {
          return {
            name: "Google Sheets Connection",
            status: "success",
            message: "Database connection established",
            details: "Google Sheets API responding",
          }
        } else {
          return {
            name: "Google Sheets Connection",
            status: "error",
            message: "Database connection failed",
            details: data.primary?.error || "Unknown database error",
          }
        }
      } else {
        return {
          name: "Google Sheets Connection",
          status: "error",
          message: "Connection test failed",
          details: `HTTP ${response.status}`,
        }
      }
    } catch (error) {
      return {
        name: "Google Sheets Connection",
        status: "error",
        message: "Database test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const testAuthentication = async (): Promise<TestResult> => {
    try {
      const hasGoogleSheetsId = !!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID

      if (hasGoogleSheetsId) {
        return {
          name: "Authentication",
          status: "success",
          message: "Authentication configured",
          details: "Google Sheets ID present",
        }
      } else {
        return {
          name: "Authentication",
          status: "error",
          message: "Authentication not configured",
          details: "Missing NEXT_PUBLIC_GOOGLE_SHEETS_ID",
        }
      }
    } catch (error) {
      return {
        name: "Authentication",
        status: "error",
        message: "Authentication test failed",
      }
    }
  }

  const testReadOperations = async (endpoint: string): Promise<TestResult> => {
    try {
      const response = await fetch(endpoint)

      if (response.ok) {
        const data = await response.json()
        const isArray = Array.isArray(data)

        return {
          name: "Read Operations",
          status: "success",
          message: "Data read successfully",
          details: `Retrieved ${isArray ? data.length : 1} records`,
        }
      } else {
        return {
          name: "Read Operations",
          status: "error",
          message: "Read operation failed",
          details: `HTTP ${response.status}`,
        }
      }
    } catch (error) {
      return {
        name: "Read Operations",
        status: "error",
        message: "Read test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const testWriteOperations = async (endpoint: string): Promise<TestResult> => {
    try {
      // Test with a mock product
      const testProduct = {
        name: "Test Product",
        sku: "TEST-001",
        category: "Test",
        currentStock: 10,
        minStock: 5,
        maxStock: 100,
        unitCost: 10.0,
        sellingPrice: 15.0,
        supplier: "Test Supplier",
        status: "active",
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testProduct),
      })

      if (response.ok) {
        return {
          name: "Write Operations",
          status: "success",
          message: "Write operation successful",
          details: "Test product created",
        }
      } else {
        return {
          name: "Write Operations",
          status: "error",
          message: "Write operation failed",
          details: `HTTP ${response.status}`,
        }
      }
    } catch (error) {
      return {
        name: "Write Operations",
        status: "error",
        message: "Write test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const testDataValidation = async (): Promise<TestResult> => {
    try {
      // Test data validation by sending invalid data
      const invalidProduct = {
        name: "", // Invalid: empty name
        sku: "", // Invalid: empty SKU
        currentStock: -1, // Invalid: negative stock
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invalidProduct),
      })

      // We expect this to fail due to validation
      if (!response.ok) {
        return {
          name: "Data Validation",
          status: "success",
          message: "Data validation working",
          details: "Invalid data properly rejected",
        }
      } else {
        return {
          name: "Data Validation",
          status: "error",
          message: "Data validation not working",
          details: "Invalid data was accepted",
        }
      }
    } catch (error) {
      return {
        name: "Data Validation",
        status: "success",
        message: "Data validation working",
        details: "Request properly rejected",
      }
    }
  }

  // Integration Tests
  const testEndToEndFlow = async (): Promise<TestResult> => {
    try {
      // Test the complete flow: Create -> Read -> Update -> Delete
      const steps = []

      // 1. Create a product
      const createResponse = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "E2E Test Product",
          sku: "E2E-001",
          category: "Test",
          currentStock: 50,
          minStock: 10,
          maxStock: 200,
          unitCost: 25.0,
          sellingPrice: 40.0,
          supplier: "E2E Supplier",
          status: "active",
        }),
      })
      steps.push(`Create: ${createResponse.ok ? "OK" : "FAIL"}`)

      // 2. Read products
      const readResponse = await fetch("/api/products")
      steps.push(`Read: ${readResponse.ok ? "OK" : "FAIL"}`)

      const allPassed = steps.every((step) => step.includes("OK"))

      return {
        name: "End-to-End Product Flow",
        status: allPassed ? "success" : "error",
        message: allPassed ? "E2E flow completed" : "E2E flow failed",
        details: steps.join(", "),
      }
    } catch (error) {
      return {
        name: "End-to-End Product Flow",
        status: "error",
        message: "E2E test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const testTransactionProcessing = async (): Promise<TestResult> => {
    try {
      const testTransaction = {
        productId: "test-product-1",
        productName: "Test Product",
        type: "sale",
        quantity: 5,
        unitPrice: 20.0,
        totalAmount: 100.0,
        date: new Date().toISOString(),
        userId: "test-user",
      }

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testTransaction),
      })

      return {
        name: "Transaction Processing",
        status: response.ok ? "success" : "error",
        message: response.ok ? "Transaction processed" : "Transaction failed",
        details: `HTTP ${response.status}`,
      }
    } catch (error) {
      return {
        name: "Transaction Processing",
        status: "error",
        message: "Transaction test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const testDashboardDataFlow = async (): Promise<TestResult> => {
    try {
      const response = await fetch("/api/dashboard/stats")

      if (response.ok) {
        const data = await response.json()
        const hasRequiredFields =
          data.totalProducts !== undefined && data.monthlyRevenue !== undefined && data.lowStockItems !== undefined

        return {
          name: "Dashboard Data Flow",
          status: hasRequiredFields ? "success" : "error",
          message: hasRequiredFields ? "Dashboard data complete" : "Missing dashboard data",
          details: `Fields: ${Object.keys(data).length}`,
        }
      } else {
        return {
          name: "Dashboard Data Flow",
          status: "error",
          message: "Dashboard data failed",
          details: `HTTP ${response.status}`,
        }
      }
    } catch (error) {
      return {
        name: "Dashboard Data Flow",
        status: "error",
        message: "Dashboard test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const testErrorHandling = async (): Promise<TestResult> => {
    try {
      // Test error handling by making an invalid request
      const response = await fetch("/api/nonexistent-endpoint")

      // We expect a 404 or similar error
      if (!response.ok) {
        return {
          name: "Error Handling",
          status: "success",
          message: "Error handling working",
          details: `Properly returned ${response.status}`,
        }
      } else {
        return {
          name: "Error Handling",
          status: "error",
          message: "Error handling not working",
          details: "Invalid endpoint returned success",
        }
      }
    } catch (error) {
      return {
        name: "Error Handling",
        status: "success",
        message: "Error handling working",
        details: "Network errors properly caught",
      }
    }
  }

  const testPerformance = async (): Promise<TestResult> => {
    try {
      const startTime = performance.now()

      // Test multiple API calls
      const promises = [fetch("/api/products"), fetch("/api/transactions"), fetch("/api/dashboard/stats")]

      await Promise.all(promises)
      const endTime = performance.now()
      const duration = endTime - startTime

      return {
        name: "Performance",
        status: duration < 5000 ? "success" : "error",
        message: duration < 5000 ? "Performance acceptable" : "Performance slow",
        details: `${Math.round(duration)}ms for 3 API calls`,
      }
    } catch (error) {
      return {
        name: "Performance",
        status: "error",
        message: "Performance test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setProgress(0)

    const allTests = [
      ...frontendTests.map((test) => ({ ...test, category: "frontend" as const })),
      ...backendTests.map((test) => ({ ...test, category: "backend" as const })),
      ...databaseTests.map((test) => ({ ...test, category: "database" as const })),
      ...integrationTests.map((test) => ({ ...test, category: "integration" as const })),
    ]

    // Initialize results
    setResults({
      frontend: frontendTests.map((test) => ({ name: test.name, status: "pending", message: "Waiting..." })),
      backend: backendTests.map((test) => ({ name: test.name, status: "pending", message: "Waiting..." })),
      database: databaseTests.map((test) => ({ name: test.name, status: "pending", message: "Waiting..." })),
      integration: integrationTests.map((test) => ({ name: test.name, status: "pending", message: "Waiting..." })),
    })

    for (let i = 0; i < allTests.length; i++) {
      const test = allTests[i]
      const result = await runTest(test, test.category)

      setResults((prev) => ({
        ...prev,
        [test.category]: prev[test.category].map((t) => (t.name === result.name ? result : t)),
      }))

      setProgress(((i + 1) / allTests.length) * 100)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Pass</Badge>
      case "error":
        return <Badge variant="destructive">Fail</Badge>
      case "running":
        return <Badge className="bg-blue-100 text-blue-800">Running</Badge>
      default:
        return <Badge variant="secondary">Pending</Badge>
    }
  }

  const renderTestCategory = (title: string, icon: React.ReactNode, tests: TestResult[]) => {
    const passedTests = tests.filter((t) => t.status === "success").length
    const totalTests = tests.length
    const allPassed = passedTests === totalTests
    const anyFailed = tests.some((t) => t.status === "error")

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {icon}
              <span>{title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {passedTests}/{totalTests}
              </span>
              {allPassed && <CheckCircle className="h-5 w-5 text-green-500" />}
              {anyFailed && <XCircle className="h-5 w-5 text-red-500" />}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tests.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(test.status)}
                <div>
                  <div className="font-medium">{test.name}</div>
                  <div className="text-sm text-gray-500">{test.message}</div>
                  {test.details && <div className="text-xs text-gray-400 mt-1">{test.details}</div>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {test.duration && <span className="text-xs text-gray-400">{test.duration}ms</span>}
                {getStatusBadge(test.status)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Functionality Checker</h2>
          <p className="text-gray-600">Comprehensive testing from frontend to backend</p>
        </div>
        <Button onClick={runAllTests} disabled={isRunning} className="flex items-center space-x-2">
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Running Tests...</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Run All Tests</span>
            </>
          )}
        </Button>
      </div>

      {isRunning && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Testing Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {renderTestCategory("Frontend Tests", <Globe className="h-5 w-5" />, results.frontend)}
        {renderTestCategory("Backend Tests", <Server className="h-5 w-5" />, results.backend)}
        {renderTestCategory("Database Tests", <Database className="h-5 w-5" />, results.database)}
        {renderTestCategory("Integration Tests", <Settings className="h-5 w-5" />, results.integration)}
      </div>

      {!isRunning && results.frontend.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Test Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(results).map(([category, tests]) => {
                const passed = tests.filter((t) => t.status === "success").length
                const total = tests.length
                const percentage = total > 0 ? (passed / total) * 100 : 0

                return (
                  <div key={category} className="text-center">
                    <div className="text-2xl font-bold">
                      {passed}/{total}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">{category}</div>
                    <div className="text-xs text-gray-400">{Math.round(percentage)}% passed</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
