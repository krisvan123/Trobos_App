"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { Vehicle } from "@/types/trobos";
import {
  Car,
  Plus,
  ShieldCheck,
  Fuel,
  Check,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  X,
} from "lucide-react";

export default function VehiclesPage() {
  const vehicles = useTrobosStore((s) => s.vehicles);
  const activeVehicleId = useTrobosStore((s) => s.activeVehicleId);
  const setActiveVehicleId = useTrobosStore((s) => s.setActiveVehicleId);
  const addVehicle = useTrobosStore((s) => s.addVehicle);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand: "Toyota",
    model: "Fortuner VRZ",
    year: 2023,
    color: "Attitude Black",
    plate: "B 9999 PRO",
    fuelLevel: 75,
    type: "SUV" as const,
    transmission: "Automatic" as const,
  });

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const newVeh: Vehicle = {
      id: `veh_${Date.now()}`,
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      color: formData.color,
      plate: formData.plate.toUpperCase(),
      fuelLevel: Number(formData.fuelLevel),
      stnkVerified: true,
      type: formData.type,
      transmission: formData.transmission,
    };
    addVehicle(newVeh);
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kendaraan Terdaftar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Mobil yang telah diverifikasi STNK dan siap diambil alih oleh Driver Trobos.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] text-white text-xs font-bold shadow-emergency transition active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kendaraan Baru</span>
        </button>
      </div>

      {/* Grid of Registered Vehicles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {vehicles.map((v) => {
          const isActive = v.id === activeVehicleId;
          return (
            <div
              key={v.id}
              onClick={() => setActiveVehicleId(v.id)}
              className={`rounded-3xl p-5 border transition-all cursor-pointer relative shadow-lg ${
                isActive
                  ? "bg-slate-800/90 border-[#FF5500] ring-1 ring-[#FF5500]"
                  : "bg-slate-800/60 border-slate-700/70 hover:border-slate-600"
              }`}
            >
              {/* Active Badge */}
              {isActive && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Check className="w-3 h-3" /> Mobil Utama
                </span>
              )}

              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-700/80 border border-slate-600 flex items-center justify-center text-orange-400">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {v.brand} {v.model}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {v.color} • {v.year}
                  </div>
                </div>
              </div>

              {/* Specs & Plate */}
              <div className="space-y-2 text-xs bg-slate-900/60 p-3.5 rounded-2xl border border-slate-700/50">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Nomor Plat Polisi</span>
                  <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {v.plate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tipe & Transmisi</span>
                  <span className="font-semibold text-slate-200">
                    {v.type} ({v.transmission})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Level BBM Terakhir</span>
                  <span className="font-semibold text-amber-400 flex items-center gap-1">
                    <Fuel className="w-3 h-3" /> {v.fuelLevel}%
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-700/60 flex justify-between items-center text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-slate-400" /> STNK Digital
                  </span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi Asli
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-bold text-white">
                Daftarkan Kendaraan Baru
              </h3>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 mb-1">Merek Mobil</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Model & Varian</label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 mb-1">Nomor Plat (B 1234 XYZ)</label>
                  <input
                    type="text"
                    required
                    value={formData.plate}
                    onChange={(e) =>
                      setFormData({ ...formData, plate: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tahun Kendaraan</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: Number(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 mb-1">Tipe Bodi</label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="MPV">MPV</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Transmisi</label>
                  <select
                    value={formData.transmission}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        transmission: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Automatic">Automatic (Matic)</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dokumen STNK otomatis diverifikasi oleh sistem Trobos.</span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#E64C00] text-white font-bold"
                >
                  Simpan Mobil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
