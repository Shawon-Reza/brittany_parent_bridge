import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white px-3 py-2 shadow-lg ring-1 ring-neutral-200">
        <p className="text-xs font-medium text-neutral-600">{payload[0].payload.month}</p>
        <p className="text-sm font-semibold text-teal-600">
          Revenue: ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

// Skeleton Loader
const SkeletonChart = () => (
  <div className="h-64 w-full animate-pulse rounded-2xl bg-neutral-100/50">
    <div className="flex h-full items-center justify-center">
      <div className="text-sm text-neutral-400">Loading chart...</div>
    </div>
  </div>
)

/**
 * RevenueTrend Component
 * Props:
 * - data?: Array<{ month: string, revenue: number }> (optional, uses fallback if not provided)
 * - isLoading?: boolean
 * - error?: unknown
 * - queryKey?: unknown[]
 * - queryFn?: () => Promise<Array<{ month: string, revenue: number }>>
 * - title?: string (default: "Revenue Trend (Last 6 Months)")
 * - className?: string
 */
const RevenueTrend = ({ 
  data, 
  isLoading, 
  error, 
  queryKey, 
  queryFn,
  title = 'Revenue Trend (Last 6 Months)',
  className = '' 
}) => {
  // React Query integration (optional)
  const shouldQuery = !!(queryKey && queryFn)
  const { data: queryData, isLoading: qLoading, error: qError } = useQuery({
    queryKey: shouldQuery ? queryKey : ['noop-revenue-trend'],
    queryFn: shouldQuery ? queryFn : async () => data,
    enabled: shouldQuery,
  })

  // Fallback demo data
  const fallbackData = [
    { month: 'Jul', revenue: 8000 },
    { month: 'Aug', revenue: 32000 },
    { month: 'Sep', revenue: 35000 },
    { month: 'Oct', revenue: 18000 },
    { month: 'Nov', revenue: 40000 },
    { month: 'Dec', revenue: 48000 },
  ]

  const finalData = queryData || data || fallbackData
  const loading = shouldQuery ? qLoading : !!isLoading
  const errorState = shouldQuery ? qError : error

  // Calculate total revenue
  const totalRevenue = finalData.reduce((sum, item) => sum + (item.revenue || 0), 0)

  // Format Y-axis labels
  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value}`
  }

  if (errorState) {
    return (
      <div className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-neutral-200/70 ${className}`}>
        <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
          Failed to load revenue data
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl bg-white/90 p-4 sm:p-6 shadow-sm ring-1 ring-neutral-200/70 ${className}`}>
      {/* Header */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-neutral-800 sm:text-lg">{title}</h2>
        <div className="text-2xl font-bold text-teal-600 sm:text-3xl">
          ${totalRevenue.toLocaleString()}
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <SkeletonChart />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={finalData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={formatYAxis}
              dx={-5}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#14B8A6', strokeWidth: 2 }} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#14B8A6"
              strokeWidth={3}
              dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default RevenueTrend