"use client"

import { Sidebar } from "@/components/admin/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 hidden md:block" />
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
} 