export interface Product {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unitCost: number
  sellingPrice: number
  supplier: string
  lastUpdated: string
  status: "active" | "inactive"
}

export interface Transaction {
  id: string
  productId: string
  productName: string
  type: "purchase" | "sale" | "adjustment"
  quantity: number
  unitPrice: number
  totalAmount: number
  date: string
  notes?: string
  userId: string
}

export interface CashflowEntry {
  id: string
  date: string
  type: "income" | "expense"
  amount: number
  description: string
  category: string
  transactionId?: string
}

export interface AuditLog {
  id: string
  userId: string
  action: string
  entityType: "product" | "transaction" | "cashflow"
  entityId: string
  changes: Record<string, any>
  timestamp: string
}

export interface DashboardStats {
  totalProducts: number
  lowStockItems: number
  totalValue: number
  monthlyRevenue: number
  monthlyExpenses: number
  netProfit: number
}
