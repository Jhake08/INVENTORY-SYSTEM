import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center space-x-4">
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

const DashboardStats: React.FC = () => {
  // Placeholder stats - replace with real data fetching
  const stats = [
    { title: 'Total Products', value: 120 },
    { title: 'Low Stock Items', value: 5 },
    { title: 'Total Sales', value: '$15,000' },
    { title: 'Pending Orders', value: 8 },
  ]

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </section>
  )
}

export default DashboardStats
