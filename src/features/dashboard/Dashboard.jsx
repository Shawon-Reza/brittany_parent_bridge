import React from 'react'
import DashboardHeader from './DashboardHeader'
import UsersState from './UsersState'
import RevenueTrend from './RevenueTrend'

const Dashboard = () => {
  return (
    <div className="px-5 md:px-6 lg:px-7 ">

      {/* Dashboard Header Component */}
      <section className='my-5'>
        <DashboardHeader />
      </section>
      {/* User Stats Component */}
      <section>
        <UsersState />
      </section>
      {/* Revenue Trend Component */}
      <section className='my-5'>
        <RevenueTrend></RevenueTrend>
      </section>






    </div>
  )
}

export default Dashboard