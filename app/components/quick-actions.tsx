import React from 'react'

const QuickActions: React.FC = () => {
  return (
    <section className="bg-white shadow rounded p-4 flex space-x-4">
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Product
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Add Transaction
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Sync Data
      </button>
    </section>
  )
}

export default QuickActions
