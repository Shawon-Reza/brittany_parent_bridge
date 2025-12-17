import React from 'react'
import DashboardHeader from './DashboardHeader'
import UsersState from './UsersState'
import RevenueTrend from './RevenueTrend'
import SubscriptionLastSixMonth from './SubscriptionLastSixMonth'
import ModeDistribution from './ModeDistribution'

const Dashboard = () => {
  return (
    <div className="px-5 md:px-6 lg:px-7 ">

      {/* Dashboard Header Component */}
      <section className='my-5'>
        <DashboardHeader />
      </section>
      {/* User Stats Component */}
      <section className='my-10'>
        <UsersState />
      </section>
      {/* Revenue Trend Component */}
      <section className='my-5'>
        <RevenueTrend></RevenueTrend>
      </section>
      {/* Subscription plans and Mode Distribution Components */}
      <section className='my-5 grid grid-cols-1 md:grid-cols-12 gap-6'>
        <div className='md:col-span-7'>
          <SubscriptionLastSixMonth />
        </div>
        <div className='md:col-span-5'>
          <ModeDistribution />
        </div>
      </section>


    </div>
  )
}

export default Dashboard