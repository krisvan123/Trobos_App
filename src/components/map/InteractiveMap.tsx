"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  MapPin,
  Bike,
  Car,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { TripStatus } from "@/types/trobos";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  status?: TripStatus;
  userProgress?: number; // 0 - 100
  carProgress?: number;  // 0 - 100
  originName?: string;
  destinationName?: string;
  className?: string;
  showTrafficOverlay?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  status = "IDLE",
  userProgress = 0,
  carProgress = 0,
  originName = "Jl. Sudirman Kav. 28",
  destinationName = "Pacific Place / SCBD",
  className,
  showTrafficOverlay = true,
}) => {
  const [zoom, setZoom] = useState(1);
  const [showTraffic, setShowTraffic] = useState(showTrafficOverlay);

  // Map coordinates in SVG viewBox units (0 0 1000 700)
  // Origin: Sudirman Kav 28 ~ (500, 360)
  // Destination: SCBD ~ (320, 560)
  // Alternative: Thamrin ~ (500, 160)
  const originCoord = { x: 520, y: 340 };
  const destCoord = { x: 300, y: 550 };

  // Calculate current positions along the route
  // Motorbike route (direct bypass through alleys / busway corridor)
  const motorProgressRatio = Math.min(Math.max(userProgress / 100, 0), 1);
  const motorPos = {
    x: originCoord.x + (destCoord.x - originCoord.x) * motorProgressRatio - Math.sin(motorProgressRatio * Math.PI) * 45,
    y: originCoord.y + (destCoord.y - originCoord.y) * motorProgressRatio,
  };

  // Car route (arterial detour through Semanggi loop & Gatot Subroto)
  const carProgressRatio = Math.min(Math.max(carProgress / 100, 0), 1);
  const carPos = {
    x: originCoord.x + (destCoord.x - originCoord.x) * carProgressRatio + Math.sin(carProgressRatio * Math.PI) * 70,
    y: originCoord.y + (destCoord.y - originCoord.y) * carProgressRatio,
  };

  // Tandem approaching position (comes from Kuningan towards Sudirman)
  const tandemApproachingPos = {
    x: 680 - 160 * (status === "TANDEM_APPROACHING" ? 0.75 : status === "TANDEM_ARRIVED" ? 1 : 0.2),
    y: 220 + 120 * (status === "TANDEM_APPROACHING" ? 0.75 : status === "TANDEM_ARRIVED" ? 1 : 0.2),
  };

  const isTripActive = status === "TRIP_STARTED" || status === "USER_ARRIVED" || status === "VEHICLE_ARRIVED";
  const isSearching = status === "SEARCHING_TANDEM";
  const isApproaching = status === "TANDEM_ASSIGNED" || status === "TANDEM_APPROACHING" || status === "TANDEM_ARRIVED";

  return (
    <div
      className={cn(
        "relative w-full h-full bg-[#0E1526] overflow-hidden select-none",
        className
      )}
    >
      {/* Map Control Floating Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
          className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/60 shadow-lg flex items-center justify-center hover:bg-slate-800 active:scale-95 transition"
          aria-label="Perbesar Peta"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
          className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/60 shadow-lg flex items-center justify-center hover:bg-slate-800 active:scale-95 transition"
          aria-label="Perkecil Peta"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <button
          onClick={() => setShowTraffic((t) => !t)}
          className={cn(
            "w-10 h-10 rounded-xl backdrop-blur-md border shadow-lg flex items-center justify-center active:scale-95 transition",
            showTraffic
              ? "bg-orange-500/20 text-orange-400 border-orange-500/50"
              : "bg-slate-900/80 text-slate-400 border-slate-700/60"
          )}
          title="Toggle Info Macet"
          aria-label="Toggle Lapisan Kemacetan"
        >
          <Layers className="w-5 h-5" />
        </button>
        <button
          onClick={() => setZoom(1)}
          className="w-10 h-10 rounded-xl bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/60 shadow-lg flex items-center justify-center hover:bg-slate-800 active:scale-95 transition"
          title="Pusatkan Lokasi Saya"
          aria-label="Pusatkan ke Posisi Anda"
        >
          <Crosshair className="w-5 h-5 text-[#FF5500]" />
        </button>
      </div>

      {/* Traffic Gridlock Warning Badge */}
      {showTraffic && (
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-800/80 backdrop-blur-md text-red-300 text-xs font-semibold shadow-lg">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Macet Parah: Koridor Sudirman (V/C 0.94)</span>
          </div>
        </div>
      )}

      {/* Vector Interactive Map SVG */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoom})` }}
      >
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="gridlockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="motorRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="carRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <radialGradient id="searchRadar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FF5500" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FF5500" stopOpacity="0" />
            </radialGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* District & City Landmass Background */}
          <rect width="1000" height="700" fill="#0B1220" />

          {/* City District Blocks (Jakarta urban texture) */}
          <g fill="#111B2E" stroke="#1A2844" strokeWidth="1">
            <rect x="60" y="80" width="220" height="150" rx="16" />
            <rect x="310" y="60" width="160" height="170" rx="16" />
            <rect x="580" y="70" width="240" height="140" rx="16" />
            <rect x="850" y="90" width="130" height="180" rx="16" />

            {/* Central Jakarta / Sudirman business blocks */}
            <rect x="80" y="270" width="180" height="190" rx="16" />
            <rect x="680" y="250" width="260" height="190" rx="16" />
            <rect x="70" y="500" width="200" height="160" rx="16" />
            <rect x="660" y="470" width="280" height="180" rx="16" />

            {/* SCBD Complex blocks */}
            <rect x="310" y="480" width="140" height="110" rx="14" fill="#142138" stroke="#233559" />
            <rect x="470" y="490" width="160" height="130" rx="14" fill="#142138" stroke="#233559" />
          </g>

          {/* Urban Green Parks (GBK Senayan & Menteng) */}
          <rect x="300" y="270" width="170" height="170" rx="30" fill="#0E2426" stroke="#133D3B" strokeWidth="1.5" />
          <circle cx="385" cy="355" r="55" fill="#0B1D20" stroke="#1D4E4A" strokeWidth="2" />
          <text x="385" y="360" fill="#2DD4BF" fontSize="11" fontWeight="600" textAnchor="middle" opacity="0.8">
            GBK SENAYAN
          </text>

          {/* Minor Road Grid */}
          <g stroke="#1C2B47" strokeWidth="3" strokeLinecap="round">
            <line x1="100" y1="20" x2="100" y2="680" strokeDasharray="6 4" opacity="0.4" />
            <line x1="880" y1="20" x2="880" y2="680" strokeDasharray="6 4" opacity="0.4" />
            <line x1="40" y1="160" x2="960" y2="160" opacity="0.5" />
            <line x1="40" y1="460" x2="960" y2="460" opacity="0.5" />
          </g>

          {/* Major Jakarta Arterials */}
          {/* Gatot Subroto Highway */}
          <path
            d="M 50 420 Q 500 400 950 420"
            fill="none"
            stroke="#1F3354"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 50 420 Q 500 400 950 420"
            fill="none"
            stroke="#2B4673"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Jend. Sudirman Main Corridor (Vertical Avenue) */}
          <path
            d="M 520 40 L 520 680"
            fill="none"
            stroke="#1F3354"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            d="M 520 40 L 520 680"
            fill="none"
            stroke="#2B4673"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Semanggi Cloverleaf Interchange */}
          <ellipse cx="520" cy="410" rx="60" ry="40" fill="none" stroke="#2B4673" strokeWidth="8" />
          <circle cx="520" cy="410" r="14" fill="#0B1220" stroke="#385B94" strokeWidth="4" />

          {/* Rasuna Said Corridor */}
          <path
            d="M 720 50 L 720 670"
            fill="none"
            stroke="#1F3354"
            strokeWidth="16"
          />
          <path
            d="M 720 50 L 720 670"
            fill="none"
            stroke="#263E66"
            strokeWidth="10"
          />

          {/* Traffic Congestion Highlight (Severe Red Macet) */}
          {showTraffic && (
            <g>
              {/* Sudirman Gridlock (Red line) */}
              <path
                d="M 520 200 L 520 480"
                fill="none"
                stroke="url(#gridlockGrad)"
                strokeWidth="10"
                strokeLinecap="round"
                filter="url(#glowEffect)"
              />
              {/* Gatot Subroto Congestion */}
              <path
                d="M 380 412 Q 520 405 640 412"
                fill="none"
                stroke="url(#gridlockGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Landmark Labels */}
          <g fill="#64748B" fontSize="10" fontWeight="500">
            <text x="535" y="110">JL. MH THAMRIN</text>
            <text x="535" y="260">JL. JEND. SUDIRMAN</text>
            <text x="535" y="630">BLOK M CORRIDOR</text>
            <text x="735" y="240">HR RASUNA SAID</text>
            <text x="350" y="540" fill="#38BDF8" fontWeight="700">SCBD LOT 8</text>
          </g>

          {/* ROUTE POLYLINES */}
          {/* Dual Routes when Trip is active */}
          {isTripActive && (
            <g>
              {/* Rider Motor Shortcut Route (Blue) */}
              <path
                d={`M ${originCoord.x} ${originCoord.y} Q 460 410 ${destCoord.x} ${destCoord.y}`}
                fill="none"
                stroke="url(#motorRouteGrad)"
                strokeWidth="6"
                strokeDasharray="8 4"
                strokeLinecap="round"
                filter="url(#glowEffect)"
              />

              {/* Driver Car Arterial Route (Amber / Orange) */}
              <path
                d={`M ${originCoord.x} ${originCoord.y} Q 570 430 450 510 L ${destCoord.x} ${destCoord.y}`}
                fill="none"
                stroke="url(#carRouteGrad)"
                strokeWidth="5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* SEARCHING TANDEM RADAR SCANNER ANIMATION */}
          {isSearching && (
            <g transform={`translate(${originCoord.x}, ${originCoord.y})`}>
              <circle r="160" fill="url(#searchRadar)" />
              <circle
                r="70"
                fill="none"
                stroke="#FF5500"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-spin-slow"
              />
              <circle
                r="130"
                fill="none"
                stroke="#FF5500"
                strokeWidth="1.5"
                opacity="0.6"
              />
              <circle
                r="180"
                fill="none"
                stroke="#FF5500"
                strokeWidth="1"
                opacity="0.3"
              />
              {/* Nearby available units flashing */}
              <circle cx="90" cy="-60" r="5" fill="#10B981" className="animate-ping" />
              <circle cx="90" cy="-60" r="4" fill="#10B981" />
              <circle cx="-80" cy="50" r="5" fill="#38BDF8" className="animate-ping" />
              <circle cx="-80" cy="50" r="4" fill="#38BDF8" />
            </g>
          )}

          {/* DESTINATION MARKER */}
          <g transform={`translate(${destCoord.x}, ${destCoord.y})`}>
            <circle r="22" fill="#10B981" opacity="0.2" className="animate-ping" />
            <circle r="14" fill="#10B981" />
            <circle r="5" fill="#FFFFFF" />
            <text
              x="0"
              y="-22"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              className="drop-shadow-md"
            >
              Tujuan: {destinationName.split("/")[0]}
            </text>
          </g>

          {/* ORIGIN / PICKUP POINT MARKER */}
          <g transform={`translate(${originCoord.x}, ${originCoord.y})`}>
            <circle r="26" fill="#FF5500" opacity="0.25" className="animate-pulse" />
            <circle r="14" fill="#FF5500" />
            <circle r="5" fill="#FFFFFF" />
            <text
              x="0"
              y="30"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              className="drop-shadow-md"
            >
              Posisi Anda: {originName}
            </text>
          </g>

          {/* TANDEM APPROACHING MARKER */}
          {isApproaching && (
            <g transform={`translate(${tandemApproachingPos.x}, ${tandemApproachingPos.y})`}>
              <circle r="22" fill="#FF5500" opacity="0.3" className="animate-ping" />
              <rect x="-18" y="-18" width="36" height="36" rx="10" fill="#0F172A" stroke="#FF5500" strokeWidth="2.5" />
              {/* Tandem dual mini-badge */}
              <text x="0" y="4" fill="#FF5500" fontSize="13" fontWeight="900" textAnchor="middle">
                ⚡
              </text>
              <text
                x="0"
                y="-26"
                fill="#FF9966"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                className="drop-shadow"
              >
                Tandem Rizky & Budi
              </text>
            </g>
          )}

          {/* LIVE TRIP IN PROGRESS DUAL MARKERS */}
          {isTripActive && (
            <g>
              {/* YOU ON MOTORBIKE MARKER */}
              <g transform={`translate(${motorPos.x}, ${motorPos.y})`}>
                <circle r="24" fill="#38BDF8" opacity="0.3" className="animate-ping" />
                <rect x="-18" y="-18" width="36" height="36" rx="12" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="5" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">
                  🏍️
                </text>
                <g transform="translate(0, -28)">
                  <rect x="-35" y="-14" width="70" height="18" rx="6" fill="#0284C7" />
                  <text x="0" y="-1" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                    ANDA (Motor)
                  </text>
                </g>
              </g>

              {/* YOUR CAR BEING DRIVEN BY BUDI */}
              <g transform={`translate(${carPos.x}, ${carPos.y})`}>
                <circle r="20" fill="#F59E0B" opacity="0.3" className="animate-pulse" />
                <rect x="-18" y="-18" width="36" height="36" rx="10" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
                <text x="0" y="5" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">
                  🚗
                </text>
                <g transform="translate(0, 32)">
                  <rect x="-42" y="-14" width="84" height="18" rx="6" fill="#B45309" />
                  <text x="0" y="-1" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
                    MOBIL ANDA (Civic)
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
