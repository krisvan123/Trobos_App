"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  User,
  Car,
  ShieldCheck,
  CreditCard,
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

  const menuSections = [
    {
      title: "Layanan & Armada",
      items: [
        {
          label: "Kendaraan Terdaftar",
          href: "/app/vehicles",
          icon: Car,
          badge: "2 Mobil",
        },
        {
          label: "Metode Pembayaran",
          href: "#",
          icon: CreditCard,
          badge: "QRIS / GoPay",
        },
      ],
    },
    {
      title: "Keamanan & Pengaturan",
      items: [
        {
          label: "Pusat Keamanan & Polis Asuransi",
          href: "/app/safety",
          icon: ShieldCheck,
          badge: "Terproteksi",
        },
        {
          label: "Notifikasi & Pengingat",
          href: "/app/notifications",
          icon: Bell,
        },
        {
          label: "Pusat Bantuan & Syarat Layanan",
          href: "/app/help",
          icon: HelpCircle,
        },
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto w-full space-y-6">
      {/* Profile Header Card */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-xl flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-orange-500 shadow-md"
        />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-black text-white">{user.name}</h2>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{user.phone}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[11px] font-bold">
              <Star className="w-3 h-3 fill-amber-300" /> {user.rating} Rating
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              VIP Member
            </span>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-4">
        {menuSections.map((sec, idx) => (
          <div key={idx} className="space-y-1.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              {sec.title}
            </h3>
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl overflow-hidden divide-y divide-slate-700/40">
              {sec.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    className="p-3.5 flex items-center justify-between hover:bg-slate-800 transition text-slate-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition" />
                      <span className="text-xs font-bold">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => router.push("/login")}
        className="w-full py-3.5 rounded-2xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 text-red-400 font-bold text-xs flex items-center justify-center gap-2 transition"
      >
        <LogOut className="w-4 h-4" />
        <span>Keluar dari Akun Trobos</span>
      </button>
    </div>
  );
}
