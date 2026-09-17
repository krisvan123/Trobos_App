"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "flat" | "dark" | "outline" | "highlight";
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  const variantStyles = {
    default: "bg-white border border-slate-200/80 shadow-card text-slate-900",
    elevated: "bg-white border border-slate-100 shadow-elevated text-slate-900",
    flat: "bg-slate-100 border border-slate-200/60 text-slate-900",
    dark: "bg-[#0A0F1D] border border-slate-800 text-white shadow-2xl",
    outline: "bg-white/80 backdrop-blur-md border-2 border-slate-200 text-slate-900",
    highlight: "bg-orange-50/70 border border-orange-200 text-slate-900",
  };

  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
