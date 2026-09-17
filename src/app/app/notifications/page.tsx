"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { Bell, ShieldCheck, CheckCircle2, Zap, Clock, Check } from "lucide-react";

export default function NotificationsPage() {
  const notifications = useTrobosStore((s) => s.notifications);
  const markNotificationAsRead = useTrobosStore((s) => s.markNotificationAsRead);

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pemberitahuan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Update status real-time mengenai Tandem dan armada Anda.
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => {
          return (
            <div
              key={notif.id}
              onClick={() => markNotificationAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                !notif.read
                  ? "bg-slate-800/90 border-slate-700 shadow-md"
                  : "bg-slate-800/40 border-slate-800 text-slate-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.type === "alert"
                    ? "bg-orange-500/20 text-[#FF5500]"
                    : notif.type === "success"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {notif.type === "alert" ? (
                  <Zap className="w-5 h-5" />
                ) : notif.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <ShieldCheck className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-bold truncate ${
                      !notif.read ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 shrink-0 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {notif.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-[#FF5500] shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
