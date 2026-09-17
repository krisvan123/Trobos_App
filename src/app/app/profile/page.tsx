"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  Car,
  ShieldCheck,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const user = useTrobosStore((s) => s.user);

  const menuItems = [
    { label: "Kendaraan Saya", href: "/app/vehicles", icon: Car, badge: "2 Mobil" },
    { label: "Pusat Keamanan & Polis", href: "/app/safety", icon: ShieldCheck, badge: "Aktif" },
    { label: "Notifikasi", href: "/app/notifications", icon: Bell },
    { label: "Pusat Bantuan & FAQ", href: "/app/help", icon: HelpCircle },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-xl mx-auto w-full space-y-5">
      {/* Profile Card */}
      <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-3.5">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover border border-slate-200"
        />
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-black text-slate-900 truncate">{user.name}</h2>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          </div>
          <p className="text-xs text-slate-500 font-mono">{user.phone}</p>
          <div className="flex items-center gap-2 mt-1.5 text-xs">
            <span className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
              <Star className="w-3 h-3 fill-amber-400" /> {user.rating} Rating
            </span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-1">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
          Pengaturan & Layanan
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-sm">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                href={item.href}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => router.push("/login")}
        className="w-full py-3 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center gap-2 transition"
      >
        <LogOut className="w-4 h-4" />
        <span>Keluar dari Akun</span>
      </button>
    </div>
  );
}
