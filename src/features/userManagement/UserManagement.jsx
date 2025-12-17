import { Search } from 'lucide-react'
import React, { useState } from 'react'
import UserManagementHeader from './UserManagementHeader'
import UserManagementTable from './UserManagementTable'

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    console.log('Search input:', value)
  }

  return (
    <div className="p-8">
      {/* User Management header */}
      <div>
        <UserManagementHeader></UserManagementHeader>
      </div>
      {/* Searchbar */}
      <div className="mt-6">
        <label className="sr-only" htmlFor="user-search">Search users</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
          <input
            id="user-search"
            type="search"
            placeholder="Search by name, email..."
            className="w-full rounded-lg border border-neutral-200 bg-white px-10 py-3 text-sm text-neutral-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 placeholder:text-neutral-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {/*User List table */}
      <div>
        <UserManagementTable searchTerm={searchTerm} />
      </div>

    </div>
  )
}

export default UserManagement
