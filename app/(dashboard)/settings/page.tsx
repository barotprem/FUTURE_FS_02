'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Lock, Users, FileText, Zap } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Acme Corporation',
    email: 'admin@acmecorp.com',
    phone: '+1 (555) 123-4567',
    timezone: 'EST',
    language: 'English',
    emailNotifications: true,
    slackNotifications: false,
    twoFactorAuth: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Organization Settings */}
      <div className="grid gap-6">
        {/* Company Information */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <FileText className="h-5 w-5 text-primary" />
              Organization
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your organization's basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Company Name</label>
              <Input
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="mt-1 border border-border bg-card text-foreground"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="mt-1 border border-border bg-card text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <Input
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="mt-1 border border-border bg-card text-foreground"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
                >
                  <option>EST</option>
                  <option>CST</option>
                  <option>MST</option>
                  <option>PST</option>
                  <option>GMT</option>
                  <option>IST</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Language</label>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Portuguese</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="h-5 w-5 rounded border border-border"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Slack Notifications</p>
                <p className="text-sm text-muted-foreground">Send alerts to your Slack workspace</p>
              </div>
              <input
                type="checkbox"
                name="slackNotifications"
                checked={settings.slackNotifications}
                onChange={handleChange}
                className="h-5 w-5 rounded border border-border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Lock className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={handleChange}
                className="h-5 w-5 rounded border border-border"
              />
            </div>

            <Button 
              variant="outline"
              className="w-full border-border text-foreground hover:bg-secondary"
            >
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Users className="h-5 w-5 text-primary" />
              Team Management
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage team members and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium text-foreground">admin@acmecorp.com</p>
                  <p className="text-sm text-muted-foreground">Owner</p>
                </div>
                <span className="text-xs font-semibold text-green-600">Active</span>
              </div>
            </div>
            <Button 
              variant="outline"
              className="mt-4 w-full border-border text-foreground hover:bg-secondary"
            >
              <Users className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Zap className="h-5 w-5 text-primary" />
              Integrations
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Connect with external tools and services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Slack</p>
                <p className="text-sm text-muted-foreground">Get notifications in Slack</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Connect
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Google Calendar</p>
                <p className="text-sm text-muted-foreground">Sync follow-up dates</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button 
            variant="outline"
            className="border-border text-foreground hover:bg-secondary"
          >
            Discard Changes
          </Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
