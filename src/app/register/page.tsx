"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, User, Phone, Mail, Lock, CheckCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Andi Pratama",
    phone: "081234567890",
    email: "andi.pratama@gmail.com",
    password: "••••••••",
    confirmPassword: "••••••••",
    agreeTerms: true,
  });

  const [step, setStep] = useState<"form" | "onboarding">("form");
  const [onboardingIndex, setOnboardingIndex] = useState(0);

  const onboardingScreens = [
    {
      title: "Escape the Traffic",
      subtitle: "Trobos kemacetan total dengan rider motor bersertifikasi.",
      icon: "🏍️",
      accent: "bg-sky-500/20 text-sky-400 border-sky-500/30",
    },
    {
      title: "Your Car Is Still Safe",
      subtitle: "Driver profesional mengambil alih mobil Anda dengan asuransi all-risk Rp 1 Miliar.",
      icon: "🚗",
      accent: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    {
      title: "One Tap. Two Drivers. One Destination.",
      subtitle: "Reuni kembali di tujuan dengan mobil terparkir aman dan waktu terselamatkan.",
      icon: "⚡",
      accent: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("onboarding");
  };

  const handleNextOnboarding = () => {
    if (onboardingIndex < onboardingScreens.length - 1) {
      setOnboardingIndex((i) => i + 1);
    } else {
      router.push("/app");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">
        {step === "form" ? (
          <>
            {/* Header */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
                <div className="w-11 h-11 rounded-2xl bg-[#FF5500] flex items-center justify-center shadow-emergency group-hover:scale-105 transition">
                  <Zap className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  TROBOS
                </span>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Buat Akun Baru
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Daftar sekarang untuk perlindungan mobilitas darurat Anda.
              </p>
            </div>

            {/* Register Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      setFormData({ ...formData, agreeTerms: e.target.checked })
                    }
                    className="mt-0.5 accent-[#FF5500]"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-400 leading-tight">
                    Saya menyetujui <span className="text-orange-400 underline">Terms & Conditions</span> serta kebijakan proteksi asuransi Trobos.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] active:scale-[0.99] text-white font-black text-sm tracking-wide shadow-emergency transition flex items-center justify-center gap-2 mt-2"
                >
                  <span>Buat Akun & Lanjut</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-5 text-center text-xs text-slate-400">
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="text-orange-400 hover:text-orange-300 font-bold"
                >
                  Masuk di sini
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* ONBOARDING MODAL (MAX 3 SCREENS) */
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center space-y-6">
            <div className="flex justify-center gap-1.5 mb-2">
              {onboardingScreens.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    onboardingIndex === i ? "w-8 bg-[#FF5500]" : "w-2 bg-slate-700"
                  }`}
                />
              ))}
            </div>

            <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-inner border border-white/10 bg-slate-800">
              {onboardingScreens[onboardingIndex].icon}
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1">
                Langkah {onboardingIndex + 1} dari 3
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {onboardingScreens[onboardingIndex].title}
              </h2>
              <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
                {onboardingScreens[onboardingIndex].subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNextOnboarding}
              className="w-full py-4 rounded-2xl bg-[#FF5500] hover:bg-[#E64C00] text-white font-black text-sm tracking-wide shadow-emergency transition flex items-center justify-center gap-2"
            >
              <span>
                {onboardingIndex === onboardingScreens.length - 1
                  ? "Mulai Pakai Trobos"
                  : "Lanjut"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
