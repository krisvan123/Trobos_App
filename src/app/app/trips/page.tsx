"use client";

import React, { useState } from "react";
import { useTrobosStore } from "@/store/useTrobosStore";
import { TripHistoryItem } from "@/types/trobos";
import { formatRupiah, formatDateIndo, formatDistance } from "@/lib/formatters";
import {
  Clock,
  Car,
  Bike,
  Star,
  Receipt,
  ChevronRight,
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
    <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Riwayat Perjalanan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Daftar perjalanan evakuasi macet dan penyerahan mobil Anda.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          {(["All", "Completed", "Cancelled"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                filter === tab
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab === "All" ? "Semua" : tab === "Completed" ? "Selesai" : "Batal"}
            </button>
          ))}
        </div>
      </div>

      {/* Trips List */}
      {filteredTrips.length === 0 ? (
        <div className="p-10 text-center bg-white border border-slate-200 rounded-3xl">
          <Clock className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">
            Belum Ada Riwayat Perjalanan
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Saat Anda menggunakan Trobos, perjalanan Anda akan tercatat rapi di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl p-4 transition cursor-pointer shadow-sm group"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">
                    {trip.id}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">
                    {formatDateIndo(trip.date)}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <span>Selesai & Aman</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                </div>
              </div>

              {/* Route snippet */}
              <div className="py-2.5 flex items-center justify-between text-xs">
                <div className="space-y-1 overflow-hidden pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF4D00] shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{trip.origin}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{trip.destination}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-slate-900">
                    {formatRupiah(trip.fare)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {formatDistance(trip.distanceKm)} • {trip.vehiclePlate}
                  </div>
                </div>
              </div>

              {/* Personnel Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Bike className="w-3 h-3 text-sky-600" />
                    <span>{trip.riderName}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Car className="w-3 h-3 text-amber-600" />
                    <span>{trip.driverName}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{trip.rating}.0</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Detail */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-xl relative">
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Receipt className="w-4 h-4 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">
                Rincian #{selectedTrip.id}
              </h3>
            </div>

            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Waktu</span>
                <span className="font-semibold text-slate-800">{formatDateIndo(selectedTrip.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jarak Tempuh</span>
                <span className="font-semibold text-slate-800">{formatDistance(selectedTrip.distanceKm)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kendaraan</span>
                <span className="font-semibold text-slate-800">{selectedTrip.vehiclePlate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rider</span>
                <span className="font-semibold text-slate-800">{selectedTrip.riderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Driver</span>
                <span className="font-semibold text-slate-800">{selectedTrip.driverName} (SIM A)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
                <span>Total Biaya</span>
                <span className="text-[#FF4D00]">{formatRupiah(selectedTrip.fare)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTrip(null)}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
