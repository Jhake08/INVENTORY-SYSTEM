"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Product } from "@/lib/types"

interface AddTransactionDialogProps {
  children: React.ReactNode
}

export default function AddTransactionDialog({ children }: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    productId: "",
    type: "purchase" as "purchase" | "sale" | "adjustment",
    quantity: 0,
    unitPrice: 0,
    notes: "",
  })

  useEffect(() => {
    if (open) {
      fetchProducts()
    }
  }, [open])

  useEffect(() => {
    if (formData.productId) {
      const product = products.find((p) => p.id === formData.productId)
      setSelectedProduct(product || null)
      if (product) {
        setFormData((prev) => ({
          ...prev,
          unitPrice: formData.type === "sale" ? product.sellingPrice : product.unitCost,
        }))
      }
    }
  }, [formData.productId, formData.type, products])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data.filter((p: Product) => p.status === "active"))
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    setLoading(true)

    try {
      const transaction = {
        productId: formData.productId,
        productName: selectedProduct.name,
        type: formData.type,
        quantity: formData.quantity,
        unitPrice: formData.unitPrice,
        totalAmount: formData.quantity * formData.unitPrice,
        date: new Date().toISOString(),
        notes: formData.notes,
        userId: "system",
      }

      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      })

      if (response.ok) {
        setOpen(false)
        setFormData({
          productId: "",
          type: "purchase",
          quantity: 0,
          unitPrice: 0,
          notes: "",
        })
        setSelectedProduct(null)
        // Refresh the page to show new transaction
        window.location.reload()
      }
    } catch (error) {
      console.error("Error adding transaction:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="product">Product</Label>
            <Select
              value={formData.productId}
              onValueChange={(value) => setFormData({ ...formData, productId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Transaction Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "purchase" | "sale" | "adjustment") => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="adjustment">Adjustment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            <div>
              <Label htmlFor="unitPrice">Unit Price</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: Number.parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          {selectedProduct && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Current Stock: {selectedProduct.currentStock}</p>
              <p className="text-sm text-muted-foreground">
                Total Amount: ${(formData.quantity * formData.unitPrice).toFixed(2)}
              </p>
            </div>
          )}

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional notes..."
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading || !selectedProduct}>
            {loading ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
