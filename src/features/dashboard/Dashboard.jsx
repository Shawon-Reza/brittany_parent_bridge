import React from 'react'
import DashboardHeader from './DashboardHeader'
import UsersState from './UsersState'

const Dashboard = () => {
  return (
    <div className="px-5 md:px-6 lg:px-7 ">

      {/* Dashboard Header Component */}
      <section className='mt-5'>
        <DashboardHeader />
      </section>
      {/* User Stats Component */}
      <section>
        <UsersState />
      </section>






    </div>
  )
}

export default Dashboard