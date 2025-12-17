import React from 'react'
import { Menu } from 'lucide-react'
import { useTheme } from '../../Contexts/ThemeContext'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from 'react-icons/tb'

/**
 * DashboardHeader
 * Simple header with a menu button, title/subtitle, and avatar.
 *
 * Props:
 * - title?: string (defaults to "Admin Dashboard")
 * - subtitle?: string (defaults to "Monitor key metrics and system performance")
 * - avatarUrl?: string (user avatar image url)
 */

const DashboardHeader = ({
    title = 'Admin Dashboard',
    subtitle = 'Monitor key metrics and system performance',
    avatarUrl,
}) => {
    const { toggleSidebar, isCollapsed } = useTheme()
    console.log(isCollapsed)
    return (
        <header className="w-full ">
            <div className="mx-auto flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Toggle sidebar"
                        onClick={toggleSidebar}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-200/50 active:bg-neutral-300/50 transition-colors"
                    >
                        {
                            isCollapsed ? (<TbLayoutSidebarRightCollapse size={28} />) : (<TbLayoutSidebarLeftCollapse size={28} />)
                        }

                    </button>

                    <div className="leading-tight">
                        <h1 className="text-[18px] font-semibold text-neutral-800">{title}</h1>
                        <p className="text-[12px] text-neutral-500">{subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <img
                        src={
                            avatarUrl ||
                            'https://i.pravatar.cc/64?img=15'
                        }
                        alt="User avatar"
                        className="h-12 w-12 rounded-xl object-cover border border-neutral-200 shadow-sm"
                    />
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader