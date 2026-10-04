"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const logout = useTrobosStore((s) => s.logout);

  if (!isOpen) return null;

  const handleConfirmLogout = () => {
    logout();
    onClose();
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full shadow-modal text-left animate-in fade-in zoom-in-95 duration-150">
        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3.5">
          <LogOut className="w-5 h-5" />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          Keluar dari akun?
        </h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Sesi aktif Anda akan diakhiri. Anda perlu masuk kembali untuk mengakses pesanan dan data kendaraan Anda.
        </p>

        <div className="mt-5 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition shadow-sm"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};
