import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { RiLock2Fill } from "react-icons/ri";
import { IoNotifications, IoSettingsSharp   } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import { LuNotepadText } from "react-icons/lu";
import { FaBriefcase } from "react-icons/fa";





const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [activeFilter, setActiveFilter] = useState("all");
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "job_alert",
      title: "New Job Match: Frontend Developer",
      message: "A new position matching your skills has been posted at TechCorp Inc.",
      time: "2 hours ago",
      read: false,
      important: true
    },
    {
      id: 2,
      type: "application_update",
      title: "Application Status Updated",
      message: "Your application for Senior React Developer at StartupXYZ has moved to interview stage.",
      time: "1 day ago",
      read: true,
      important: true
    },
    {
      id: 3,
      type: "message",
      title: "New Message from Recruiter",
      message: "John Smith from Google wants to connect regarding potential opportunities.",
      time: "2 days ago",
      read: false,
      important: false
    },
    {
      id: 4,
      type: "system",
      title: "Profile Completion Reminder",
      message: "Complete your profile to increase your chances by 70%!",
      time: "3 days ago",
      read: true,
      important: false
    },
    {
      id: 5,
      type: "job_alert",
      title: "Remote Opportunities Available",
      message: "5 new remote positions match your preferences. Apply now!",
      time: "4 days ago",
      read: true,
      important: false
    },
    {
      id: 6,
      type: "security",
      title: "New Login Detected",
      message: "A new sign-in from Chrome on Windows in New York, USA.",
      time: "1 week ago",
      read: true,
      important: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !notification.read;
    if (activeFilter === "important") return notification.important;
    return notification.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const filters = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "important", label: "Important", count: notifications.filter(n => n.important).length },
    { id: "job_alert", label: "Job Alerts", count: notifications.filter(n => n.type === "job_alert").length },
    { id: "application_update", label: "Applications", count: notifications.filter(n => n.type === "application_update").length },
    { id: "message", label: "Messages", count: notifications.filter(n => n.type === "message").length }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "job_alert": return <FaBriefcase className="text-primary" />;
      case "application_update": return <LuNotepadText className="text-primary"/>;
      case "message": return <MdMessage className="text-primary" />;
      case "security": return <RiLock2Fill className="text-primary"/>;
      case "system": return <IoSettingsSharp className="text-primary" />;
      default: return <IoNotifications className="text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-300">
      <Header bgClass="bg-black"/>
      <div className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Notifications</h1>
                <p className="text-neutral-600">Stay updated with your job search activities</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 text-primary-600 hover:text-primary-800 font-medium"
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-red-600 hover:text-red-800 font-medium"
                >
                  Clear all
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="border-b border-neutral-200">
              <nav className="flex overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeFilter === filter.id
                        ? "border-primary-500 text-primary-600"
                        : "border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300"
                    }`}
                  >
                    {filter.label}
                    {filter.count > 0 && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        activeFilter === filter.id
                          ? "bg-primary-100 text-primary-800"
                          : "bg-neutral-100 text-neutral-800"
                      }`}>
                        {filter.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow-lg">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No notifications</h3>
                <p className="text-neutral-600">You're all caught up! New notifications will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-200">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-neutral-50 transition-colors ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl mt-1">{getNotificationIcon(notification.type)}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-medium ${
                            !notification.read ? "text-blue-900" : "text-neutral-900"
                          }`}>
                            {notification.title}
                          </h3>
                          <span className="text-sm text-neutral-500">{notification.time}</span>
                        </div>
                        
                        <p className={`mb-3 ${
                          !notification.read ? "text-blue-700" : "text-neutral-600"
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex gap-3">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredNotifications.length > 0 && (
            <div className="mt-6 text-center">
              <button className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50">
                Load more notifications
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;