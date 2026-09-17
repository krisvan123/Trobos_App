"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { TripHistoryItem } from "@/types/trobos";
import { formatRupiah, formatDateIndo, formatDistance } from "@/lib/formatters";
import {
  Clock,
  MapPin,
  Car,
  Bike,
  Star,
  Receipt,
  CheckCircle2,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

export default function TripsPage() {
  const tripHistory = useTrobosStore((s) => s.tripHistory);
  const [selectedTrip, setSelectedTrip] = useState<TripHistoryItem | null>(null);
  const [filter, setFilter] = useState<"All" | "Completed" | "Cancelled">("All");

  const filteredTrips = tripHistory.filter((t) => {
    if (filter === "Completed") return t.status === "Completed";
    if (filter === "Cancelled") return t.status === "Cancelled";
    return true;
  });

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Riwayat Perjalanan Trobos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Daftar misi evakuasi kemacetan dan status serah terima mobil Anda.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/80 text-xs">
          {(["All", "Completed", "Cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filter === tab
                  ? "bg-[#FF5500] text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "All" ? "Semua" : tab === "Completed" ? "Selesai" : "Batal"}
            </button>
          ))}
        </div>
      </div>

      {/* List of Trip Cards */}
      {filteredTrips.length === 0 ? (
        <div className="p-12 text-center bg-slate-800/40 border border-slate-800 rounded-3xl">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-300">
            Belum Ada Riwayat Perjalanan
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Gunakan tombol Trobos Sekarang saat Anda terjebak macet untuk memulai misi pertama.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-600 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition cursor-pointer shadow-lg group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-orange-400">
                    {trip.id}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">
                    {formatDateIndo(trip.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                    {trip.status === "Completed" ? "Selesai & Aman" : "Dibatalkan"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                </div>
              </div>

              {/* Origin -> Destination Flow */}
              <div className="py-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5500] mt-1 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Titik Jemput (Macet)
                      </div>
                      <div className="text-sm font-bold text-white">
                        {trip.origin}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Tujuan Penyelamatan
                      </div>
                      <div className="text-sm font-bold text-white">
                        {trip.destination}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col justify-between sm:justify-end items-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-700/40">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      Total Tarif
                    </div>
                    <div className="text-lg font-black text-[#FF5500]">
                      {formatRupiah(trip.fare)}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1">
                    <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-300">
                      {trip.vehiclePlate}
                    </span>
                    <span>• {formatDistance(trip.distanceKm)}</span>
                  </div>
                </div>
              </div>

              {/* Tandem Crew & Rating */}
              <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-slate-300">{trip.riderName}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-slate-300">{trip.driverName}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-white">{trip.rating}.0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trip Detail Drawer / Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-bold text-white">
                Rincian Trobos #{selectedTrip.id}
              </h3>
            </div>

            <div className="space-y-3 text-xs bg-slate-800/70 p-4 rounded-2xl border border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400">Tanggal Transaksi</span>
                <span className="font-semibold text-slate-200">
                  {formatDateIndo(selectedTrip.date)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Jarak Tempuh</span>
                <span className="font-semibold text-slate-200">
                  {formatDistance(selectedTrip.distanceKm)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kendaraan Anda</span>
                <span className="font-semibold text-slate-200">
                  Honda Civic ({selectedTrip.vehiclePlate})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rider Penyelamat</span>
                <span className="font-semibold text-slate-200">
                  {selectedTrip.riderName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Driver Mobil</span>
                <span className="font-semibold text-slate-200">
                  {selectedTrip.driverName} (SIM A Verified)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Asuransi All-Risk</span>
                <span className="font-semibold text-emerald-400">
                  Aktif & Terlindungi Penuh
                </span>
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between text-sm font-bold">
                <span>Total Pembayaran</span>
                <span className="text-[#FF5500]">
                  {formatRupiah(selectedTrip.fare)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTrip(null)}
              className="mt-5 w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Tutup Rincian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
