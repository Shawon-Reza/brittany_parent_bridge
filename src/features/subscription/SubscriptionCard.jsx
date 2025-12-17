
import React from 'react'
import { Check, Edit, Trash2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

// Single Card Component
const Card = ({ subscription, onEdit, onDelete }) => {
    const statusColors = {
        active: 'bg-emerald-50 text-emerald-600 border-emerald-200',
        inactive: 'bg-neutral-100 text-neutral-500 border-neutral-200',
    }

    return (
        <div className="flex flex-col lg:h-[calc(100vh-200px)] rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-neutral-800">{subscription.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{subscription.description}</p>
            </div>

            {/* Pricing */}
            <div className="mb-4 flex items-end gap-4">
                <div>
                    <span className="text-3xl font-bold text-purple-400">${subscription.monthlyPrice.toFixed(2)}</span>
                    <span className="ml-1 text-sm text-neutral-500">/monthly</span>
                </div>
                <div>
                    <span className="text-3xl font-bold text-purple-300">${subscription.yearlyPrice.toFixed(2)}</span>
                    <span className="ml-1 text-sm text-neutral-500">/year</span>
                </div>
            </div>

            {/* Status */}
            <div className="mb-4">
                <span className="text-xs lg:text-sm font-semibold text-neutral-600">Status</span>
                <span
                    className={`ml-3 inline-flex items-center rounded-full border px-3 py-1 text-xs lg:text-sm font-semibold ${statusColors[subscription.status] || statusColors.inactive}`}
                >
                    {subscription.status}
                </span>
            </div>

            {/* Features */}
            <div className="mb-6">
                <h4 className="mb-3 text-sm lg:text-lg font-semibold text-neutral-700">Features:</h4>
                <ul className="space-y-2.5 ">
                    {subscription.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm  text-neutral-600">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span className="leading-relaxed lg:text-lg">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3 lg:pb-5">
                <button
                    type="button"
                    onClick={() => onEdit && onEdit(subscription)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                    <Edit className="h-4 w-4" />
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => onDelete && onDelete(subscription)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </button>
            </div>
        </div>
    )
}

// Skeleton Loading Component
const SkeletonCard = () => (
    <div className="animate-pulse rounded-2xl border-2 border-neutral-100 bg-white p-6">
        <div className="mb-4 h-6 w-2/3 rounded bg-neutral-200"></div>
        <div className="mb-4 h-3 w-full rounded bg-neutral-100"></div>
        <div className="mb-4 flex gap-4">
            <div className="h-10 w-28 rounded bg-neutral-200"></div>
            <div className="h-10 w-28 rounded bg-neutral-200"></div>
        </div>
        <div className="mb-6 space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-full rounded bg-neutral-100"></div>
            ))}
        </div>
        <div className="flex gap-3">
            <div className="h-10 flex-1 rounded bg-neutral-100"></div>
            <div className="h-10 flex-1 rounded bg-neutral-100"></div>
        </div>
    </div>
)

/**
 * SubscriptionCard Component
 * Props for backend integration:
 * - data?: Array<{ id, title, description, monthlyPrice, yearlyPrice, status, features }>
 * - isLoading?: boolean
 * - error?: unknown
 * - queryKey?: unknown[]
 * - queryFn?: () => Promise<Array<Subscription>>
 * - onEdit?: (subscription) => void
 * - onDelete?: (subscription) => void
 * - className?: string
 */
const SubscriptionCard = ({
    data,
    isLoading,
    error,
    queryKey,
    queryFn,
    onEdit,
    onDelete,
    className = '',
}) => {
    const shouldQuery = !!(queryKey && queryFn)
    const { data: queryData, isLoading: qLoading, error: qError } = useQuery({
        queryKey: shouldQuery ? queryKey : ['noop-subscriptions'],
        queryFn: shouldQuery ? queryFn : async () => data,
        enabled: shouldQuery,
    })

    // Fallback demo data
    const fallbackData = [
        {
            id: 1,
            title: 'ParentBridge Pro',
            description: 'Or purchase an annual subscription and save: Annual Subscription',
            monthlyPrice: 6.99,
            yearlyPrice: 76.89,
            status: 'active',
            features: [
                'Unlimited messages and message filtering',
                'Independent use – one parent can use even if the other does not',
                'Access to both filtered & unfiltered message views',
                'AI tone support to avoid unnecessary conflict',
                'Exportable PDF message transcripts (filtered & original)',
                'Flag and key hostile messages',
                'Flag and key hostile messages',
                'Threat & Safety Alert System',
                'Shared Calendar & multiple child profiles',
            ],
        },
        {
            id: 2,
            title: 'ParentBridge Pro(+)',
            description: 'Or purchase an annual subscription and save: Annual Subscription',
            monthlyPrice: 9.99,
            yearlyPrice: 109.89,
            status: 'active',
            features: [
                'Everything in ParentBridge Pro, plus...',
                'Ability to call Co-parent and record calls',
                'The option to download recorded calls.',
                'Document Vault Uploads (unlimited)',
                'Secure PDF downloads of parenting plans, messages, and logs',
                'Expense tracking',
                'Access to Community Support Forum',
                'Early Access to new features',
            ],
        },
    ]

    const finalData = queryData || data || fallbackData
    const loading = shouldQuery ? qLoading : !!isLoading
    const errorState = shouldQuery ? qError : error

    const handleEdit = (subscription) => {
        console.log('Edit subscription:', subscription)
        onEdit && onEdit(subscription)
    }

    const handleDelete = (subscription) => {
        console.log('Delete subscription:', subscription)
        onDelete && onDelete(subscription)
    }

    if (errorState) {
        return (
            <div className={`rounded-2xl bg-rose-50 p-6 text-center text-rose-700 ring-1 ring-rose-200 ${className}`}>
                Failed to load subscription plans. Please try again.
            </div>
        )
    }

    return (
        <div className={`grid grid-cols-1 gap-6 xl:gap-10 2xl:gap-12 lg:grid-cols-2 ${className}`}>
            {loading ? (
                <>
                    <SkeletonCard />
                    <SkeletonCard />
                </>
            ) : (
                finalData.map((subscription) => (
                    <Card
                        key={subscription.id}
                        subscription={subscription}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </div>
    )
}

export default SubscriptionCard