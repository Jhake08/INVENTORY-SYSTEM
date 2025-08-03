import { createClient } from "@supabase/supabase-js"
import type { Product, Transaction, CashflowEntry, AuditLog } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

class SupabaseService {
  private supabase

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  // Products Operations
  async getProducts(): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("lastUpdated", { ascending: false })

    if (error) throw error
    return data || []
  }

  async addProduct(product: Product): Promise<void> {
    const { error } = await this.supabase.from("products").insert([product])
    if (error) throw error
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const { error } = await this.supabase
      .from("products")
      .update({ ...updates, lastUpdated: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error
  }

  async deleteProduct(id: string): Promise<void> {
    const { error } = await this.supabase.from("products").update({ status: "inactive" }).eq("id", id)

    if (error) throw error
  }

  async syncProducts(products: Product[]): Promise<void> {
    // Upsert products (insert or update)
    const { error } = await this.supabase.from("products").upsert(products, { onConflict: "id" })

    if (error) throw error
  }

  // Transactions Operations
  async getTransactions(): Promise<Transaction[]> {
    const { data, error } = await this.supabase.from("transactions").select("*").order("date", { ascending: false })

    if (error) throw error
    return data || []
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    const { error } = await this.supabase.from("transactions").insert([transaction])
    if (error) throw error
  }

  async syncTransactions(transactions: Transaction[]): Promise<void> {
    const { error } = await this.supabase.from("transactions").upsert(transactions, { onConflict: "id" })

    if (error) throw error
  }

  // Cashflow Operations
  async getCashflowEntries(): Promise<CashflowEntry[]> {
    const { data, error } = await this.supabase.from("cashflow").select("*").order("date", { ascending: false })

    if (error) throw error
    return data || []
  }

  async addCashflowEntry(entry: CashflowEntry): Promise<void> {
    const { error } = await this.supabase.from("cashflow").insert([entry])
    if (error) throw error
  }

  async syncCashflow(entries: CashflowEntry[]): Promise<void> {
    const { error } = await this.supabase.from("cashflow").upsert(entries, { onConflict: "id" })

    if (error) throw error
  }

  // Audit Operations
  async logAudit(log: AuditLog): Promise<void> {
    const { error } = await this.supabase.from("audit_logs").insert([log])
    if (error) throw error
  }

  // Backup Status
  async getBackupStatus(): Promise<{
    lastSync: string | null
    recordCounts: {
      products: number
      transactions: number
      cashflow: number
      auditLogs: number
    }
  }> {
    const [products, transactions, cashflow, auditLogs] = await Promise.all([
      this.supabase.from("products").select("id", { count: "exact", head: true }),
      this.supabase.from("transactions").select("id", { count: "exact", head: true }),
      this.supabase.from("cashflow").select("id", { count: "exact", head: true }),
      this.supabase.from("audit_logs").select("id", { count: "exact", head: true }),
    ])

    // Get last sync timestamp from a sync_status table
    const { data: syncData } = await this.supabase.from("sync_status").select("last_sync").single()

    return {
      lastSync: syncData?.last_sync || null,
      recordCounts: {
        products: products.count || 0,
        transactions: transactions.count || 0,
        cashflow: cashflow.count || 0,
        auditLogs: auditLogs.count || 0,
      },
    }
  }

  async updateSyncStatus(): Promise<void> {
    const { error } = await this.supabase.from("sync_status").upsert([{ id: 1, last_sync: new Date().toISOString() }])

    if (error) throw error
  }
}

export const supabaseService = new SupabaseService()
