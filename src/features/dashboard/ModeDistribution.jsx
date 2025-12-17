import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts'

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg bg-white px-3 py-2.5 shadow-lg ring-1 ring-neutral-200">
                <p className="text-xs font-semibold text-neutral-700">{payload[0].name}</p>
                <p className="mt-0.5 text-sm font-bold" style={{ color: payload[0].payload.color }}>
                    {payload[0].value.toLocaleString()}
                </p>
                {payload[0].payload.change && (
                    <p className="mt-0.5 text-xs text-neutral-500">
                        {payload[0].payload.change > 0 ? '+' : ''}{payload[0].payload.change}%
                    </p>
                )}
            </div>
        )
    }
    return null
}

// Custom Label Component for center text
const CenterLabel = (props) => {
    const { viewBox, value } = props
    const { cx, cy } = viewBox || {}

    if (!cx || !cy) return null

    // Calculate font size based on viewport - approximating responsive behavior
    const fontSize = Math.min(Math.max(cx * 0.18, 24), 48)

    return (
        <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
                fontSize: `${fontSize}px`,
                fontWeight: 'bold',
                fill: '#262626'
            }}
        >
            {value}
        </text>
    )
}


// Totals Display Component
const TotalsDisplay = ({ data }) => (
    <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
        {data.map((item, index) => (
            <div key={index} className="min-w-0">
                <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2">
                    <div
                        className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-2.5 sm:w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[9px] xs:text-[10px] sm:text-xs lg:text-sm text-neutral-500 leading-tight truncate">{item.name}</span>
                </div>
                <p className="mt-0.5 xs:mt-1 text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 truncate">{item.value.toLocaleString()}</p>
            </div>
        ))}
    </div>
)

// Custom Label for percentage on chart
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, index, innerRadius }) => {
    const RADIAN = Math.PI / 180
    // Use relative positioning based on the chart size
    const labelRadius = outerRadius + (outerRadius * 0.35)
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN)
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN)

    const percentage = (percent * 100).toFixed(1)
    const sign = index === 0 ? '+' : '-'

    // Adjust dot size relative to chart size
    const dotRadius = Math.max(4, outerRadius * 0.055)
    const lineStartRadius = outerRadius + (outerRadius * 0.07)

    return (
        <g>
            <line
                x1={cx + lineStartRadius * Math.cos(-midAngle * RADIAN)}
                y1={cy + lineStartRadius * Math.sin(-midAngle * RADIAN)}
                x2={x}
                y2={y}
                stroke={index === 0 ? '#7DD3C0' : '#A78BFA'}
                strokeWidth={2}
            />
            <circle
                cx={cx + lineStartRadius * Math.cos(-midAngle * RADIAN)}
                cy={cy + lineStartRadius * Math.sin(-midAngle * RADIAN)}
                r={dotRadius}
                fill="white"
                stroke={index === 0 ? '#7DD3C0' : '#6366F1'}
                strokeWidth={2.5}
            />
            <text
                x={x}
                y={y}
                fill={index === 0 ? '#7DD3C0' : '#A78BFA'}
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold"
            >
                {sign}{percentage}%
            </text>
        </g>
    )
}

// Skeleton Loader
const SkeletonChart = () => (
    <div className="h-62.5 sm:h-70 md:h-75 lg:h-80 w-full animate-pulse rounded-2xl bg-neutral-100/50">
        <div className="flex h-full items-center justify-center">
            <div className="text-xs sm:text-sm text-neutral-400">Loading chart...</div>
        </div>
    </div>
)

/**
 * ModeDistribution Component
 * Props:
 * - data?: Array<{ name: string, value: number, color: string, change?: number }> (optional)
 * - isLoading?: boolean
 * - error?: unknown
 * - queryKey?: unknown[]
 * - queryFn?: () => Promise<Array<{ name: string, value: number, color: string }>>
 * - title?: string (default: "Mode Distribution")
 * - className?: string
 */
const ModeDistribution = ({
    data,
    isLoading,
    error,
    queryKey,
    queryFn,
    title = 'Mode Distribution',
    className = ''
}) => {
    // React Query integration (optional)
    const shouldQuery = !!(queryKey && queryFn)
    const { data: queryData, isLoading: qLoading, error: qError } = useQuery({
        queryKey: shouldQuery ? queryKey : ['noop-mode-distribution'],
        queryFn: shouldQuery ? queryFn : async () => data,
        enabled: shouldQuery,
    })

    // Fallback demo data
    const fallbackData = [
        {
            name: 'Independent mode',
            value: 942,
            color: '#7DD3C0',
            change: 2.5
        },
        {
            name: 'Bridge Mode',
            value: 25,
            color: '#6366F1',
            change: -0.5
        },
    ]

    const finalData = queryData || data || fallbackData
    const loading = shouldQuery ? qLoading : !!isLoading
    const errorState = shouldQuery ? qError : error

    // Calculate total
    const total = finalData.reduce((sum, item) => sum + (item.value || 0), 0)

    if (errorState) {
        return (
            <div className={`rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-neutral-200/70 ${className}`}>
                <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
                    Failed to load mode distribution data
                </div>
            </div>
        )
    }

    return (
        <div className={`h-full rounded-xl sm:rounded-2xl bg-white/90 p-3 sm:p-5 lg:p-6 shadow-sm ring-1 ring-neutral-200/70 ${className}`}>
            {/* Header */}
            <h2 className="mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl font-semibold text-neutral-800">{title}</h2>

            {/* Chart */}
            {loading ? (
                <SkeletonChart />
            ) : (
                <>
                    <div className="mx-auto w-full max-w-62.5 xs:max-w-70 sm:max-w-87.5 md:max-w-100 lg:max-w-105">
                        <ResponsiveContainer width="100%" height={250} className="sm:h-70! md:h-75! lg:h-80!">
                            <PieChart>
                                <Pie
                                    data={finalData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="52%"
                                    outerRadius="78%"
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={renderCustomLabel}
                                    labelLine={false}
                                >
                                    {finalData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    style={{
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                        fill: '#262626'
                                    }}
                                >
                                    {total}
                                </text>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Totals */}
                    <TotalsDisplay data={finalData} />
                </>
            )}
        </div>
    )
}

export default ModeDistribution