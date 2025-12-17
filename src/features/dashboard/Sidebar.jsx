import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, CreditCard, LogOut } from 'lucide-react'
import logo from '../../assets/images/logo.png'
import { IoIosContact } from 'react-icons/io'
import { useTheme } from '../../Contexts/ThemeContext'

const Sidebar = () => {
    const location = useLocation()
    const { isCollapsed } = useTheme()

    const menuItems = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            label: 'User Management',
            icon: Users,
            path: '/user-management'
        },
        {
            label: 'Subscription',
            icon: CreditCard,
            path: '/subscription'
        }
    ]

    const isActive = (path) => location.pathname === path

    return (
        <aside className={`transition-all duration-300 bg-gradient-to-b from-[#FCFCFC] to-[#F5F4F9] border-r border-[#FFFFFF] shadow-md flex flex-col ${isCollapsed ? 'w-20' : 'w-64'
            }`}>
            {/* Header with Logo */}
            <div className={`p-2 border-neutral-200 transition-all duration-300 ${isCollapsed ? 'mx-auto' : 'mx-auto'
                }`}>
                <div className="flex items-center gap-3">
                    <img
                        src={logo}
                        alt="ParentBridge"
                        className={`transition-all duration-300 ${isCollapsed ? 'h-12 w-12' : 'h-20 w-20'
                            }`}
                    />
                </div>
            </div>
            <hr className='text-gray-300' />

            {/* Menu Items */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.path)

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    title={isCollapsed ? item.label : ''}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                                            ? 'bg-purple-100 text-purple-600 font-medium'
                                            : 'text-neutral-600 hover:bg-neutral-100'
                                        } ${isCollapsed ? 'justify-center' : ''
                                        }`}
                                >
                                    <Icon size={20} />
                                    {!isCollapsed && <span>{item.label}</span>}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Footer - Admin User Button */}
            <div className="p-4 border-t border-neutral-200">
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium ${isCollapsed ? 'justify-center' : 'justify-between'
                    }`}>
                    {isCollapsed ? (
                        <LogOut size={18} title="Admin User" />
                    ) : (
                        <>
                            <div className='flex items-center gap-3'>
                                <LogOut size={18} />
                                <span>Admin User</span>
                            </div>
                            <IoIosContact size={18} />
                        </>
                    )}
                </button>
            </div>
        </aside>
    )
}

export default Sidebar