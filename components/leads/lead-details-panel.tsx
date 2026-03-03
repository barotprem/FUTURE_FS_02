'use client'

import { useState } from 'react'
import { Lead } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Phone, Mail, Calendar } from 'lucide-react'

interface LeadDetailsPanelProps {
  lead: Lead
  onClose: () => void
  onUpdate: (lead: Lead) => void
}

export default function LeadDetailsPanel({ lead, onClose, onUpdate }: LeadDetailsPanelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedLead, setEditedLead] = useState(lead)
  const [newNote, setNewNote] = useState('')

  const handleSave = () => {
    onUpdate(editedLead)
    setIsEditing(false)
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedLead = {
        ...editedLead,
        notes: editedLead.notes + '\n' + newNote,
      }
      setEditedLead(updatedLead)
      onUpdate(updatedLead)
      setNewNote('')
    }
  }

  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Qualified': 'bg-purple-100 text-purple-800',
    'Converted': 'bg-green-100 text-green-800',
    'Lost': 'bg-red-100 text-red-800',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl border border-border bg-card shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <CardTitle className="text-xl font-bold text-foreground">Lead Details</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Lead Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Information</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <div className="mt-1 text-foreground font-medium">{editedLead.name}</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <select
                  value={editedLead.status}
                  onChange={(e) => setEditedLead({
                    ...editedLead,
                    status: e.target.value as Lead['status']
                  })}
                  className={`mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm ${statusColors[editedLead.status as keyof typeof statusColors]} font-medium`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="mt-1 text-foreground">{editedLead.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <div className="mt-1 text-foreground">{editedLead.phone}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Source</label>
                <div className="mt-1 text-foreground">{editedLead.source}</div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <div className="mt-1 text-foreground">{editedLead.createdAt.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-4 border-t border-border pt-6">
            <h3 className="font-semibold text-foreground">Notes</h3>
            
            <div className="rounded-lg border border-border bg-secondary p-4">
              <p className="text-sm text-foreground whitespace-pre-wrap">{editedLead.notes || 'No notes yet'}</p>
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Add a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="border border-border bg-card text-foreground placeholder-muted-foreground"
              />
              <Button 
                onClick={handleAddNote}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add Note
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 border-t border-border pt-6">
            <Button 
              variant="outline"
              onClick={onClose}
              className="border-border text-foreground hover:bg-secondary"
            >
              Close
            </Button>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
