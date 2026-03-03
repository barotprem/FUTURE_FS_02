'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { mockLeads } from '@/lib/mock-data'
import { Calendar, Clock, AlertCircle } from 'lucide-react'

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-purple-100 text-purple-800',
  'Converted': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800',
}

const priorityColors = {
  'High': 'bg-red-100 text-red-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'Low': 'bg-green-100 text-green-800',
}

export default function FollowUpsPage() {
  // Generate follow-up tasks
  const followUpTasks = mockLeads
    .filter(lead => lead.status !== 'Converted' && lead.status !== 'Lost')
    .map((lead, index) => ({
      id: `followup-${index}`,
      leadName: lead.name,
      email: lead.email,
      dueDate: new Date(lead.lastContacted ? new Date(lead.lastContacted).getTime() + (7 * 24 * 60 * 60 * 1000) : new Date().getTime() + (3 * 24 * 60 * 60 * 1000)),
      status: lead.status,
      priority: index % 2 === 0 ? 'High' : index % 3 === 0 ? 'Medium' : 'Low',
      task: `Follow up regarding ${lead.status === 'New' ? 'initial inquiry' : 'quote'}`,
    }))
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  const overdueTasks = followUpTasks.filter(t => t.dueDate < new Date())
  const todayTasks = followUpTasks.filter(t => {
    const today = new Date()
    return t.dueDate.toDateString() === today.toDateString()
  })
  const upcomingTasks = followUpTasks.filter(t => t.dueDate > new Date() && t.dueDate.toDateString() !== new Date().toDateString())

  return (
    <div className="space-y-6 p-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{overdueTasks.length}</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{todayTasks.length}</div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{upcomingTasks.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <Card className="border border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-900">Overdue Follow Ups</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-red-200 hover:bg-transparent">
                  <TableHead className="text-red-700">Lead Name</TableHead>
                  <TableHead className="text-red-700">Email</TableHead>
                  <TableHead className="text-red-700">Due Date</TableHead>
                  <TableHead className="text-red-700">Status</TableHead>
                  <TableHead className="text-red-700">Task</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overdueTasks.map((task) => (
                  <TableRow key={task.id} className="border-red-200 hover:bg-red-100/50">
                    <TableCell className="font-medium text-red-900">{task.leadName}</TableCell>
                    <TableCell className="text-red-700">{task.email}</TableCell>
                    <TableCell className="text-red-700">{task.dueDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[task.status as keyof typeof statusColors]} border-0`}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-red-700">{task.task}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Today's Tasks */}
      {todayTasks.length > 0 && (
        <Card className="border border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-yellow-900">Today's Follow Ups</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-yellow-200 hover:bg-transparent">
                  <TableHead className="text-yellow-700">Lead Name</TableHead>
                  <TableHead className="text-yellow-700">Email</TableHead>
                  <TableHead className="text-yellow-700">Due Date</TableHead>
                  <TableHead className="text-yellow-700">Status</TableHead>
                  <TableHead className="text-yellow-700">Task</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayTasks.map((task) => (
                  <TableRow key={task.id} className="border-yellow-200 hover:bg-yellow-100/50">
                    <TableCell className="font-medium text-yellow-900">{task.leadName}</TableCell>
                    <TableCell className="text-yellow-700">{task.email}</TableCell>
                    <TableCell className="text-yellow-700">{task.dueDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[task.status as keyof typeof statusColors]} border-0`}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-yellow-700">{task.task}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Tasks */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Upcoming Follow Ups</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingTasks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Lead Name</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Due Date</TableHead>
                  <TableHead className="text-muted-foreground">Priority</TableHead>
                  <TableHead className="text-muted-foreground">Task</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingTasks.map((task) => (
                  <TableRow key={task.id} className="border-border hover:bg-secondary/50">
                    <TableCell className="font-medium text-foreground">{task.leadName}</TableCell>
                    <TableCell className="text-muted-foreground">{task.email}</TableCell>
                    <TableCell className="text-muted-foreground">{task.dueDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={`${priorityColors[task.priority as keyof typeof priorityColors]} border-0`}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{task.task}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming follow-ups scheduled</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
