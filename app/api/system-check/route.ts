import { NextResponse } from "next/server"
import { googleSheetsService } from "@/lib/google-sheets"
import { databaseManager } from "@/lib/database-manager"

export async function GET() {
  try {
    const results = {
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasGoogleSheetsId: !!process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID,
        hasServiceAccount: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      },
      database: {
        status: "unknown",
        error: null,
        responseTime: 0,
      },
      apis: {
        products: { status: "unknown", responseTime: 0 },
        transactions: { status: "unknown", responseTime: 0 },
        dashboardStats: { status: "unknown", responseTime: 0 },
        cashflow: { status: "unknown", responseTime: 0 },
      },
    }

    // Test database connection
    const dbStartTime = Date.now()
    try {
      const health = await databaseManager.checkDatabaseHealth()
      results.database.status = health.googleSheets.status
      results.database.error = health.googleSheets.error || null
      results.database.responseTime = Date.now() - dbStartTime
    } catch (error) {
      results.database.status = "error"
      results.database.error = error instanceof Error ? error.message : "Unknown error"
      results.database.responseTime = Date.now() - dbStartTime
    }

    // Test API endpoints
    const apiTests = [
      { name: "products", fn: () => googleSheetsService.getProducts() },
      { name: "transactions", fn: () => googleSheetsService.getTransactions() },
      { name: "cashflow", fn: () => googleSheetsService.getCashflowEntries() },
    ]

    for (const test of apiTests) {
      const startTime = Date.now()
      try {
        await test.fn()
        results.apis[test.name as keyof typeof results.apis] = {
          status: "success",
          responseTime: Date.now() - startTime,
        }
      } catch (error) {
        results.apis[test.name as keyof typeof results.apis] = {
          status: "error",
          responseTime: Date.now() - startTime,
          error: error instanceof Error ? error.message : "Unknown error",
        }
      }
    }

    // Test dashboard stats separately
    const dashboardStartTime = Date.now()
    try {
      const [products, transactions, cashflow] = await Promise.all([
        googleSheetsService.getProducts(),
        googleSheetsService.getTransactions(),
        googleSheetsService.getCashflowEntries(),
      ])

      const activeProducts = products.filter((p) => p.status === "active")
      const lowStockItems = activeProducts.filter((p) => p.currentStock <= p.minStock)
      const totalValue = activeProducts.reduce((sum, p) => sum + p.currentStock * p.unitCost, 0)

      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()

      const monthlyIncome = cashflow
        .filter((c) => {
          const date = new Date(c.date)
          return c.type === "income" && date.getMonth() === currentMonth && date.getFullYear() === currentYear
        })
        .reduce((sum, c) => sum + c.amount, 0)

      const monthlyExpenses = cashflow
        .filter((c) => {
          const date = new Date(c.date)
          return c.type === "expense" && date.getMonth() === currentMonth && date.getFullYear() === currentYear
        })
        .reduce((sum, c) => sum + c.amount, 0)

      results.apis.dashboardStats = {
        status: "success",
        responseTime: Date.now() - dashboardStartTime,
        data: {
          totalProducts: activeProducts.length,
          lowStockItems: lowStockItems.length,
          totalValue,
          monthlyRevenue: monthlyIncome,
          monthlyExpenses,
          netProfit: monthlyIncome - monthlyExpenses,
        },
      }
    } catch (error) {
      results.apis.dashboardStats = {
        status: "error",
        responseTime: Date.now() - dashboardStartTime,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("System check failed:", error)
    return NextResponse.json(
      {
        error: "System check failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    // Run a comprehensive test including write operations
    const testResults = {
      timestamp: new Date().toISOString(),
      tests: {
        createProduct: { status: "unknown", duration: 0 },
        readProducts: { status: "unknown", duration: 0 },
        createTransaction: { status: "unknown", duration: 0 },
        readTransactions: { status: "unknown", duration: 0 },
        dataIntegrity: { status: "unknown", duration: 0 },
      },
    }

    // Test 1: Create a test product
    const createStartTime = Date.now()
    try {
      await googleSheetsService.addProduct({
        name: "System Test Product",
        sku: "SYS-TEST-001",
        category: "Test",
        currentStock: 100,
        minStock: 10,
        maxStock: 500,
        unitCost: 15.0,
        sellingPrice: 25.0,
        supplier: "System Test Supplier",
        status: "active",
      })
      testResults.tests.createProduct = {
        status: "success",
        duration: Date.now() - createStartTime,
      }
    } catch (error) {
      testResults.tests.createProduct = {
        status: "error",
        duration: Date.now() - createStartTime,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Test 2: Read products
    const readStartTime = Date.now()
    try {
      const products = await googleSheetsService.getProducts()
      testResults.tests.readProducts = {
        status: "success",
        duration: Date.now() - readStartTime,
        count: products.length,
      }
    } catch (error) {
      testResults.tests.readProducts = {
        status: "error",
        duration: Date.now() - readStartTime,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Test 3: Create a test transaction
    const transactionStartTime = Date.now()
    try {
      await googleSheetsService.addTransaction({
        productId: "sys-test-product",
        productName: "System Test Product",
        type: "sale",
        quantity: 5,
        unitPrice: 25.0,
        totalAmount: 125.0,
        date: new Date().toISOString(),
        userId: "system-test",
      })
      testResults.tests.createTransaction = {
        status: "success",
        duration: Date.now() - transactionStartTime,
      }
    } catch (error) {
      testResults.tests.createTransaction = {
        status: "error",
        duration: Date.now() - transactionStartTime,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Test 4: Read transactions
    const readTransStartTime = Date.now()
    try {
      const transactions = await googleSheetsService.getTransactions()
      testResults.tests.readTransactions = {
        status: "success",
        duration: Date.now() - readTransStartTime,
        count: transactions.length,
      }
    } catch (error) {
      testResults.tests.readTransactions = {
        status: "error",
        duration: Date.now() - readTransStartTime,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    // Test 5: Data integrity check
    const integrityStartTime = Date.now()
    try {
      const [products, transactions, cashflow] = await Promise.all([
        googleSheetsService.getProducts(),
        googleSheetsService.getTransactions(),
        googleSheetsService.getCashflowEntries(),
      ])

      const hasProducts = products.length > 0
      const hasValidProducts = products.every((p) => p.name && p.sku)
      const hasTransactions = transactions.length >= 0 // Can be 0
      const hasCashflow = cashflow.length >= 0 // Can be 0

      testResults.tests.dataIntegrity = {
        status: hasProducts && hasValidProducts ? "success" : "warning",
        duration: Date.now() - integrityStartTime,
        details: {
          productsCount: products.length,
          transactionsCount: transactions.length,
          cashflowCount: cashflow.length,
          hasValidProducts,
        },
      }
    } catch (error) {
      testResults.tests.dataIntegrity = {
        status: "error",
        duration: Date.now() - integrityStartTime,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }

    return NextResponse.json(testResults)
  } catch (error) {
    console.error("Comprehensive test failed:", error)
    return NextResponse.json(
      {
        error: "Comprehensive test failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
