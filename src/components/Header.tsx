import React from "react";
import { Wrench, Shield, ClipboardList, PenTool } from "lucide-react";

interface HeaderProps {
  onRequestQuote: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Header({ onRequestQuote, activeView, setActiveView }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 md:px-16 py-4 bg-[#161308]/90 backdrop-blur-md border-b border-[#4d4732]/40">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView("catalog")}>
        <div className="flex h-10 w-10 items-center justify-center rounded bg-[#ffd700] text-[#161308]">
          <Wrench className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-headline text-2xl font-black tracking-tighter text-[#eae2cf]">
            FELICE
          </h1>
          <span className="block text-[8px] font-mono tracking-widest text-[#ffd700] uppercase">
            Precision Machined
          </span>
        </div>
      </div>

      {/* Navigation Buttons to switch inline focus between presentation and manual terminal simulation */}
      <nav className="hidden sm:flex items-center gap-6 text-xs font-mono">
        <button
          onClick={() => {
            setActiveView("catalog");
            const el = document.getElementById("catalog-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`hover:text-[#ffd700] transition-colors ${
            activeView === "catalog" ? "text-[#ffd700] font-bold" : "text-[#d0c6ab]"
          }`}
        >
          // CATALOG & TECH
        </button>
        <button
          onClick={() => {
            setActiveView("simulator");
            const el = document.getElementById("simulator-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`hover:text-[#ffd700] transition-colors ${
            activeView === "simulator" ? "text-[#ffd700] font-bold" : "text-[#d0c6ab]"
          }`}
        >
          // INTELLIGENCE TERMINAL
        </button>
        <button
          onClick={() => {
            setActiveView("configurator");
            const el = document.getElementById("configurator-section");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`hover:text-[#ffd700] transition-colors ${
            activeView === "configurator" ? "text-[#ffd700] font-bold" : "text-[#d0c6ab]"
          }`}
        >
          // WORKSHOP SCANNER
        </button>
      </nav>

      <div>
        <button
          onClick={onRequestQuote}
          className="bg-[#ffd700] hover:bg-[#ffe16d] active:scale-95 text-[#221b00] px-4 md:px-6 py-2.5 font-mono text-xs font-bold tracking-wider rounded-sm shadow-[0_0_15px_rgba(255,215,0,0.15)] transition-all duration-300"
        >
          REQUEST QUOTE
        </button>
      </div>
    </header>
  );
}
