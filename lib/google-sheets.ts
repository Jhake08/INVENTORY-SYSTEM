import { google } from "googleapis"
import type { Product, Transaction, CashflowEntry, AuditLog } from "./types"

class GoogleSheetsService {
  private sheets
  private spreadsheetId: string

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    this.sheets = google.sheets({ version: "v4", auth })
    this.spreadsheetId = process.env.GOOGLE_SHEETS_ID!
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "Products!A2:L1000",
      })

      const rows = response.data.values || []
      return rows.map((row, index) => ({
        id: row[0] || `product_${index}`,
        name: row[1] || "",
        sku: row[2] || "",
        category: row[3] || "",
        currentStock: Number.parseInt(row[4]) || 0,
        minStock: Number.parseInt(row[5]) || 0,
        maxStock: Number.parseInt(row[6]) || 0,
        unitCost: Number.parseFloat(row[7]) || 0,
        sellingPrice: Number.parseFloat(row[8]) || 0,
        supplier: row[9] || "",
        lastUpdated: row[10] || new Date().toISOString(),
        status: (row[11] as "active" | "inactive") || "active",
      }))
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  }

  async addProduct(product: Omit<Product, "id">): Promise<void> {
    const id = `product_${Date.now()}`
    const values = [
      [
        id,
        product.name,
        product.sku,
        product.category,
        product.currentStock,
        product.minStock,
        product.maxStock,
        product.unitCost,
        product.sellingPrice,
        product.supplier,
        new Date().toISOString(),
        product.status,
      ],
    ]

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "Products!A:L",
      valueInputOption: "RAW",
      requestBody: { values },
    })
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const products = await this.getProducts()
    const index = products.findIndex((p) => p.id === id)

    if (index === -1) throw new Error("Product not found")

    const updatedProduct = { ...products[index], ...product, lastUpdated: new Date().toISOString() }
    const values = [
      [
        updatedProduct.id,
        updatedProduct.name,
        updatedProduct.sku,
        updatedProduct.category,
        updatedProduct.currentStock,
        updatedProduct.minStock,
        updatedProduct.maxStock,
        updatedProduct.unitCost,
        updatedProduct.sellingPrice,
        updatedProduct.supplier,
        updatedProduct.lastUpdated,
        updatedProduct.status,
      ],
    ]

    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: `Products!A${index + 2}:L${index + 2}`,
      valueInputOption: "RAW",
      requestBody: { values },
    })
  }

  async deleteProduct(id: string): Promise<void> {
    await this.updateProduct(id, { status: "inactive" })
  }

  async getTransactions(): Promise<Transaction[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "Transactions!A2:I1000",
      })

      const rows = response.data.values || []
      return rows.map((row, index) => ({
        id: row[0] || `transaction_${index}`,
        productId: row[1] || "",
        productName: row[2] || "",
        type: (row[3] as "purchase" | "sale" | "adjustment") || "purchase",
        quantity: Number.parseInt(row[4]) || 0,
        unitPrice: Number.parseFloat(row[5]) || 0,
        totalAmount: Number.parseFloat(row[6]) || 0,
        date: row[7] || new Date().toISOString(),
        notes: row[8] || "",
        userId: "system",
      }))
    } catch (error) {
      console.error("Error fetching transactions:", error)
      return []
    }
  }

  async addTransaction(transaction: Omit<Transaction, "id">): Promise<void> {
    const id = `transaction_${Date.now()}`
    const values = [
      [
        id,
        transaction.productId,
        transaction.productName,
        transaction.type,
        transaction.quantity,
        transaction.unitPrice,
        transaction.totalAmount,
        transaction.date,
        transaction.notes || "",
      ],
    ]

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "Transactions!A:I",
      valueInputOption: "RAW",
      requestBody: { values },
    })

    // Update product stock
    if (transaction.type === "purchase") {
      const products = await this.getProducts()
      const product = products.find((p) => p.id === transaction.productId)
      if (product) {
        await this.updateProduct(transaction.productId, {
          currentStock: product.currentStock + transaction.quantity,
        })
      }
    } else if (transaction.type === "sale") {
      const products = await this.getProducts()
      const product = products.find((p) => p.id === transaction.productId)
      if (product) {
        await this.updateProduct(transaction.productId, {
          currentStock: Math.max(0, product.currentStock - transaction.quantity),
        })
      }
    }
  }

  async getCashflowEntries(): Promise<CashflowEntry[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: "Cashflow!A2:G1000",
      })

      const rows = response.data.values || []
      return rows.map((row, index) => ({
        id: row[0] || `cashflow_${index}`,
        date: row[1] || new Date().toISOString(),
        type: (row[2] as "income" | "expense") || "expense",
        amount: Number.parseFloat(row[3]) || 0,
        description: row[4] || "",
        category: row[5] || "",
        transactionId: row[6] || undefined,
      }))
    } catch (error) {
      console.error("Error fetching cashflow:", error)
      return []
    }
  }

  async addCashflowEntry(entry: Omit<CashflowEntry, "id">): Promise<void> {
    const id = `cashflow_${Date.now()}`
    const values = [
      [id, entry.date, entry.type, entry.amount, entry.description, entry.category, entry.transactionId || ""],
    ]

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "Cashflow!A:G",
      valueInputOption: "RAW",
      requestBody: { values },
    })
  }

  async logAudit(log: Omit<AuditLog, "id">): Promise<void> {
    const id = `audit_${Date.now()}`
    const values = [
      [id, log.userId, log.action, log.entityType, log.entityId, JSON.stringify(log.changes), log.timestamp],
    ]

    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: "AuditLogs!A:G",
      valueInputOption: "RAW",
      requestBody: { values },
    })
  }
}

export const googleSheetsService = new GoogleSheetsService()
