export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  source: 'Website' | 'Email' | 'LinkedIn' | 'Referral' | 'Phone'
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
  notes: string
  createdAt: Date
  lastContacted?: Date
}

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 123-4567',
    source: 'LinkedIn',
    status: 'Qualified',
    notes: 'Interested in enterprise plan. Budget approved for Q2.',
    createdAt: new Date('2024-02-15'),
    lastContacted: new Date('2024-02-28'),
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@startup.io',
    phone: '+1 (555) 234-5678',
    source: 'Website',
    status: 'New',
    notes: 'Filled out demo request form yesterday.',
    createdAt: new Date('2024-02-28'),
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@agency.com',
    phone: '+1 (555) 345-6789',
    source: 'Referral',
    status: 'Contacted',
    notes: 'Referred by John Smith. Needs pricing info.',
    createdAt: new Date('2024-02-20'),
    lastContacted: new Date('2024-02-27'),
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'j.wilson@corp.com',
    phone: '+1 (555) 456-7890',
    source: 'Email',
    status: 'Converted',
    notes: 'Signed contract for 12-month commitment.',
    createdAt: new Date('2024-01-10'),
    lastContacted: new Date('2024-02-15'),
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lisa.park@marketing.co',
    phone: '+1 (555) 567-8901',
    source: 'Phone',
    status: 'Lost',
    notes: 'Budget constraints. Following up next quarter.',
    createdAt: new Date('2024-02-01'),
    lastContacted: new Date('2024-02-10'),
  },
  {
    id: '6',
    name: 'David Thompson',
    email: 'd.thompson@tech.com',
    phone: '+1 (555) 678-9012',
    source: 'LinkedIn',
    status: 'Qualified',
    notes: 'VP of Sales. Very interested in features.',
    createdAt: new Date('2024-02-22'),
    lastContacted: new Date('2024-02-26'),
  },
  {
    id: '7',
    name: 'Amanda Foster',
    email: 'amanda.f@business.net',
    phone: '+1 (555) 789-0123',
    source: 'Website',
    status: 'New',
    notes: 'Downloaded product guide.',
    createdAt: new Date('2024-02-27'),
  },
  {
    id: '8',
    name: 'Robert Martinez',
    email: 'r.martinez@enterprise.com',
    phone: '+1 (555) 890-1234',
    source: 'Referral',
    status: 'Contacted',
    notes: 'Referred by existing customer. Scheduling demo.',
    createdAt: new Date('2024-02-18'),
    lastContacted: new Date('2024-02-25'),
  },
]
