import { settingsManager } from "./settings"
import type { Product, Transaction, DashboardStats } from "./types"

class APIService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api"
  }

  // Products API
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products`)
      if (!response.ok) throw new Error("Failed to fetch products")
      return await response.json()
    } catch (error) {
      console.error("Error fetching products:", error)
      return this.getMockProducts()
    }
  }

  async addProduct(product: Omit<Product, "id">): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (!response.ok) throw new Error("Failed to add product")
    } catch (error) {
      console.error("Error adding product:", error)
      throw error
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error("Failed to update product")
    } catch (error) {
      console.error("Error updating product:", error)
      throw error
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete product")
    } catch (error) {
      console.error("Error deleting product:", error)
      throw error
    }
  }

  // Transactions API
  async getTransactions(): Promise<Transaction[]> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions`)
      if (!response.ok) throw new Error("Failed to fetch transactions")
      return await response.json()
    } catch (error) {
      console.error("Error fetching transactions:", error)
      return this.getMockTransactions()
    }
  }

  async addTransaction(transaction: Omit<Transaction, "id">): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      })
      if (!response.ok) throw new Error("Failed to add transaction")
    } catch (error) {
      console.error("Error adding transaction:", error)
      throw error
    }
  }

  // Dashboard Stats API
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await fetch(`${this.baseUrl}/dashboard/stats`)
      if (!response.ok) throw new Error("Failed to fetch dashboard stats")
      return await response.json()
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      return this.getMockDashboardStats()
    }
  }

  // Low Stock Alerts API
  async getLowStockAlerts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/alerts/low-stock`)
      if (!response.ok) throw new Error("Failed to fetch low stock alerts")
      return await response.json()
    } catch (error) {
      console.error("Error fetching low stock alerts:", error)
      return this.getMockLowStockItems()
    }
  }

  // Mock data methods for fallback
  private getMockProducts(): Product[] {
    return [
      {
        id: "1",
        name: "iPhone 15 Pro Max",
        sku: "IP15PM-256",
        category: "Mobile Phones",
        currentStock: 25,
        minStock: 10,
        maxStock: 100,
        unitCost: 75000,
        sellingPrice: 89900,
        supplier: "Apple Philippines",
        lastUpdated: new Date().toISOString(),
        status: "active",
      },
      {
        id: "2",
        name: "Samsung Galaxy S24 Ultra",
        sku: "SGS24U-512",
        category: "Mobile Phones",
        currentStock: 15,
        minStock: 8,
        maxStock: 80,
        unitCost: 65000,
        sellingPrice: 79900,
        supplier: "Samsung Philippines",
        lastUpdated: new Date().toISOString(),
        status: "active",
      },
      {
        id: "3",
        name: "MacBook Air M3",
        sku: "MBA-M3-13",
        category: "Laptops",
        currentStock: 8,
        minStock: 5,
        maxStock: 50,
        unitCost: 68000,
        sellingPrice: 79990,
        supplier: "Apple Philippines",
        lastUpdated: new Date().toISOString(),
        status: "active",
      },
    ]
  }

  private getMockTransactions(): Transaction[] {
    return [
      {
        id: "T001",
        productId: "1",
        productName: "iPhone 15 Pro Max",
        type: "sale",
        quantity: 2,
        unitPrice: 89900,
        totalAmount: 179800,
        date: new Date().toISOString(),
        userId: "user1",
      },
      {
        id: "T002",
        productId: "2",
        productName: "Samsung Galaxy S24 Ultra",
        type: "purchase",
        quantity: 10,
        unitPrice: 65000,
        totalAmount: 650000,
        date: new Date(Date.now() - 86400000).toISOString(),
        userId: "user1",
      },
    ]
  }

  private getMockDashboardStats(): DashboardStats {
    return {
      totalProducts: 156,
      lowStockItems: 8,
      totalValue: 2234567.5,
      monthlyRevenue: 567890.25,
      monthlyExpenses: 345678.75,
      netProfit: 222211.5,
    }
  }

  private getMockLowStockItems(): Product[] {
    return [
      {
        id: "3",
        name: "MacBook Air M3",
        sku: "MBA-M3-13",
        category: "Laptops",
        currentStock: 3,
        minStock: 5,
        maxStock: 50,
        unitCost: 68000,
        sellingPrice: 79990,
        supplier: "Apple Philippines",
        lastUpdated: new Date().toISOString(),
        status: "active",
      },
    ]
  }

  // Notification methods
  async sendLowStockAlert(product: Product): Promise<void> {
    const settings = settingsManager.getSettings()

    if (settings.emailNotifications && settings.apiIntegrations.email.enabled) {
      await this.sendEmailNotification(
        `Low Stock Alert: ${product.name}`,
        `Product ${product.name} (${product.sku}) is running low. Current stock: ${product.currentStock}, Minimum: ${product.minStock}`,
      )
    }

    if (settings.smsNotifications && settings.apiIntegrations.sms.enabled) {
      await this.sendSMSNotification(`LOW STOCK: ${product.name} - Only ${product.currentStock} left!`)
    }
  }

  private async sendEmailNotification(subject: string, message: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      })
      if (!response.ok) throw new Error("Failed to send email")
    } catch (error) {
      console.error("Error sending email notification:", error)
    }
  }

  private async sendSMSNotification(message: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })
      if (!response.ok) throw new Error("Failed to send SMS")
    } catch (error) {
      console.error("Error sending SMS notification:", error)
    }
  }
}

export const apiService = new APIService()
