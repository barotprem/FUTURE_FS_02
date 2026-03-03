'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockLeads } from '@/lib/mock-data'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AnalyticsPage() {
  // Status breakdown
  const statusData = [
    { name: 'New', value: mockLeads.filter(l => l.status === 'New').length },
    { name: 'Contacted', value: mockLeads.filter(l => l.status === 'Contacted').length },
    { name: 'Qualified', value: mockLeads.filter(l => l.status === 'Qualified').length },
    { name: 'Converted', value: mockLeads.filter(l => l.status === 'Converted').length },
    { name: 'Lost', value: mockLeads.filter(l => l.status === 'Lost').length },
  ]

  // Source breakdown
  const sourceData = [
    { name: 'Website', value: mockLeads.filter(l => l.source === 'Website').length },
    { name: 'Email', value: mockLeads.filter(l => l.source === 'Email').length },
    { name: 'LinkedIn', value: mockLeads.filter(l => l.source === 'LinkedIn').length },
    { name: 'Referral', value: mockLeads.filter(l => l.source === 'Referral').length },
    { name: 'Phone', value: mockLeads.filter(l => l.source === 'Phone').length },
  ]

  // Weekly trend
  const weeklyData = [
    { day: 'Mon', leads: 3 },
    { day: 'Tue', leads: 5 },
    { day: 'Wed', leads: 2 },
    { day: 'Thu', leads: 4 },
    { day: 'Fri', leads: 6 },
    { day: 'Sat', leads: 1 },
    { day: 'Sun', leads: 2 },
  ]

  // Conversion metrics
  const conversionRate = mockLeads.filter(l => l.status === 'Converted').length / mockLeads.length * 100
  const qualifiedRate = mockLeads.filter(l => l.status === 'Qualified').length / mockLeads.length * 100

  const COLORS = ['#3b82f6', '#f59e0b', '#a855f7', '#10b981', '#ef4444']

  return (
    <div className="space-y-6 p-6">
      {/* Metrics Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border border-border bg-card">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockLeads.length}</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Qualified Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{qualifiedRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockLeads.filter(l => l.status !== 'Converted' && l.status !== 'Lost').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Status Distribution */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Lead Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Source Distribution */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Lead Source Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Bar dataKey="value" fill="#a855f7" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Trend */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Weekly Lead Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Breakdown Table */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statusData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    {item.value} ({((item.value / mockLeads.length) * 100).toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
