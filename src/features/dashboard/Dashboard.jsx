import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
      <p className="text-neutral-500 mt-2">Monitor key metrics and system performance</p>
      
      {/* Placeholder for dashboard content */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="text-neutral-500 text-sm mb-2">Metric {i}</div>
            <div className="text-2xl font-bold text-neutral-900">--</div>
            <div className="text-xs text-neutral-400 mt-2">Loading...</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard