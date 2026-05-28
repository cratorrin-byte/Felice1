import React from "react";
import { Wrench } from "lucide-react";

export default function Footer({ onNavIndex }: { onNavIndex: (sec: string) => void }) {
  return (
    <footer className="w-full bg-[#110e05] border-t border-[#4d4732]/30 py-16 px-6 md:px-16 text-[#eae2cf]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffd700] text-[#161308]">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <span className="font-headline text-2xl font-black tracking-tighter block leading-none">
                FELICE
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#ffd700] font-bold">
                ESTABLISHED 1971
              </span>
            </div>
          </div>
          <p className="text-sm text-[#d0c6ab] leading-relaxed">
            Pioneering heavy automotive maintenance technologies with military-grade calibration and high-clearance lifting systems worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
          <div className="space-y-4">
            <h4 className="font-mono text-[11px] font-bold text-[#ffd700] tracking-wider uppercase">
              // PRODUCTS
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li>
                <button
                  onClick={() => onNavIndex("ai-600b")}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  WHEEL BALANCERS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavIndex("quantum")}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  TYRE CHANGERS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavIndex("two-post")}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  LIFTS & CRADLES
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[11px] font-bold text-[#ffd700] tracking-wider uppercase">
              // SYSTEMS
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li>
                <button
                  onClick={() => onNavIndex("simulator-section")}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  INTELLIGENCE DIALS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavIndex("configurator-section")}
                  className="hover:text-[#ffd700] transition-colors text-left"
                >
                  WORKSHOP BUILDER
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[11px] font-bold text-[#ffd700] tracking-wider uppercase">
              // TRUST & SAFETY
            </h4>
            <ul className="space-y-2 text-sm text-[#a0a0a0]">
              <li>
                <a href="#support" className="hover:text-[#ffd700] transition-colors">
                  TECH REPAIR CENTER
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#ffd700] transition-colors">
                  PRIVACY PROTOCOLS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#4d4732]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#a0a0a0] font-mono">
        <div>
          © 2026 FELICE INDUSTRIAL EQUIPMENT CO. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6">
          <span>ANSI COMPLIANT</span>
          <span>ISO 9001 APPROVED</span>
          <span>TAIWAN PAT. PEND.</span>
        </div>
      </div>
    </footer>
  );
}
