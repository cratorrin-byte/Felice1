import React from "react";
import { Plus, Minus, Check, HelpCircle, HardDrive, Bolt, Landmark } from "lucide-react";
import { WorkshopConfig } from "../types";
import { PRODUCTS, WORKSHOP_UPGRADES } from "../data";

interface ConfiguratorProps {
  config: WorkshopConfig;
  setConfig: React.Dispatch<React.SetStateAction<WorkshopConfig>>;
  onConfigureSubmit: () => void;
}

export default function WorkshopsConfigurator({ config, setConfig, onConfigureSubmit }: ConfiguratorProps) {
  const handleQtyChange = (type: "balancersCount" | "changersCount" | "liftsCount", action: "inc" | "dec") => {
    setConfig(prev => ({
      ...prev,
      [type]: action === "inc" ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const handleToggleUpgrade = (id: "hasLaserUpgrade" | "hasSonarUpgrade" | "hasAssistArmUpgrade" | "hasOverheadBeamUpgrade") => {
    setConfig(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculations
  const totalFloorSpace = (config.balancersCount * 4) + (config.changersCount * 5) + (config.liftsCount * 12);
  const minHeightRequired = config.liftsCount > 0 ? 4.2 : 2.5;
  const estimateDeliveryWeeks = (config.balancersCount + config.changersCount + config.liftsCount) > 4 ? 6 : 3;

  const totalBasePower = (config.balancersCount * 1.5) + (config.changersCount * 3.5) + (config.liftsCount * 3.0);
  const totalUpgradesPower =
    (config.hasLaserUpgrade ? 0.1 : 0) +
    (config.hasSonarUpgrade ? 0.15 : 0) +
    (config.hasAssistArmUpgrade ? 0.5 : 0) +
    (config.hasOverheadBeamUpgrade ? 0.2 : 0);
  const netPower = totalBasePower + totalUpgradesPower;

  return (
    <div className="bg-[#1a1a2e] border border-[#161308] rounded-xl overflow-hidden text-[#eae2cf] max-w-5xl mx-auto p-6 md:p-10 space-y-8">
      
      <div className="space-y-2 border-b border-[#4d4732]/30 pb-6 text-center sm:text-left">
        <span className="text-[10px] font-mono tracking-widest text-[#ffd700] uppercase font-bold block">
          // DYNAMIC WORKSHOP ESTIMATOR & BLUEPRINTER
        </span>
        <h3 className="font-headline text-3xl font-extrabold text-white tracking-tight">
          System Configuration Modeler
        </h3>
        <p className="text-sm text-[#d0c6ab] max-w-2xl leading-relaxed mx-auto sm:mx-0">
          Scale your custom high-pressure lineups in real-time. Calculate physical layout constraints, estimated grid footprint, and ventilation specs relative to your shop dimension.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Selection adjustments */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#ffd700] tracking-wider uppercase">
              // SELECT UNITS FROM CATALOG
            </h4>

            {/* Balancer adjustment */}
            <div className="flex justify-between items-center bg-[#161308] p-4 rounded border border-[#4d4732]/30">
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">Ai-600B Smart Wheel Balancer</span>
                <span className="text-xs font-mono text-[#a0a0a0]">Auto-parameters scan | Micro-laser Guide</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQtyChange("balancersCount", "dec")}
                  className="p-1.5 hover:bg-white/5 rounded border border-[#4d4732] text-[#d0c6ab] hover:text-[#ffd700]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-mono font-bold w-6 text-center text-white">{config.balancersCount}</span>
                <button
                  onClick={() => handleQtyChange("balancersCount", "inc")}
                  className="p-1.5 hover:bg-white/5 rounded border border-[#4d4732] text-[#d0c6ab] hover:text-[#ffd700]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tyre changer adjustment */}
            <div className="flex justify-between items-center bg-[#161308] p-4 rounded border border-[#4d4732]/30">
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">Quantum Series Tyre Changer</span>
                <span className="text-xs font-mono text-[#a0a0a0]">Leverless dynamic head | 3.5kW heavy-duty motor</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQtyChange("changersCount", "dec")}
                  className="p-1.5 hover:bg-white/5 rounded border border-[#4d4732] text-[#d0c6ab] hover:text-[#ffd700]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-mono font-bold w-6 text-center text-white">{config.changersCount}</span>
                <button
                  onClick={() => handleQtyChange("changersCount", "inc")}
                  className="p-1.5 hover:bg-white/5 rounded border border-[#4d4732] text-[#d0c6ab] hover:text-[#ffd700]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Lifts adjustment */}
            <div className="flex justify-between items-center bg-[#161308] p-4 rounded border border-[#4d4732]/30">
              <div className="space-y-1">
                <span className="text-sm font-bold text-white block">Mechanical Two-Post Lift</span>
                <span className="text-xs font-mono text-[#a0a0a0]">5.0 Ton hoist | Triple safety-lock mechanism</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQtyChange("liftsCount", "dec")}
                  className="p-1.5 hover:bg-white/5 rounded border border-[#4d4732] text-[#d0c6ab] hover:text-[#ffd700]"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-lg font-mono font-bold w-6 text-center text-white">{config.liftsCount}</span>
                <button
                  onClick={() => handleQtyChange("liftsCount", "inc")}
                  className="p-1.5 hover:bg-white/5 rounded border border-[#4d4732] text-[#d0c6ab] hover:text-[#ffd700]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Upgrades List */}
          <div className="space-y-4 pt-4">
            <h4 className="text-xs font-mono font-bold text-[#ffd700] tracking-wider uppercase">
              // OPTIONAL HARDWARE TUNING UPGRADES
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-start gap-3 bg-[#161308]/40 border border-[#4d4732]/20 p-4 rounded cursor-pointer select-none hover:border-[#ffd700]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={config.hasLaserUpgrade}
                  onChange={() => handleToggleUpgrade("hasLaserUpgrade")}
                  className="mt-1 rounded border-zinc-700 bg-zinc-900 text-[#ffd700] ring-offset-zinc-900 focus:ring-[#ffd700]"
                />
                <span className="text-xs font-mono text-zinc-300">
                  <strong className="block text-white text-xs mb-0.5">Laser Guideline upgrade</strong>
                  Project visual clip spots instantly at 6 o'clock on Balancers. (+0.10 kW)
                </span>
              </label>

              <label className="flex items-start gap-3 bg-[#161308]/40 border border-[#4d4732]/20 p-4 rounded cursor-pointer select-none hover:border-[#ffd700]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={config.hasSonarUpgrade}
                  onChange={() => handleToggleUpgrade("hasSonarUpgrade")}
                  className="mt-1 rounded border-zinc-700 bg-zinc-900 text-[#ffd700] ring-offset-zinc-900 focus:ring-[#ffd700]"
                />
                <span className="text-xs font-mono text-zinc-300">
                  <strong className="block text-white text-xs mb-0.5">Auto-Sonar parameters</strong>
                  Contactless rim dimension radar scanner for quick cycle runs. (+0.15 kW)
                </span>
              </label>

              <label className="flex items-start gap-3 bg-[#161308]/40 border border-[#4d4732]/20 p-4 rounded cursor-pointer select-none hover:border-[#ffd700]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={config.hasAssistArmUpgrade}
                  onChange={() => handleToggleUpgrade("hasAssistArmUpgrade")}
                  className="mt-1 rounded border-zinc-700 bg-zinc-900 text-[#ffd700] ring-offset-zinc-900 focus:ring-[#ffd700]"
                />
                <span className="text-xs font-mono text-zinc-300">
                  <strong className="block text-white text-xs mb-0.5">Dual Pneumatic helper arms</strong>
                  Simplifies low profile run-flat tires demount operations. (+0.50 kW)
                </span>
              </label>

              <label className="flex items-start gap-3 bg-[#161308]/40 border border-[#4d4732]/20 p-4 rounded cursor-pointer select-none hover:border-[#ffd700]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={config.hasOverheadBeamUpgrade}
                  onChange={() => handleToggleUpgrade("hasOverheadBeamUpgrade")}
                  className="mt-1 rounded border-zinc-700 bg-zinc-900 text-[#ffd700] ring-offset-zinc-900 focus:ring-[#ffd700]"
                />
                <span className="text-xs font-mono text-zinc-300">
                  <strong className="block text-white text-xs mb-0.5">Laser beam safety limits</strong>
                  Triggers immediate power interruption if overhead height is breached. (+0.20 kW)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Real-time calculated blueprint results on the right */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-[#111120] border-2 border-[#161308] p-6 rounded-lg space-y-6 flex-1">
            <h4 className="text-xs font-mono font-bold text-[#ffd700] tracking-wider uppercase border-b border-white/5 pb-2">
              // SITE BLUEPRINT METRICS
            </h4>

            {/* Layout blueprint metrics list */}
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <HardDrive className="h-3.5 w-3.5" />
                  FLOOR PLAN AREA:
                </span>
                <span className="text-white font-bold">{totalFloorSpace} m²</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <Landmark className="h-3.5 w-3.5" />
                  MIN CEILING HEIGHT:
                </span>
                <span className="text-white font-bold">{minHeightRequired.toFixed(1)} m</span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-500 flex items-center gap-1.5">
                  <Bolt className="h-3.5 w-3.5" />
                  TOTAL GRID POWER LOAD:
                </span>
                <span className={`font-bold ${netPower > 15 ? "text-[#ff3b30]" : "text-white"}`}>
                  {netPower.toFixed(2)} kW
                </span>
              </div>

              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-500">ESTIMATED PRODUCTION SPEED:</span>
                <span className="text-white font-bold">{estimateDeliveryWeeks} Weeks</span>
              </div>
            </div>

            {/* Blueprint illustration */}
            <div className="bg-[#161308] border border-white/5 p-4 rounded text-center font-mono text-[9px] text-[#ffd700] space-y-1.5 relative overflow-hidden">
              <p className="text-[10px] font-bold tracking-wider">// STRUCTURAL MAP INDICATOR</p>
              <div className="flex justify-center gap-2 pt-2">
                {Array.from({ length: config.balancersCount }).map((_, i) => (
                  <div key={i} className="h-8 w-8 border border-dashed border-[#ffd700]/70 flex items-center justify-center font-bold">B</div>
                ))}
                {Array.from({ length: config.changersCount }).map((_, i) => (
                  <div key={i} className="h-8 w-8 border border-dashed border-[#ffd700]/70 flex items-center justify-center font-bold bg-[#ffd700]/5">TC</div>
                ))}
                {Array.from({ length: config.liftsCount }).map((_, i) => (
                  <div key={i} className="h-8 w-12 border border-[#ffd700] flex items-center justify-center font-bold bg-[#ffd700]/10">L</div>
                ))}
                {config.balancersCount === 0 && config.changersCount === 0 && config.liftsCount === 0 && (
                  <div className="py-2 text-zinc-500">// (Workspace empty. Select units from panel)</div>
                )}
              </div>
              <span className="block text-[8px] text-zinc-500 uppercase pt-2">
                * Scale matches 1:50 metric ratio
              </span>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={onConfigureSubmit}
              disabled={config.balancersCount === 0 && config.changersCount === 0 && config.liftsCount === 0}
              className="w-full bg-[#ffd700] hover:bg-[#ffe16d] text-[#161308] font-mono text-xs font-black tracking-widest uppercase py-4 rounded shadow-[0_4px_20px_rgba(255,215,0,0.15)] disabled:opacity-50 transition-all cursor-pointer"
            >
              COMPILE CONFIGURATION & QUOTE REQUEST
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
