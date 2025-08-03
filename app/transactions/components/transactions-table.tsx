"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpRight, ArrowDownRight, RotateCcw } from "lucide-react"
import type { Transaction } from "@/lib/types"

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  useEffect(() => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTransactions(filtered)
  }, [transactions, searchTerm])

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/transactions")
      const data = await response.json()
      setTransactions(
        data.sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      )
    } catch (error) {
      console.error("Error fetching transactions:", error)
    } finally {
      setLoading(false)
    }
  }

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
    return <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-left p-2">Unit Price</th>
                <th className="text-left p-2">Total Amount</th>
                <th className="text-left p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      {transaction.productName}
                    </div>
                  </td>
                  <td className="p-2">
                    <Badge className={getTransactionColor(transaction.type)}>{transaction.type}</Badge>
                  </td>
                  <td className="p-2">{transaction.quantity}</td>
                  <td className="p-2">${transaction.unitPrice.toFixed(2)}</td>
                  <td className="p-2 font-medium">${transaction.totalAmount.toFixed(2)}</td>
                  <td className="p-2 text-sm text-muted-foreground">{transaction.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
