"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, RotateCcw } from "lucide-react"
import { formatCurrency } from "@/lib/currency"
import { settingsManager } from "@/lib/settings"
import type { Transaction } from "@/lib/types"

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/transactions")
      if (!response.ok) {
        throw new Error("Failed to fetch transactions")
      }
      const data = await response.json()
      // Get only the 5 most recent transactions
      setTransactions(data.slice(0, 5))
      setError(null)
    } catch (err) {
      console.error("Error fetching transactions:", err)
      setError("Failed to load transactions")
      // Fallback to mock data
      setTransactions([
        {
          id: "1",
          productId: "1",
          productName: "iPhone 14 Pro",
          type: "sale",
          quantity: 2,
          unitPrice: 2198.0,
          totalAmount: 4396.0,
          date: new Date().toISOString(),
          userId: "system",
        },
        {
          id: "2",
          productId: "2",
          productName: "MacBook Air M2",
          type: "purchase",
          quantity: 10,
          unitPrice: 1199.0,
          totalAmount: 11990.0,
          date: new Date(Date.now() - 86400000).toISOString(),
          userId: "system",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const currency = settingsManager.getCurrency()

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "purchase":
        return <ArrowDownRight className="h-4 w-4 text-blue-500" />
      case "adjustment":
        return <RotateCcw className="h-4 w-4 text-orange-500" />
      default:
        return null
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "sale":
        return "bg-green-100 text-green-800"
      case "purchase":
        return "bg-blue-100 text-blue-800"
      case "adjustment":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-6 bg-gray-300 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-red-600 mb-2">{error}</p>
            <button onClick={fetchTransactions} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Retry
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No recent transactions</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">{transaction.productName}</p>
                    <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getTransactionColor(transaction.type)}>{transaction.type}</Badge>
                  <p className="text-sm font-medium mt-1">{formatCurrency(transaction.totalAmount, currency)}</p>
                  <p className="text-xs text-muted-foreground">Qty: {Math.abs(transaction.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
