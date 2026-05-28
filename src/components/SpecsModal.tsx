import React from "react";
import { X, ShieldCheck, CheckCircle2, Zap, Cog, Scale } from "lucide-react";
import { Product } from "../types";

interface SpecsModalProps {
  product: Product;
  onClose: () => void;
  onAddToConfig: (prodId: string) => void;
}

export default function SpecsModal({ product, onClose, onAddToConfig }: SpecsModalProps) {
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-[#110e05]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#1a1a2e] border-2 border-[#ffd700]/30 rounded-md shadow-[0_0_50px_rgba(255,215,0,0.1)] overflow-hidden text-[#eae2cf]">
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded text-[#d0c6ab] hover:text-[#ffd700] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
          {/* Headline block */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-[#ffd700] uppercase font-bold">
              // TECHNICAL BLUEPRINTS & PARAMETERS
            </span>
            <div className="flex items-center gap-3">
              <h3 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight">
                {product.name}
              </h3>
              <span className="bg-[#ffd700]/10 text-[#ffd700] px-2 py-0.5 text-[9px] font-mono border border-[#ffd700]/30 rounded-sm">
                {product.badge}
              </span>
            </div>
            <p className="text-sm font-mono text-[#d0c6ab]">
              Category Series: {product.series}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Spec breakdown table */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#ffd700] tracking-wider uppercase border-b border-[#4d4732]/40 pb-2">
                // BENCHMARK TESTING READOUT
              </h4>
              <div className="divide-y divide-[#4d4732]/30 text-xs md:text-sm">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between py-2 md:py-3">
                    <span className="text-[#d0c6ab] font-mono">{spec.label}</span>
                    <span className="font-mono font-bold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Design features */}
            <div className="space-y-6">
              <div className="bg-[#231f14] p-4 border border-[#ffd700]/10 rounded-sm space-y-3">
                <span className="text-[10px] font-mono font-bold text-[#ffd700] tracking-wider uppercase block">
                  // CORE CALIBRATION INTEGRITY
                </span>
                <p className="text-xs text-[#d0c6ab] leading-relaxed">
                  Every {product.name} undergoes full operational alignment tests under heavy kinetic constraints at our state-of-the-art laboratory in Taiwan before packaging.
                </p>
                <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-white pt-2 border-t border-[#4d4732]/30">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-[#00E676]" />
                    <span>CE Standards Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-[#ffd700]" />
                    <span>Dynamic Auto-Tare</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#ffd700] tracking-wider uppercase">
                  // REINFORCED HARDWARE STANDARD
                </h4>
                <ul className="space-y-2 text-xs text-[#d0c6ab]">
                  {product.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#ffd700] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Prompt action */}
          <div className="pt-6 border-t border-[#4d4732]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-mono text-[#a0a0a0]">
              * Requirements standard: 1-phase AC 220V or 3-phase AC 400V terminal grids.
            </p>
            <div className="flex w-full sm:w-auto gap-3">
              <button
                onClick={() => {
                  onAddToConfig(product.id);
                  onClose();
                }}
                className="flex-1 sm:flex-none bg-[#ffd700] text-[#161308] px-5 py-2.5 rounded-sm font-mono text-xs font-bold hover:bg-[#ffe16d] whitespace-nowrap"
              >
                + ADD TO MY WORKSHOP
              </button>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none border border-[#999077] hover:bg-white/5 text-[#eae2cf] px-5 py-2.5 rounded-sm font-mono text-xs font-bold"
              >
                CLOSE READOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
