import { SidebarProvider } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AppSidebar from './app-sidebar'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
                <AppSidebar />
            <main className='m-2 w-full'>
                <div className="flex items-center bg-sidebar shadow gap-2 border border-sidebar-border rounded-md p-2 px-4">
                    {/* <Sidebar /> */}
                    <div className="ml-auto"></div>
                    <UserButton />
                </div>

                <div className="h-4"></div>
                <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>

    )
}

export default layout
