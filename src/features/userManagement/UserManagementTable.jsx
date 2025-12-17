import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

// Pill badge component for mode/plan/status
const Pill = ({ label, tone = 'neutral' }) => {
    const tones = {
        blue: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
        pink: 'bg-pink-50 text-pink-600 border-pink-100',
        teal: 'bg-teal-50 text-teal-600 border-teal-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        neutral: 'bg-neutral-50 text-neutral-600 border-neutral-100',
    }

    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone] || tones.neutral}`}>
            {label}
        </span>
    )
}

// Skeleton row during loading
const SkeletonRow = () => (
    <tr className="animate-pulse">
        {[...Array(8)].map((_, idx) => (
            <td key={idx} className="px-4 py-3">
                <div className="h-3.5 rounded bg-neutral-100"></div>
            </td>
        ))}
    </tr>
)

/**
 * UserManagementTable Component
 * Props for backend integration:
 * - data?: Array<{ id: string|number, name: string, email: string, connected: string, phone: string, joinDate: string, mode: string, plan: string, status: 'Active'|'Inactive', highlight?: boolean }>
 * - isLoading?: boolean
 * - error?: unknown
 * - queryKey?: unknown[]
 * - queryFn?: () => Promise<Array<UserRow>>
 * - searchTerm?: string (to filter by name/email)
 * - className?: string
 */
const UserManagementTable = ({
    data,
    isLoading,
    error,
    queryKey,
    queryFn,
    searchTerm = '',
    className = '',
}) => {
    const shouldQuery = !!(queryKey && queryFn)
    const { data: queryData, isLoading: qLoading, error: qError } = useQuery({
        queryKey: shouldQuery ? queryKey : ['noop-user-table'],
        queryFn: shouldQuery ? queryFn : async () => data,
        enabled: shouldQuery,
    })

    console.log(searchTerm)

    const fallbackData = [
        { id: 1, name: 'reza Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Indep.', plan: 'Pro+', status: 'Active', highlight: false },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Bridge', plan: 'Pro', status: 'Active', highlight: false },
        { id: 3, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Indep.', plan: 'Pro+', status: 'Inactive', highlight: false },
        { id: 4, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Bridge', plan: 'Pro+', status: 'Inactive', highlight: false },
        { id: 5, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Bridge', plan: 'Pro+', status: 'Active', highlight: false },
        { id: 6, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Indep.', plan: 'Pro+', status: 'Active', highlight: false },
        { id: 1, name: 'reza Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Indep.', plan: 'Pro+', status: 'Active', highlight: false },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Bridge', plan: 'Pro', status: 'Active', highlight: false },
        { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@email.com', connected: 'Michael Johnson', phone: '+01111111111', joinDate: '2024-01-15', mode: 'Bridge', plan: 'Pro', status: 'Active', highlight: false },
     
    ]

    const finalData = queryData || data || fallbackData
    const loading = shouldQuery ? qLoading : !!isLoading
    const errorState = shouldQuery ? qError : error

    const filtered = finalData.filter((item) => {
        if (!searchTerm) return true
        const q = searchTerm.toLowerCase()
        return (
            item.name.toLowerCase().includes(q) ||
            item.email.toLowerCase().includes(q)
        )
    })

    const statusTone = (status) => {
        if (status === 'Active') return 'teal'
        return 'orange'
    }

    const modeTone = (mode) => (mode.toLowerCase().startsWith('bridge') ? 'blue' : 'purple')
    const planTone = (plan) => (plan.toLowerCase().includes('+') ? 'pink' : 'purple')

    if (errorState) {
        return (
            <div className={`rounded-2xl bg-white p-4 shadow-sm ring-1 ring-rose-100 text-rose-700 ${className}`}>
                Failed to load users
            </div>
        )
    }

    return (
        <div className={`mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70 ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-100">
                    <thead className="bg-neutral-50/80">
                        <tr className="text-left text-xs font-semibold text-neutral-500">
                            <th className="px-4 py-3.5">Name</th>
                            <th className="px-4 py-3.5">Email</th>
                            <th className="px-4 py-3.5">Connected</th>
                            <th className="px-4 py-3.5">Number</th>
                            <th className="px-4 py-3.5">Join Date</th>
                            <th className="px-4 py-3.5">Mode</th>
                            <th className="px-4 py-3.5">Plan</th>
                            <th className="px-4 py-3.5">Status</th>
                            <th className="px-4 py-3.5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
                        {loading ? (
                            [...Array(6)].map((_, idx) => <SkeletonRow key={idx} />)
                        ) : (
                            filtered.map((user) => (
                                <tr
                                    key={user.id}
                                    className={`hover:bg-[#FAF0FF] ${user.highlight ? 'bg-indigo-50/60 ring-1 ring-indigo-100' : ''}`}
                                >
                                    <td className="px-4 py-3 font-semibold text-neutral-800">{user.name}</td>
                                    <td className="px-4 py-3 text-neutral-500">{user.email}</td>
                                    <td className="px-4 py-3 text-[#8FC8E3] font-medium">{user.connected}</td>
                                    <td className="px-4 py-3 font-medium">{user.phone}</td>
                                    <td className="px-4 py-3 text-neutral-500">{user.joinDate}</td>
                                    <td className="px-4 py-3"><Pill label={user.mode} tone={modeTone(user.mode)} /></td>
                                    <td className="px-4 py-3"><Pill label={user.plan} tone={planTone(user.plan)} /></td>
                                    <td className="px-4 py-3"><Pill label={user.status} tone={statusTone(user.status)} /></td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            type="button"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
                                            aria-label="Actions"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-neutral-100 px-4 py-3 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
                <span>Showing {filtered.length} of {finalData.length} users</span>
                <div className="flex items-center gap-2 text-sm font-medium">
                    <button className="rounded-md border border-neutral-200 px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-50">Previous</button>
                    <button className="rounded-md border border-neutral-200 px-3 py-1.5 text-neutral-600 transition hover:bg-neutral-50">Next</button>
                </div>
            </div>
        </div>
    )
}

export default UserManagementTable