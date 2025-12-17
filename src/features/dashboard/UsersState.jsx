import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Users as UsersIcon } from 'lucide-react'

const Sparkline = ({ data, width = 120, height = 56, stroke = '#10B981' }) => {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const stepX = width / (data.length - 1)
  const points = data
    .map((d, i) => {
      const x = i * stepX
      const y = height - ((d - min) / range) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  )
}

const StatCard = ({
  label,
  value,
  valueFormatter,
  change,
  positive,
  sparkData,
  sparkColor = '#10B981',
  icon,
}) => {
  const isPositive = typeof positive === 'boolean' ? positive : (typeof change === 'number' ? change >= 0 : true)

  const formattedValue =
    typeof valueFormatter === 'function'
      ? valueFormatter(value)
      : new Intl.NumberFormat('en-US').format(value)

  const formattedChange =
    typeof change === 'number'
      ? `${change > 0 ? '+' : ''}${Math.abs(change).toFixed(1)}%`
      : change

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/90 px-5 py-4 shadow-lg ring-1 ring-neutral-200/70">
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          {icon ? (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-neutral-600">
              {icon}
            </span>
          ) : null}
          <span className="font-medium">{label}</span>
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">{formattedValue}</div>
        <div className={`mt-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-500'}`}>{formattedChange}</div>
      </div>
      <div className="ml-4 hidden sm:block">
        <Sparkline data={sparkData} stroke={sparkColor} />
      </div>
    </div>
  )
}

const SkeletonCard = () => (
  <div className="rounded-2xl bg-white/90 px-5 py-4 shadow-sm ring-1 ring-neutral-200/70 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 w-28 rounded bg-neutral-200" />
        <div className="mt-2 h-7 w-24 rounded bg-neutral-300" />
        <div className="mt-1 h-3 w-16 rounded bg-neutral-200" />
      </div>
      <div className="ml-4 hidden h-14 w-32 rounded bg-neutral-100 sm:block" />
    </div>
  </div>
)

// Helper to format currency values easily
const currencyFormatter = (currency = 'USD', options = {}) =>
  (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0, ...options }).format(value)

/**
 * UsersState
 * Props (all optional for easy integration):
 * - stats: Array<{
 *     id: string,
 *     label: string,
 *     value: number,
 *     valueFormatter?: (n:number)=>string,
 *     change?: number | string, // e.g., 2.5 or "+2.5%"
 *     positive?: boolean, // inferred from change when omitted
 *     sparkData?: number[],
 *     sparkColor?: string,
 *     icon?: React.ReactNode
 *   }>
 * - isLoading?: boolean
 * - error?: unknown
 * - queryKey?: unknown[]
 * - queryFn?: () => Promise<Stats[]>
 * - className?: string
 */
const UsersState = ({ stats, isLoading, error, queryKey, queryFn, className = '' }) => {
  const shouldQuery = !!(queryKey && queryFn)
  const { data, isLoading: qLoading, error: qError } = useQuery({
    queryKey: shouldQuery ? queryKey : ['noop-users-state'],
    queryFn: shouldQuery ? queryFn : async () => stats,
    enabled: shouldQuery,
  })

  const fallbackStats = [
    {
      id: 'totalUsers',
      label: 'Total Users',
      value: 2450,
      change: 2.5,
      sparkData: [120, 10, 140, 20, 190, 240, 20, 250, 290, 30, 300, 330],
      sparkColor: '#10B981',
      icon: <UsersIcon className="h-4 w-4" />,
    },
    {
      id: 'activeUsers',
      label: 'Active Users',
      value: 1840,
      change: -4.4,
      sparkData: [30, 28, 29, 27, 26, 24, 23, 22, 20, 18, 19, 15],
      sparkColor: '#EF4444',
    },
    {
      id: 'monthlySubscribers',
      label: 'Monthly Subscribers (Feb)',
      value: 2450,
      change: 2.5,
      sparkData: [10, 12, 14, 18, 16, 20, 22, 24, 23, 26, 27, 30],
      sparkColor: '#10B981',
    },
    {
      id: 'totalRevenue',
      label: 'Total Revenue',
      value: 48230,
      change: 2.5,
      valueFormatter: currencyFormatter('USD'),
      sparkData: [20, 22, 21, 24, 26, 25, 28, 30, 29, 33, 35, 36],
      sparkColor: '#10B981',
    },
  ]

  const finalStats = (data || stats || fallbackStats) || []
  const loading = shouldQuery ? qLoading : !!isLoading
  const errorState = shouldQuery ? qError : error

  if (errorState) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
          Failed to load stats
        </div>
      </div>
    )
  }

  return (
    <section className={`grid grid-cols-1 gap-4  sm:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {loading
        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        : finalStats.map(({ id, label, value, valueFormatter, change, positive, sparkData, sparkColor, icon }) => (
            <StatCard
              key={id}
              label={label}
              value={value}
              valueFormatter={valueFormatter}
              change={change}
              positive={positive}
              sparkData={sparkData}
              sparkColor={sparkColor}
              icon={icon}
            />
          ))}
    </section>
  )
}

export default UsersState