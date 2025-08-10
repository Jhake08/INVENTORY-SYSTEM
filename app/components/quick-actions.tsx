import React from 'react'

const QuickActions: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg rounded-lg p-6 flex space-x-6">
      <button
        type="button"
        className="px-6 py-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        Add Product
      </button>
      <button
        type="button"
        className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      >
        Add Transaction
      </button>
      <button
        type="button"
        className="px-6 py-3 bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      >
        Sync Data
      </button>
    </section>
  )
}

export default QuickActions
