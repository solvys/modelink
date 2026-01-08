"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MessageCircle,
  Calendar,
  Bell,
  Briefcase,
  Award,
  Check,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockNotifications, type Notification } from "@/data/mockNotifications";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons: Record<Notification["type"], React.ReactNode> = {
  message: <MessageCircle className="w-4 h-4" />,
  booking: <Calendar className="w-4 h-4" />,
  system: <Bell className="w-4 h-4" />,
  opportunity: <Briefcase className="w-4 h-4" />,
  milestone: <Award className="w-4 h-4" />,
};

const typeColors: Record<Notification["type"], string> = {
  message: "bg-blue-500/20 text-blue-300",
  booking: "bg-emerald-500/20 text-emerald-300",
  system: "bg-gray-500/20 text-gray-300",
  opportunity: "bg-violet-500/20 text-violet-300",
  milestone: "bg-amber-500/20 text-amber-300",
};

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] pointer-events-auto"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[72px] right-4 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 z-[61] w-[calc(100%-2rem)] sm:w-[400px] max-h-[70vh] rounded-2xl border border-[--border-muted] bg-[#1a1a1a] backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[--border-subtle]">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-white/60" />
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    onClick={() => setNotifications([])}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-white/60 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[calc(70vh-60px)]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="w-10 h-10 text-white/20 mb-3" />
                  <p className="text-sm text-white/50">No notifications yet</p>
                  <p className="text-xs text-white/30 mt-1">
                    We'll notify you when something arrives
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[--border-subtle]">
                  {notifications.map((notification) => {
                    const handleNotificationClick = () => {
                      if (!notification.read) markAsRead(notification.id);
                      if (notification.actionUrl) onClose();
                    };

                    const NotificationContent = (
                      <>
                        {/* Icon or Avatar */}
                        <div className="flex-shrink-0">
                          {notification.avatar ? (
                            <img
                              src={notification.avatar}
                              alt=""
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                typeColors[notification.type]
                              )}
                            >
                              {typeIcons[notification.type]}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={cn(
                                "text-sm font-medium",
                                notification.read ? "text-white/70" : "text-white"
                              )}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-white/50 mt-0.5 line-clamp-2">
                            {notification.description}
                          </p>
                          <p className="text-[10px] text-white/30 mt-1">
                            {notification.timestamp}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex-shrink-0 flex items-start gap-1">
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-1.5 rounded-lg text-white/40 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              clearNotification(notification.id);
                            }}
                            className="p-1.5 rounded-lg text-white/40 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                            title="Dismiss"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    );

                    const itemClass = cn(
                      "flex gap-3 p-4 transition-colors",
                      !notification.read && "bg-white/[0.03]",
                      "hover:bg-white/[0.06] cursor-pointer"
                    );

                    return notification.actionUrl ? (
                      <Link
                        key={notification.id}
                        to={notification.actionUrl}
                        onClick={handleNotificationClick}
                        className={itemClass}
                      >
                        {NotificationContent}
                      </Link>
                    ) : (
                      <div
                        key={notification.id}
                        onClick={handleNotificationClick}
                        className={itemClass}
                      >
                        {NotificationContent}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

