import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { currentUser } from '../data/mockData';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'Acme Corporation',
    defaultCategory: 'Software Development',
    maxFileSize: 5,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newCandidateAlert: true,
    weeklyDigest: false,
  });
  
  const [profileSettings, setProfileSettings] = useState({
    name: currentUser.name,
    email: currentUser.email,
    role: currentUser.role,
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setProfileSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate saving settings
    console.log('Settings saved:', {
      general: generalSettings,
      notifications: notificationSettings,
      profile: profileSettings,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your preferences and account settings</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* General Settings */}
        <Card>
          <form onSubmit={saveSettings}>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Company Name"
                name="companyName"
                value={generalSettings.companyName}
                onChange={handleGeneralChange}
              />
              
              <div>
                <label htmlFor="defaultCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Default Category
                </label>
                <select
                  id="defaultCategory"
                  name="defaultCategory"
                  value={generalSettings.defaultCategory}
                  onChange={handleGeneralChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="Software Development">Software Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              
              <Input
                label="Maximum File Size (MB)"
                name="maxFileSize"
                type="number"
                min={1}
                max={20}
                value={generalSettings.maxFileSize}
                onChange={handleGeneralChange}
              />
            </CardContent>
            <CardFooter className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Notification Settings */}
        <Card>
          <form onSubmit={saveSettings}>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="emailNotifications" className="ml-3 text-sm font-medium text-gray-700">
                    Enable email notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="newCandidateAlert"
                    name="newCandidateAlert"
                    type="checkbox"
                    checked={notificationSettings.newCandidateAlert}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="newCandidateAlert" className="ml-3 text-sm font-medium text-gray-700">
                    New candidate alerts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="weeklyDigest"
                    name="weeklyDigest"
                    type="checkbox"
                    checked={notificationSettings.weeklyDigest}
                    onChange={handleNotificationChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="weeklyDigest" className="ml-3 text-sm font-medium text-gray-700">
                    Weekly activity digest
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Profile Settings */}
        <Card>
          <form onSubmit={saveSettings}>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser.avatar}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, GIF or PNG. Max size 1MB.
                  </p>
                </div>
              </div>
              
              <Input
                label="Name"
                name="name"
                value={profileSettings.name}
                onChange={handleProfileChange}
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={profileSettings.email}
                onChange={handleProfileChange}
              />
              
              <Input
                label="Role"
                name="role"
                value={profileSettings.role}
                onChange={handleProfileChange}
                disabled
                helperText="Contact an administrator to change your role"
              />
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 bg-gray-50 p-4 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Settings;