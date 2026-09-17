"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/mockData";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Phone,
  Mail,
  ShieldQuestion,
} from "lucide-react";

export default function HelpCenterPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <HelpCircle className="w-6 h-6 text-sky-400" />
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pusat Bantuan & FAQ
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Pertanyaan umum mengenai sistem Tandem, keamanan mobil, dan transparansi tarif.
        </p>
      </div>

      {/* Accordion FAQ */}
      <div className="space-y-3">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-slate-800/70 border border-slate-700/70 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 text-sm font-bold text-white hover:bg-slate-800 transition"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-orange-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-700/40 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Support Cards */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-white mb-3">
          Masih Butuh Bantuan Langsung?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 flex flex-col items-center text-center transition group"
          >
            <MessageCircle className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition" />
            <div className="text-xs font-bold text-white">WhatsApp Care</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Respon cepat &lt; 2 mnt</div>
          </a>

          <a
            href="tel:021500888"
            className="p-4 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 flex flex-col items-center text-center transition group"
          >
            <Phone className="w-6 h-6 text-[#FF5500] mb-2 group-hover:scale-110 transition" />
            <div className="text-xs font-bold text-white">Hotline 24 Jam</div>
            <div className="text-[10px] text-slate-400 mt-0.5">021-500-888</div>
          </a>

          <a
            href="mailto:support@trobos.id"
            className="p-4 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 flex flex-col items-center text-center transition group"
          >
            <Mail className="w-6 h-6 text-sky-400 mb-2 group-hover:scale-110 transition" />
            <div className="text-xs font-bold text-white">Email Resmi</div>
            <div className="text-[10px] text-slate-400 mt-0.5">support@trobos.id</div>
          </a>
        </div>
      </div>
    </div>
  );
}
