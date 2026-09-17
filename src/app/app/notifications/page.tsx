"use client";

import React from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { Bell, ShieldCheck, CheckCircle2, Zap, Clock } from "lucide-react";

export default function NotificationsPage() {
  const notifications = useTrobosStore((s) => s.notifications);
  const markNotificationAsRead = useTrobosStore((s) => s.markNotificationAsRead);

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto w-full space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Pemberitahuan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Informasi status penjemputan dan keamanan kendaraan Anda.
        </p>
      </div>

      <div className="space-y-2.5">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markNotificationAsRead(notif.id)}
            className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 shadow-sm ${
              !notif.read
                ? "bg-white border-slate-200"
                : "bg-slate-50/80 border-slate-200 text-slate-500"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                notif.type === "alert"
                  ? "bg-orange-50 text-[#FF4D00]"
                  : notif.type === "success"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {notif.type === "alert" ? (
                <Zap className="w-4 h-4" />
              ) : notif.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <h4 className={`text-xs font-bold truncate ${!notif.read ? "text-slate-900" : "text-slate-600"}`}>
                  {notif.title}
                </h4>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {notif.message}
              </p>
            </div>

            {!notif.read && (
              <div className="w-2 h-2 rounded-full bg-[#FF4D00] shrink-0 mt-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
