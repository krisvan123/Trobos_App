"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTrobosStore } from "@/store/useTrobosStore";
import {
  User,
  Car,
  ShieldCheck,
  PhoneCall,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  Shield,
  X,
} from "lucide-react";
import { LogoutConfirmModal } from "@/components/common/LogoutConfirmModal";

export default function ProfilePage() {
  const user = useTrobosStore((s) => s.user);
  const vehicles = useTrobosStore((s) => s.vehicles);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings State
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <div className="p-4 sm:p-8 max-w-xl mx-auto w-full space-y-6">
      {/* Header: User Profile Overview */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border border-slate-200"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-slate-900 truncate">{user.name}</h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Terverifikasi
            </span>
          </div>
          <div className="text-xs text-slate-500 font-mono mt-0.5">{user.phone}</div>
          <div className="text-xs text-slate-400 truncate">{user.email}</div>
        </div>
      </div>

      {/* SECTION 1: ACCOUNT */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          ACCOUNT
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-card">
          <button
            type="button"
            onClick={() => setIsPersonalInfoOpen(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800 text-left"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-900">Personal Information</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs text-slate-500">Lengkap</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* SECTION 2: VEHICLE */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          VEHICLE
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-card">
          <Link
            href="/app/vehicles"
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800"
          >
            <div className="flex items-center gap-3">
              <Car className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-900">My Vehicle</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {vehicles.length} Mobil Terdaftar
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </Link>
        </div>
      </div>

      {/* SECTION 3: SAFETY */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          SAFETY
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-card">
          <Link
            href="/app/safety"
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900">Safety Center</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Proteksi Aktif
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </Link>

          <Link
            href="/app/safety"
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-900">Emergency Contact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 truncate max-w-[140px]">
                {user.emergencyContact.name}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </Link>
        </div>
      </div>

      {/* SECTION 4: APP */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          APP
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-card">
          <Link
            href="/app/notifications"
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-900">Notifications</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800 text-left"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-900">Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <Link
            href="/app/help"
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition text-slate-800"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-900">Help Center</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Siaga 24 Jam</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </Link>
        </div>
      </div>

      {/* BOTTOM: KELUAR */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full py-3.5 rounded-2xl border border-red-200 bg-white hover:bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-2 transition shadow-subtle"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div>

      {/* Personal Information Modal */}
      {isPersonalInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-modal relative space-y-4">
            <button
              onClick={() => setIsPersonalInfoOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900">
              Personal Information
            </h3>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Nama Lengkap</span>
                <span className="font-bold text-slate-900">{user.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Nomor Telepon</span>
                <span className="font-mono font-semibold text-slate-800">{user.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email</span>
                <span className="font-semibold text-slate-800">{user.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Status Kependudukan</span>
                <span className="font-semibold text-emerald-700">KTP Terverifikasi (Dukcapil)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPersonalInfoOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-modal relative space-y-4">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900">
              App Settings
            </h3>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Notifikasi Push</div>
                  <div className="text-slate-500 text-[11px]">Pemberitahuan posisi unit towing & derek</div>
                </div>
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                  className="accent-[#FF4D00] w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">Peringatan SMS Darurat</div>
                  <div className="text-slate-500 text-[11px]">Kirim SMS bila koneksi hilang</div>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="accent-[#FF4D00] w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Simpan & Tutup
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
