import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white px-3 py-2.5 shadow-lg ring-1 ring-neutral-200">
        <p className="mb-1 text-xs font-semibold text-neutral-700">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Custom Legend Component
const CustomLegend = ({ pro, proPlus }) => (
  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
    {/* <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-purple-500" />
      <span className="text-xs text-neutral-600 sm:text-sm">ParentBridge Pro</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full bg-pink-400" />
      <span className="text-xs text-neutral-600 sm:text-sm">ParentBridge Pro(+)</span>
    </div> */}
  </div>
)

// Totals Display Component
const TotalsDisplay = ({ pro, proPlus }) => (
  <div className="mt-4 grid grid-cols-2 gap-4">
    <div>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
        <span className="text-xs text-neutral-500">ParentBridge Pro</span>
      </div>
      <p className="mt-1 text-3xl font-bold text-neutral-800">{pro.toLocaleString()}</p>
    </div>
    <div>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-pink-400" />
        <span className="text-xs text-neutral-500">ParentBridge Pro(+)</span>
      </div>
      <p className="mt-1 text-3xl font-bold text-neutral-800">{proPlus.toLocaleString()}</p>
    </div>
  </div>
)

// Skeleton Loader
const SkeletonChart = () => (
  <div className="h-80 w-full animate-pulse rounded-2xl bg-neutral-100/50">
    <div className="flex h-full items-center justify-center">
      <div className="text-sm text-neutral-400">Loading chart...</div>
    </div>
  </div>
)

/**
 * SubscriptionLastSixMonth Component
 * Props:
 * - data?: Array<{ month: string, pro: number, proPlus: number }> (optional)
 * - isLoading?: boolean
 * - error?: unknown
 * - queryKey?: unknown[]
 * - queryFn?: () => Promise<Array<{ month: string, pro: number, proPlus: number }>>
 * - title?: string (default: "Subscription (Last 6 Months)")
 * - className?: string
 */
const SubscriptionLastSixMonth = ({
  data,
  isLoading,
  error,
  queryKey,
  queryFn,
  title = 'Subscription (Last 6 Months)',
  className = ''
}) => {
  // React Query integration (optional)
  const shouldQuery = !!(queryKey && queryFn)
  const { data: queryData, isLoading: qLoading, error: qError } = useQuery({
    queryKey: shouldQuery ? queryKey : ['noop-subscription-chart'],
    queryFn: shouldQuery ? queryFn : async () => data,
    enabled: shouldQuery,
  })

  // Fallback demo data
  const fallbackData = [
    { month: 'Jul', pro: 140, proPlus: 149 },
    { month: 'Aug', pro: 180, proPlus: 89 },
    { month: 'Sep', pro: 120, proPlus: 110 },
    { month: 'Oct', pro: 165, proPlus: 75 },
    { month: 'Nov', pro: 95, proPlus: 95 },
    { month: 'Dec', pro: 142, proPlus: 210 },
  ]

  const finalData = queryData || data || fallbackData
  const loading = shouldQuery ? qLoading : !!isLoading
  const errorState = shouldQuery ? qError : error

  // Calculate totals
  const totalPro = finalData.reduce((sum, item) => sum + (item.pro || 0), 0)
  const totalProPlus = finalData.reduce((sum, item) => sum + (item.proPlus || 0), 0)

  if (errorState) {
    return (
      <div className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-neutral-200/70 ${className}`}>
        <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
          Failed to load subscription data
        </div>
      </div>
    )
  }

  return (
    <div className={`h-full rounded-2xl bg-white/90 p-4 sm:p-6 shadow-sm ring-1 ring-neutral-200/70 ${className}`}>
      {/* Header */}
      <h2 className="mb-6 text-lg font-semibold text-neutral-800 sm:text-xl">{title}</h2>

      {/* Chart */}
      {loading ? (
        <SkeletonChart />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={finalData}
              margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
              barGap={8}
              barCategoryGap="20%"
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
                dx={-5}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
              <Bar
                dataKey="pro"
                fill="#A855F7"
                radius={[8, 8, 8, 8]}
                name="Pro"
              />
              <Bar
                dataKey="proPlus"
                fill="#F472B6"
                radius={[8, 8, 8, 8]}
                name="Pro(+)"
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Custom Legend */}
          <CustomLegend pro={totalPro} proPlus={totalProPlus} />

          {/* Totals */}
          <TotalsDisplay pro={totalPro} proPlus={totalProPlus} />
        </>
      )}
    </div>
  )
}

export default SubscriptionLastSixMonth