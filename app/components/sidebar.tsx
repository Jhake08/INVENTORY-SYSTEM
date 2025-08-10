import React from 'react'
import Link from 'next/link'

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-black text-white flex flex-col shadow-lg">
      <div className="p-6 text-3xl font-extrabold tracking-wide border-b border-gray-800">
        Inventory System
      </div>
      <nav className="flex-1 p-6 space-y-4 text-lg font-semibold">
        <Link href="/">
          <a className="block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300">Dashboard</a>
        </Link>
        <Link href="/products">
          <a className="block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300">Products</a>
        </Link>
        <Link href="/transactions">
          <a className="block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300">Transactions</a>
        </Link>
        <Link href="/reports">
          <a className="block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300">Reports</a>
        </Link>
        <Link href="/settings">
          <a className="block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300">Settings</a>
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
