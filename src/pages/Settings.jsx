import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaUserAlt } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { IoNotifications, IoLaptop  } from "react-icons/io5";


const Settings = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    // Account Settings
    profileVisibility: "public",
    language: "english",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    passwordUpdateRequired: false,
    sessionTimeout: 30,
    
    // Communication Settings
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    newsletter: false,
    marketingEmails: false,
    
    // Device Management
    currentDevices: [
      {
        id: 1,
        device: "Chrome on Windows",
        location: "New York, USA",
        lastActive: "2 hours ago",
        current: true
      },
      {
        id: 2,
        device: "Safari on iPhone",
        location: "Chicago, USA",
        lastActive: "3 days ago",
        current: false
      }
    ]
  });

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const revokeDevice = (deviceId) => {
    setSettings(prev => ({
      ...prev,
      currentDevices: prev.currentDevices.filter(device => device.id !== deviceId)
    }));
  };

  const tabs = [
    { id: "account", label: "Account Settings", icon: <FaUserAlt/> },
    { id: "security", label: "Security", icon: <RiLock2Fill /> },
    { id: "communication", label: "Notifications", icon: <IoNotifications /> },
    { id: "devices", label: "Devices", icon: <IoLaptop /> }
  ];

  return (
    <div className="min-h-screen bg-secondary-300">
      <Header bgClass="bg-black"/>
      <div className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings</h1>
            <p className="text-neutral-600">Manage your account settings and preferences</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg">
            {/* Tab Navigation */}
            <div className="border-b border-neutral-200">
              <nav className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                  >
                    <span className="mr-2 text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Account Settings */}
              {activeTab === "account" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-800">Account Preferences</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Profile Visibility</label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => handleSettingChange('account', 'profileVisibility', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="public">Public</option>
                        <option value="connections">Connections Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => handleSettingChange('account', 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange('account', 'timezone', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="UTC-5">EST (UTC-5)</option>
                        <option value="UTC-6">CST (UTC-6)</option>
                        <option value="UTC-7">MST (UTC-7)</option>
                        <option value="UTC-8">PST (UTC-8)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Date Format</label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => handleSettingChange('account', 'dateFormat', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-200">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md">
                      Save Account Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-800">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Two-Factor Authentication</h3>
                        <p className="text-sm text-neutral-600">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={() => handleToggle('twoFactorAuth')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Login Alerts</h3>
                        <p className="text-sm text-neutral-600">Get notified of new sign-ins</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.loginAlerts}
                          onChange={() => handleToggle('loginAlerts')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Require Password Update</h3>
                        <p className="text-sm text-neutral-600">Force password change every 90 days</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.passwordUpdateRequired}
                          onChange={() => handleToggle('passwordUpdateRequired')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="p-4 border border-neutral-200 rounded-lg">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Session Timeout</label>
                      <select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never (not recommended)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-200">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md">
                      Update Security Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Communication Settings */}
              {activeTab === "communication" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-800">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Email Notifications</h3>
                        <p className="text-sm text-neutral-600">Receive important updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={() => handleToggle('emailNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Push Notifications</h3>
                        <p className="text-sm text-neutral-600">Get instant alerts on your device</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={() => handleToggle('pushNotifications')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Job Alerts</h3>
                        <p className="text-sm text-neutral-600">Notifications about new job matches</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.jobAlerts}
                          onChange={() => handleToggle('jobAlerts')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Newsletter</h3>
                        <p className="text-sm text-neutral-600">Weekly updates and industry insights</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.newsletter}
                          onChange={() => handleToggle('newsletter')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-neutral-800">Marketing Emails</h3>
                        <p className="text-sm text-neutral-600">Promotional offers and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.marketingEmails}
                          onChange={() => handleToggle('marketingEmails')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-200">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md">
                      Save Notification Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Device Management */}
              {activeTab === "devices" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-neutral-800">Active Devices</h2>
                  <p className="text-neutral-600">Manage devices that are logged into your account</p>
                  
                  <div className="space-y-4">
                    {settings.currentDevices.map((device) => (
                      <div key={device.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-800">{device.device}</h3>
                          <p className="text-sm text-neutral-600">
                            {device.location} • Last active: {device.lastActive}
                            {device.current && <span className="ml-2 text-primary-600">• Current device</span>}
                          </p>
                        </div>
                        {!device.current && (
                          <button
                            onClick={() => revokeDevice(device.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            Revoke Access
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-neutral-200">
                    <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md">
                      Sign Out All Devices
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;