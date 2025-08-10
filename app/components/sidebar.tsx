import React from 'react'
import Link from 'next/link'

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Inventory System
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/">
          <a className="block px-3 py-2 rounded hover:bg-gray-700">Dashboard</a>
        </Link>
        <Link href="/products">
          <a className="block px-3 py-2 rounded hover:bg-gray-700">Products</a>
        </Link>
        <Link href="/transactions">
          <a className="block px-3 py-2 rounded hover:bg-gray-700">Transactions</a>
        </Link>
        <Link href="/reports">
          <a className="block px-3 py-2 rounded hover:bg-gray-700">Reports</a>
        </Link>
        <Link href="/settings">
          <a className="block px-3 py-2 rounded hover:bg-gray-700">Settings</a>
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
