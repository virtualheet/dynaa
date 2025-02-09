import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AppSidebar from './app-sidebar'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen bg-black/80">
            {/* Sidebar */}
            <AppSidebar />

            {/* Main Content */}
            <main className='flex flex-col w-full '>
                {/* Header */}
                <div className="flex items-center w-full justify-end mb-4 bg-black border border-white/5 rounded-2xl p-3">
                    <UserButton 

                        appearance={{
                            elements: {
                                rootBox: 'hover:opacity-80 transition-opacity',
                                avatarBox: 'w-8 h-8 rounded-xl',
                            }
                        }}
                    />
                </div>

                {/* Content Area */}
                <div className="bg-black border border-white/5 rounded-3xl min-h-[calc(100vh-7rem)] overflow-auto scrollbar-none">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
