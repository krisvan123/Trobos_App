"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, User, Phone, Mail, Lock, ArrowRight, Bike, Car } from "lucide-react";
import { useTrobosStore } from "@/store/useTrobosStore";

export default function RegisterPage() {
  const router = useRouter();
  const login = useTrobosStore((s) => s.login);
  const [formData, setFormData] = useState({
    name: "Andi Pratama",
    phone: "081234567890",
    email: "andi.pratama@gmail.com",
    password: "••••••••",
    agreeTerms: true,
  });

  const [step, setStep] = useState<"form" | "onboarding">("form");
  const [onboardingIndex, setOnboardingIndex] = useState(0);

  const onboardingScreens = [
    {
      title: "Escape the Traffic",
      subtitle: "Trobos kemacetan dengan rider motor terlatih yang membawa Anda ke tujuan.",
      icon: Bike,
    },
    {
      title: "Your Car Is Still Safe",
      subtitle: "Driver profesional mengambil alih mobil Anda dan mengemudikannya dengan aman.",
      icon: Car,
    },
    {
      title: "One Tap. Two Drivers. One Destination.",
      subtitle: "Anda dan mobil Anda akhirnya bertemu kembali di tempat tujuan.",
      icon: Zap,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.email);
    setStep("onboarding");
  };

  const handleNext = () => {
    if (onboardingIndex < onboardingScreens.length - 1) {
      setOnboardingIndex((i) => i + 1);
    } else {
      router.push("/app");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {step === "form" ? (
          <>
            <div className="text-center space-y-1.5">
              <Link href="/" className="inline-flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#FF4D00] flex items-center justify-center shadow-sm">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  TROBOS
                </span>
              </Link>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Buat Akun Baru
              </h1>
              <p className="text-xs text-slate-500">
                Daftar untuk perlindungan evakuasi kemacetan Anda.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="accent-[#FF4D00]"
                  />
                  <label htmlFor="terms" className="text-[11px]">
                    Saya menyetujui Syarat Layanan dan Kebijakan Asuransi Trobos.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#E64400] text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>Daftar & Mulai</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-4 text-center text-xs text-slate-500">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-[#FF4D00] font-bold hover:underline">
                  Masuk di sini
                </Link>
              </div>
            </div>
          </>
        ) : (
          /* Simple 3-step Onboarding */
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm text-center space-y-5">
            <div className="flex justify-center gap-1">
              {onboardingScreens.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    onboardingIndex === i ? "w-6 bg-[#FF4D00]" : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-orange-50 border border-orange-200">
              {React.createElement(onboardingScreens[onboardingIndex].icon, {
                className: "w-7 h-7 text-[#FF4D00]",
              })}
            </div>

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Langkah {onboardingIndex + 1} dari 3
              </div>
              <h2 className="text-xl font-black text-slate-900">
                {onboardingScreens[onboardingIndex].title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                {onboardingScreens[onboardingIndex].subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl bg-[#FF4D00] hover:bg-[#E64400] text-white font-bold text-xs shadow-sm transition"
            >
              {onboardingIndex === onboardingScreens.length - 1
                ? "Mulai Pakai Trobos"
                : "Lanjut"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
