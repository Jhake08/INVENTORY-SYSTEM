import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-black bg-opacity-40 backdrop-blur-md text-white shadow-lg rounded-lg p-6 flex items-center space-x-6 transition-transform transform hover:scale-105 hover:shadow-2xl" style={{ zoom: '75%' }}>
      {icon && <div className="text-4xl">{icon}</div>}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide opacity-75">{title}</p>
        <p className="text-3xl font-extrabold">{value}</p>
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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </section>
  )
}

export default DashboardStats
