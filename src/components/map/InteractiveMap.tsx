"use client";

import React, { useState } from "react";
import { Plus, Minus, Crosshair, AlertCircle } from "lucide-react";
import { TripStatus } from "@/types/trobos";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  status?: TripStatus;
  userProgress?: number; // 0 - 100
  carProgress?: number;  // 0 - 100
  originName?: string;
  destinationName?: string;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  status = "IDLE",
  userProgress = 0,
  carProgress = 0,
  originName = "Jl. Sudirman Kav. 28",
  destinationName = "Pacific Place / SCBD",
  className,
}) => {
  const [zoom, setZoom] = useState(1);

  // SVG Coordinates (viewBox 0 0 1000 700)
  // Origin (Sudirman Kav 28): (520, 320)
  // Destination (SCBD): (340, 540)
  const originCoord = { x: 520, y: 320 };
  const destCoord = { x: 340, y: 540 };

  // Motorbike route calculation (fast shortcut)
  const motorProgressRatio = Math.min(Math.max(userProgress / 100, 0), 1);
  const motorPos = {
    x: originCoord.x + (destCoord.x - originCoord.x) * motorProgressRatio - Math.sin(motorProgressRatio * Math.PI) * 40,
    y: originCoord.y + (destCoord.y - originCoord.y) * motorProgressRatio,
  };

  // Car route calculation (arterial detour)
  const carProgressRatio = Math.min(Math.max(carProgress / 100, 0), 1);
  const carPos = {
    x: originCoord.x + (destCoord.x - originCoord.x) * carProgressRatio + Math.sin(carProgressRatio * Math.PI) * 60,
    y: originCoord.y + (destCoord.y - originCoord.y) * carProgressRatio,
  };

  // Tandem approaching position
  const tandemApproachingPos = {
    x: 660 - 140 * (status === "TANDEM_APPROACHING" ? 0.75 : status === "TANDEM_ARRIVED" ? 1 : 0.2),
    y: 210 + 110 * (status === "TANDEM_APPROACHING" ? 0.75 : status === "TANDEM_ARRIVED" ? 1 : 0.2),
  };

  const isTripActive = status === "TRIP_STARTED" || status === "USER_ARRIVED" || status === "VEHICLE_ARRIVED";
  const isSearching = status === "SEARCHING_TANDEM";
  const isApproaching = status === "TANDEM_ASSIGNED" || status === "TANDEM_APPROACHING" || status === "TANDEM_ARRIVED";

  return (
    <div className={cn("relative w-full h-full bg-[#EBF0F5] overflow-hidden select-none", className)}>
      {/* Clean Light Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 shadow-sm">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.15, 1.6))}
          className="w-9 h-9 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 active:scale-95 transition"
          aria-label="Perbesar Peta"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.15, 0.85))}
          className="w-9 h-9 rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 active:scale-95 transition"
          aria-label="Perkecil Peta"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="w-9 h-9 rounded-xl bg-white text-[#FF4D00] border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 active:scale-95 transition"
          title="Pusatkan Posisi"
          aria-label="Pusatkan Posisi"
        >
          <Crosshair className="w-4 h-4" />
        </button>
      </div>

      {/* Traffic Status Tag (Calm, non-distracting) */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 border border-slate-200 text-slate-700 text-xs font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>Lalu Lintas: Sudirman Macet Padat</span>
        </div>
      </div>

      {/* Realistic Light Urban Map SVG */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Soft Traffic Gradient */}
            <linearGradient id="trafficGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
            {/* Route Polyline Gradients */}
            <linearGradient id="motorRouteLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <linearGradient id="carRouteLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Light Ground Terrain */}
          <rect width="1000" height="700" fill="#EEF2F6" />

          {/* Urban City Blocks (Clean White/Warm Slate) */}
          <g fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1">
            <rect x="50" y="50" width="220" height="180" rx="8" />
            <rect x="310" y="50" width="160" height="180" rx="8" />
            <rect x="570" y="50" width="230" height="170" rx="8" />
            <rect x="830" y="60" width="150" height="180" rx="8" />

            <rect x="50" y="270" width="210" height="180" rx="8" />
            <rect x="670" y="260" width="280" height="180" rx="8" />

            <rect x="50" y="490" width="220" height="170" rx="8" />
            <rect x="670" y="480" width="280" height="180" rx="8" />

            {/* SCBD Commercial District Blocks */}
            <rect x="300" y="470" width="150" height="140" rx="10" fill="#F8FAFC" stroke="#CBD5E1" />
            <rect x="470" y="480" width="160" height="130" rx="10" fill="#F8FAFC" stroke="#CBD5E1" />
          </g>

          {/* Natural Green Parks (GBK Senayan) */}
          <rect x="290" y="260" width="180" height="180" rx="20" fill="#E2EEDD" stroke="#C8DFBE" strokeWidth="1.5" />
          <circle cx="380" cy="350" r="50" fill="#D5E8CE" stroke="#BAD9AE" strokeWidth="1.5" />
          <text x="380" y="354" fill="#3B6B35" fontSize="11" fontWeight="700" textAnchor="middle">
            GBK Senayan
          </text>

          {/* Minor Road Grid */}
          <g stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round">
            <line x1="160" y1="20" x2="160" y2="680" />
            <line x1="880" y1="20" x2="880" y2="680" />
            <line x1="30" y1="150" x2="970" y2="150" />
            <line x1="30" y1="460" x2="970" y2="460" />
          </g>

          {/* Major Highway: Gatot Subroto */}
          <path
            d="M 30 400 Q 500 385 970 400"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 30 400 Q 500 385 970 400"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Main Avenue: Jl. Jend. Sudirman */}
          <path
            d="M 520 30 L 520 670"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M 520 30 L 520 670"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Semanggi Interchange */}
          <ellipse cx="520" cy="390" rx="55" ry="35" fill="none" stroke="#CBD5E1" strokeWidth="10" />
          <ellipse cx="520" cy="390" rx="55" ry="35" fill="none" stroke="#FFFFFF" strokeWidth="6" />

          {/* Realistic Traffic Stripe on Sudirman (Moderate red) */}
          <path
            d="M 520 180 L 520 460"
            fill="none"
            stroke="url(#trafficGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Clean Road Labels */}
          <g fill="#94A3B8" fontSize="10" fontWeight="600">
            <text x="532" y="100">JL. MH THAMRIN</text>
            <text x="532" y="240">JL. JEND. SUDIRMAN</text>
            <text x="532" y="630">BLOK M</text>
            <text x="340" y="525" fill="#0F172A" fontWeight="700">SCBD LOT 8</text>
          </g>

          {/* ACTIVE DUAL ROUTE POLYLINES */}
          {isTripActive && (
            <g>
              {/* Motorbike shortcut route (Blue) */}
              <path
                d={`M ${originCoord.x} ${originCoord.y} Q 450 400 ${destCoord.x} ${destCoord.y}`}
                fill="none"
                stroke="url(#motorRouteLine)"
                strokeWidth="5"
                strokeDasharray="7 4"
                strokeLinecap="round"
              />
              {/* Car arterial route (Amber) */}
              <path
                d={`M ${originCoord.x} ${originCoord.y} Q 570 420 450 500 L ${destCoord.x} ${destCoord.y}`}
                fill="none"
                stroke="url(#carRouteLine)"
                strokeWidth="4"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* SEARCHING TANDEM: GENTLE RADAR CIRCLE */}
          {isSearching && (
            <g transform={`translate(${originCoord.x}, ${originCoord.y})`}>
              <circle r="120" fill="#FF4D00" fillOpacity="0.08" />
              <circle r="70" fill="#FF4D00" fillOpacity="0.12" />
              <circle r="120" fill="none" stroke="#FF4D00" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
            </g>
          )}

          {/* DESTINATION PIN */}
          <g transform={`translate(${destCoord.x}, ${destCoord.y})`}>
            <circle r="14" fill="#10B981" />
            <circle r="5" fill="#FFFFFF" />
            {/* Label Card */}
            <g transform="translate(0, -22)">
              <rect x="-45" y="-12" width="90" height="18" rx="6" fill="#0F172A" />
              <text x="0" y="1" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
                Tujuan: {destinationName.split("/")[0]}
              </text>
            </g>
          </g>

          {/* USER PICKUP PIN */}
          <g transform={`translate(${originCoord.x}, ${originCoord.y})`}>
            <circle r="16" fill="#FF4D00" fillOpacity="0.2" className="animate-ping" />
            <circle r="12" fill="#FF4D00" />
            <circle r="4" fill="#FFFFFF" />
            {/* Label Card */}
            <g transform="translate(0, 26)">
              <rect x="-60" y="-12" width="120" height="18" rx="6" fill="#0F172A" />
              <text x="0" y="1" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
                Titik Anda: {originName.split("Kav")[0]}
              </text>
            </g>
          </g>

          {/* TANDEM APPROACHING PIN */}
          {isApproaching && (
            <g transform={`translate(${tandemApproachingPos.x}, ${tandemApproachingPos.y})`}>
              <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#0F172A" stroke="#FF4D00" strokeWidth="2" />
              <text x="0" y="4" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle">
                ⚡
              </text>
              <g transform="translate(0, -22)">
                <rect x="-45" y="-12" width="90" height="18" rx="6" fill="#FF4D00" />
                <text x="0" y="1" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
                  Tandem (3 mnt)
                </text>
              </g>
            </g>
          )}

          {/* LIVE DUAL JOURNEY PINS */}
          {isTripActive && (
            <g>
              {/* YOU ON MOTORBIKE */}
              <g transform={`translate(${motorPos.x}, ${motorPos.y})`}>
                <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" shadow-sm="true" />
                <text x="0" y="4" fill="#FFFFFF" fontSize="12" textAnchor="middle">
                  🏍️
                </text>
                <g transform="translate(0, -22)">
                  <rect x="-40" y="-12" width="80" height="18" rx="6" fill="#0284C7" />
                  <text x="0" y="1" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
                    Anda (Motor)
                  </text>
                </g>
              </g>

              {/* YOUR CAR FOLLOWING */}
              <g transform={`translate(${carPos.x}, ${carPos.y})`}>
                <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="4" fill="#FFFFFF" fontSize="12" textAnchor="middle">
                  🚗
                </text>
                <g transform="translate(0, 26)">
                  <rect x="-46" y="-12" width="92" height="18" rx="6" fill="#B45309" />
                  <text x="0" y="1" fill="#FFFFFF" fontSize="9" fontWeight="700" textAnchor="middle">
                    Mobil Anda (Driver)
                  </text>
                </g>
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
