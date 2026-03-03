'use client'

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar'
import { LayoutDashboard, Users, Clock, BarChart3, Settings, Plus, Search, Bell } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import AddLeadModal from '@/components/leads/add-lead-modal'
import { Lead, mockLeads } from '@/lib/mock-data'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/follow-ups', label: 'Follow Ups', icon: Clock },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [showAddModal, setShowAddModal] = useState(false)
  const [leads, setLeads] = useState<Lead[]>(mockLeads)

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>) => {
    const lead: Lead = {
      id: `lead-${Date.now()}`,
      ...newLead,
      createdAt: new Date(),
      lastContacted: new Date(),
    }
    setLeads([...leads, lead])
    setShowAddModal(false)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex border-r border-sidebar-border">
        <SidebarHeader className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold text-xs">
              CRM
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">CRM Dashboard</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <SidebarMenu className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === '/' && pathname === '/')
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <header className="border-b border-border bg-card px-4 md:px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            {/* Left side - Mobile Menu Trigger */}
            <div className="flex items-center gap-2 flex-1 md:flex-none">
              <SidebarTrigger className="md:hidden" />
              {/* Desktop Search */}
              <div className="hidden md:flex items-center gap-2 max-w-md flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  className="border-0 bg-secondary text-foreground placeholder-muted-foreground"
                />
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <Button variant="ghost" size="icon" className="relative text-foreground hover:bg-secondary hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden md:inline">Add Lead</span>
                <span className="md:hidden text-sm">Add</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background">
          {children}
        </main>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddLead}
        />
      )}
    </>
  )
}
