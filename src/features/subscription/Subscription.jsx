import React from 'react'
import SubscriptionHeader from './SubscriptionHeader'
import SubscriptionCard from './SubscriptionCard'

const Subscription = () => {
  const handleEdit = (subscription) => {
    // Implement edit logic - navigate to edit form or open modal
    console.log('Edit subscription:', subscription)
  }

  const handleDelete = (subscription) => {
    // Implement delete logic - show confirmation modal
    console.log('Delete subscription:', subscription)
  }

  return (
    <div className="px-5 md:px-6 lg:px-7">
      {/* Subscription Header */}
      <div className="mt-5">
        <SubscriptionHeader />
      </div>

      {/* Subscription Cards - handles data fetching and rendering internally */}
      <div className="mt-8 max-w-5xl xl:max-w-7xl mx-auto">
        <SubscriptionCard 
          onEdit={handleEdit}
          onDelete={handleDelete}
          // For backend integration, pass one of these:
          // data={subscriptionsData}
          // OR
          // queryKey={['subscriptions']}
          // queryFn={fetchSubscriptions}
        />
      </div>
    </div>
  )
}

export default Subscription
