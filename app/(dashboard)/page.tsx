'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { mockLeads } from '@/lib/mock-data'
import { Users, Zap, CheckCircle2, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-purple-100 text-purple-800',
  'Converted': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800',
}

export default function DashboardPage() {
  const stats = [
    {
      label: 'Total Leads',
      value: mockLeads.length,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'New Leads',
      value: mockLeads.filter(l => l.status === 'New').length,
      icon: Zap,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Contacted',
      value: mockLeads.filter(l => l.status === 'Contacted').length,
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Converted',
      value: mockLeads.filter(l => l.status === 'Converted').length,
      icon: CheckCircle2,
      color: 'bg-green-50 text-green-600',
    },
  ]

  const recentLeads = mockLeads.slice(0, 5)

  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads Table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-muted-foreground">Source</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id} className="border-border hover:bg-secondary/50">
                  <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[lead.status as keyof typeof statusColors]} border-0`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
