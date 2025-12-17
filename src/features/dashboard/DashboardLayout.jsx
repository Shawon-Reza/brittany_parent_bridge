import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div
            className="flex h-screen bg-gradient-to-b from-[#FCFCFC] to-[#F5F4F9]
        
        ">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout