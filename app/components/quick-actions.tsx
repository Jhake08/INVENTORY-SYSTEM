import React from 'react'

const QuickActions: React.FC = () => {
  return (
    <section className="bg-black bg-opacity-40 backdrop-blur-md text-white shadow-lg rounded-lg p-6 flex space-x-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
      <button
        type="button"
        className="px-6 py-3 bg-indigo-600 bg-opacity-70 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      >
        Add Product
      </button>
      <button
        type="button"
        className="px-6 py-3 bg-green-600 bg-opacity-70 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
      >
        Add Transaction
      </button>
      <button
        type="button"
        className="px-6 py-3 bg-yellow-600 bg-opacity-70 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      >
        Sync Data
      </button>
    </section>
  )
}

export default QuickActions
