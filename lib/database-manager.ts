import { googleSheetsService } from "./google-sheets"
import type { Product, Transaction, CashflowEntry, AuditLog } from "./types"

export class DatabaseManager {
  private static instance: DatabaseManager

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager()
    }
    return DatabaseManager.instance
  }

  // Products Operations
  async getProducts(): Promise<Product[]> {
    try {
      console.log("📊 Fetching products from Google Sheets")
      const products = await googleSheetsService.getProducts()
      return products
    } catch (error) {
      console.error("❌ Google Sheets failed:", error)
      return []
    }
  }

  async addProduct(product: Omit<Product, "id">): Promise<void> {
    try {
      console.log("📊 Adding product to Google Sheets")
      await googleSheetsService.addProduct(product)
      console.log("✅ Product added to Google Sheets")
    } catch (error) {
      console.error("❌ Failed to add product to Google Sheets:", error)
      throw error
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    try {
      console.log("📊 Updating product in Google Sheets")
      await googleSheetsService.updateProduct(id, updates)
      console.log("✅ Product updated in Google Sheets")
    } catch (error) {
      console.error("❌ Failed to update product in Google Sheets:", error)
      throw error
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      console.log("📊 Deleting product from Google Sheets")
      await googleSheetsService.deleteProduct(id)
      console.log("✅ Product deleted from Google Sheets")
    } catch (error) {
      console.error("❌ Failed to delete product from Google Sheets:", error)
      throw error
    }
  }

  // Transactions Operations
  async getTransactions(): Promise<Transaction[]> {
    try {
      console.log("📊 Fetching transactions from Google Sheets")
      const transactions = await googleSheetsService.getTransactions()
      return transactions
    } catch (error) {
      console.error("❌ Google Sheets failed:", error)
      return []
    }
  }

  async addTransaction(transaction: Omit<Transaction, "id">): Promise<void> {
    try {
      console.log("📊 Adding transaction to Google Sheets")
      await googleSheetsService.addTransaction(transaction)
      console.log("✅ Transaction added to Google Sheets")
    } catch (error) {
      console.error("❌ Failed to add transaction to Google Sheets:", error)
      throw error
    }
  }

  // Cashflow Operations
  async getCashflowEntries(): Promise<CashflowEntry[]> {
    try {
      console.log("📊 Fetching cashflow from Google Sheets")
      const cashflow = await googleSheetsService.getCashflowEntries()
      return cashflow
    } catch (error) {
      console.error("❌ Google Sheets failed:", error)
      return []
    }
  }

  async addCashflowEntry(entry: Omit<CashflowEntry, "id">): Promise<void> {
    try {
      console.log("📊 Adding cashflow entry to Google Sheets")
      await googleSheetsService.addCashflowEntry(entry)
      console.log("✅ Cashflow entry added to Google Sheets")
    } catch (error) {
      console.error("❌ Failed to add cashflow entry to Google Sheets:", error)
      throw error
    }
  }

  // Audit Logging
  async logAudit(log: Omit<AuditLog, "id">): Promise<void> {
    try {
      console.log("📊 Logging audit to Google Sheets")
      await googleSheetsService.logAudit(log)
      console.log("✅ Audit logged to Google Sheets")
    } catch (error) {
      console.error("❌ Failed to log audit to Google Sheets:", error)
      throw error
    }
  }

  // Health Check
  async checkDatabaseHealth(): Promise<{
    googleSheets: { status: "online" | "offline"; error?: string }
  }> {
    const health = {
      googleSheets: { status: "offline" as const, error: undefined as string | undefined },
    }

    // Check Google Sheets
    try {
      await googleSheetsService.getProducts()
      health.googleSheets.status = "online"
    } catch (error) {
      health.googleSheets.error = error instanceof Error ? error.message : "Unknown error"
    }

    return health
  }

  // Data Export for Backup
  async exportAllData(): Promise<{
    products: Product[]
    transactions: Transaction[]
    cashflow: CashflowEntry[]
    exportDate: string
  }> {
    try {
      console.log("📊 Exporting all data from Google Sheets")
      const [products, transactions, cashflow] = await Promise.all([
        this.getProducts(),
        this.getTransactions(),
        this.getCashflowEntries(),
      ])

      return {
        products,
        transactions,
        cashflow,
        exportDate: new Date().toISOString(),
      }
    } catch (error) {
      console.error("❌ Failed to export data:", error)
      throw error
    }
  }
}

export const databaseManager = DatabaseManager.getInstance()
