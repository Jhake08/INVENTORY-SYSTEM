"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Trash2, Search } from "lucide-react"
import type { Product } from "@/lib/types"

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }, [products, searchTerm])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data.filter((p: Product) => p.status === "active"))
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" })
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const getStockStatus = (product: Product) => {
    if (product.currentStock <= product.minStock) {
      return <Badge variant="destructive">Low Stock</Badge>
    } else if (product.currentStock >= product.maxStock) {
      return <Badge variant="secondary">Overstock</Badge>
    } else {
      return <Badge variant="default">In Stock</Badge>
    }
  }

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Inventory</CardTitle>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">SKU</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Stock</th>
                <th className="text-left p-2">Unit Cost</th>
                <th className="text-left p-2">Selling Price</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.supplier}</p>
                    </div>
                  </td>
                  <td className="p-2">{product.sku}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">
                    <div>
                      <p className="font-medium">{product.currentStock}</p>
                      <p className="text-xs text-muted-foreground">
                        Min: {product.minStock} | Max: {product.maxStock}
                      </p>
                    </div>
                  </td>
                  <td className="p-2">${product.unitCost.toFixed(2)}</td>
                  <td className="p-2">${product.sellingPrice.toFixed(2)}</td>
                  <td className="p-2">{getStockStatus(product)}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
