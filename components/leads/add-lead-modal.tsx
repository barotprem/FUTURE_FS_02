'use client'

import { useState } from 'react'
import { Lead } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'

interface AddLeadModalProps {
  onClose: () => void
  onAdd: (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContacted'>) => void
}

export default function AddLeadModal({ onClose, onAdd }: AddLeadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'Website' as Lead['source'],
    status: 'New' as Lead['status'],
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAdd(formData)
      setFormData({
        name: '',
        email: '',
        phone: '',
        source: 'Website',
        status: 'New',
        notes: '',
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md border border-border bg-card shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <CardTitle className="text-xl font-bold text-foreground">Add New Lead</CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter lead name"
                className={`mt-1 border ${errors.name ? 'border-destructive' : 'border-border'} bg-card text-foreground placeholder-muted-foreground`}
              />
              {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email *</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`mt-1 border ${errors.email ? 'border-destructive' : 'border-border'} bg-card text-foreground placeholder-muted-foreground`}
              />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone *</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={`mt-1 border ${errors.phone ? 'border-destructive' : 'border-border'} bg-card text-foreground placeholder-muted-foreground`}
              />
              {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
            </div>

            {/* Source */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
              >
                <option value="Website">Website</option>
                <option value="Email">Email</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Phone">Phone</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes about this lead"
                rows={3}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder-muted-foreground"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-border text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add Lead
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
