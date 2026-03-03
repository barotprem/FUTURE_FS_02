'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { mockLeads, type Lead } from '@/lib/mock-data'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import LeadDetailsPanel from '@/components/leads/lead-details-panel'
import AddLeadModal from '@/components/leads/add-lead-modal'

type SortField = 'name' | 'email' | 'source' | 'status' | 'createdAt'
type SortOrder = 'asc' | 'desc'

const statusColors = {
  'New': 'bg-blue-100 text-blue-800',
  'Contacted': 'bg-yellow-100 text-yellow-800',
  'Qualified': 'bg-purple-100 text-purple-800',
  'Converted': 'bg-green-100 text-green-800',
  'Lost': 'bg-red-100 text-red-800',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Sort leads
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let aVal: any = a[sortField]
    let bVal: any = b[sortField]

    if (sortField === 'createdAt') {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
    }

    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const handleAddLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>) => {
    const lead: Lead = {
      ...newLead,
      id: (Math.max(...leads.map(l => parseInt(l.id))) + 1).toString(),
      createdAt: new Date(),
    }
    setLeads([lead, ...leads])
    setShowAddModal(false)
  }

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l))
    setSelectedLead(updatedLead)
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-4 w-4 inline ml-1" /> : 
      <ChevronDown className="h-4 w-4 inline ml-1" />
  }

  return (
    <div className="space-y-6 p-6">
      {/* Filters and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-secondary text-foreground placeholder-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
          >
            <option value="all">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {sortedLeads.length} of {leads.length} leads
      </div>

      {/* Leads Table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead 
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('name')}
                  >
                    Name <SortIcon field="name" />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('email')}
                  >
                    Email <SortIcon field="email" />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('source')}
                  >
                    Source <SortIcon field="source" />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('status')}
                  >
                    Status <SortIcon field="status" />
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort('createdAt')}
                  >
                    Date <SortIcon field="createdAt" />
                  </TableHead>
                  <TableHead className="text-muted-foreground">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead) => (
                  <TableRow 
                    key={lead.id} 
                    className="border-border hover:bg-secondary/50 cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
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
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedLead(lead)
                        }}
                        className="text-primary hover:bg-primary/10"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Lead Details Panel */}
      {selectedLead && (
        <LeadDetailsPanel 
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
        />
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddLead}
        />
      )}
    </div>
  )
}
