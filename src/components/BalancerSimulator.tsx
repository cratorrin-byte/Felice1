import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Compass, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import { BalancingSimulatorState } from "../types";

export default function BalancerSimulator() {
  const [state, setState] = useState<BalancingSimulatorState>({
    wheelWidth: 6.5,
    wheelDiameter: 15.0,
    rimDistance: 120,
    isSpinning: false,
    spinCompleted: false,
    innerImbalance: 35, // exact value from custom screen-capture
    outerImbalance: 25, // exact value from custom screen-capture
    innerApplied: 0,
    outerApplied: 0,
    innerPlacementAngle: 180,
    outerPlacementAngle: 90,
    currentWheelAngle: 0,
    laserGuideActive: false,
    isBalanced: false,
  });

  const [simulationLog, setSimulationLog] = useState<string[]>([
    "// BOOTING FELICE DIAGNOSTIC INTEGRATED SYSTEM v4.9",
    "// HARDWARE COUPLING SECURED | STANDBY FOR CALIBRATION SCAN"
  ]);

  const [activeCabinetWeight, setActiveCabinetWeight] = useState<number>(5);

  const addLog = (msg: string) => {
    setSimulationLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 7)]);
  };

  const runSonarScan = () => {
    if (state.isSpinning) return;
    setState(prev => ({
      ...prev,
      wheelWidth: 8.5, // Matches the screenshot precisely!
      wheelDiameter: 18.0, // Matches the screenshot precisely!
      rimDistance: 100, // Matches the screenshot precisely!
    }));
    addLog("// SONAR RADAR: Scanned parameters automatically set: 100mm | 8.5in | 18in");
  };

  const handleWeightApply = (side: "inner" | "outer") => {
    if (state.isSpinning) return;
    
    if (side === "inner") {
      setState(prev => {
        const nextVal = prev.innerApplied + activeCabinetWeight;
        const complete = nextVal === prev.innerImbalance && prev.outerApplied === prev.outerImbalance;
        return {
          ...prev,
          innerApplied: Math.min(prev.innerImbalance, nextVal),
          isBalanced: complete
        };
      });
      addLog(`Added clip-on zinc weight (${activeCabinetWeight}g) to INNER RIM position`);
    } else {
      setState(prev => {
        const nextVal = prev.outerApplied + activeCabinetWeight;
        const complete = prev.innerApplied === prev.innerImbalance && nextVal === prev.outerImbalance;
        return {
          ...prev,
          outerApplied: Math.min(prev.outerImbalance, nextVal),
          isBalanced: complete
        };
      });
      addLog(`Added clip-on zinc weight (${activeCabinetWeight}g) to OUTER RIM position`);
    }
  };

  const handleClearWeights = () => {
    setState(prev => ({
      ...prev,
      innerApplied: 0,
      outerApplied: 0,
      isBalanced: false,
      spinCompleted: false
    }));
    addLog("// SYSTEM RESET: Cleared all applied hub weights.");
  };

  const startSpinCycle = () => {
    if (state.isSpinning) return;
    
    setState(prev => ({ ...prev, isSpinning: true }));
    addLog("// SPINDLE SPEED: Toggling 180 RPM hydraulic rotation...");

    let rotationCount = 0;
    const interval = setInterval(() => {
      setState(prev => {
        const nextAngle = (prev.currentWheelAngle + 30) % 360;
        return { ...prev, currentWheelAngle: nextAngle };
      });
      rotationCount++;

      if (rotationCount >= 24) { // Finish spin
        clearInterval(interval);
        setState(prev => {
          const matchedInner = prev.innerApplied === prev.innerImbalance;
          const matchedOuter = prev.outerApplied === prev.outerImbalance;
          const finalBalanced = matchedInner && matchedOuter;
          return {
            ...prev,
            isSpinning: false,
            spinCompleted: true,
            isBalanced: finalBalanced,
          };
        });
        
        const matchedInner = state.innerApplied === state.innerImbalance;
        const matchedOuter = state.outerApplied === state.outerImbalance;
        
        if (matchedInner && matchedOuter) {
          addLog("// DIAGNOSTIC PASS: System optimized to 00g imbalance. Millimeter calibration secured!");
        } else {
          addLog(`// SPIN RESULTS: Left Inner remaining: ${state.innerImbalance - state.innerApplied}g | Right Outer remaining: ${state.outerImbalance - state.outerApplied}g`);
        }
      }
    }, 70);
  };

  const toggleLaserGuideline = () => {
    setState(prev => ({ ...prev, laserGuideActive: !prev.laserGuideActive }));
    addLog(state.laserGuideActive ? "// LASER DIODE: Offline" : "// LASER DIODE: Active at 6 o'clock position");
  };

  return (
    <div className="glass-card rounded-xl border border-[#4d4732]/40 overflow-hidden text-[#eae2cf] max-w-5xl mx-auto">
      {/* Top Banner decoration */}
      <div className="bg-[#231f14] py-3.5 px-6 border-b border-[#4d4732]/40 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`h-2.5 w-2.5 rounded-full ${state.isSpinning ? "bg-[#ffd700] animate-pulse" : state.isBalanced ? "bg-[#00E676]" : "bg-[#ff3b30]"}`} />
          <span className="font-mono text-xs font-bold tracking-wider text-[#ffd700]">
            INTELLIGENCE CONSOLE SENSOR // MODEL AI-600B
          </span>
        </div>
        <div className="flex gap-4 font-mono text-[10px] text-[#a0a0a0]">
          <span>STATUS: <strong className={state.isBalanced ? "text-[#00E676]" : "text-[#ffd700]"}>{state.isBalanced ? "OPTIMAL CALIBRATION" : "IMBALANCE DETECTED"}</strong></span>
          <span>SPINDLE: {state.isSpinning ? "180 RPM" : "STATIONARY"}</span>
        </div>
      </div>

      {/* Main Terminal Screen representation */}
      <div className="p-4 md:p-8 bg-[#0b0b14] grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual diagnostic block matching the custom diagram exactly */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#111120] border-2 border-[#161308] rounded-lg p-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0b0b14]/50 pointer-events-none" />
          
          {/* Top readout row matching screenshot exactly */}
          <div className="flex justify-between items-center font-mono text-xs text-[#a0a0a0] border-b border-white/5 pb-4">
            <div className="flex items-center gap-1">
              <span>GYN</span>
            </div>
            <div className="flex gap-4 md:gap-8">
              <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <span className="text-[10px]">DISTANCE</span>
                <span className="text-white font-bold">{state.rimDistance}</span>
                <span className="text-[10px]">mm</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <span className="text-[10px]">WIDTH</span>
                <span className="text-white font-bold">{state.wheelWidth}</span>
                <span className="text-[10px]">inch</span>
              </div>
              <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <span className="text-[10px]">DIAMETER</span>
                <span className="text-white font-bold">{state.wheelDiameter}</span>
                <span className="text-[10px]">inch</span>
              </div>
            </div>
          </div>

          {/* Dials layout representing Left Inner imbalance and Right Outer imbalance */}
          <div className="grid grid-cols-2 gap-12 py-10 relative">
            
            {/* Left Dial */}
            <div className="flex flex-col items-center space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#a0a0a0] font-bold uppercase block">
                [L. INNER OFF-REST]
              </span>
              <div className={`relative h-32 w-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                state.innerApplied === state.innerImbalance
                  ? "border-[#00E676] bg-[#00E676]/5 shadow-[0_0_20px_rgba(0,230,118,0.15)]"
                  : "border-[#ffd700]/30 bg-[#ffd700]/2"
              }`}>
                {/* Dial ticker lights */}
                <div className="absolute inset-2 border border-dashed border-white/20 rounded-full animate-spin-slow" />
                <div className="text-center space-y-0.5">
                  <span className={`text-4xl font-mono font-bold font-headline block ${
                    state.innerApplied === state.innerImbalance ? "text-[#00E676]" : "text-[#eae2cf]"
                  }`}>
                    {state.innerImbalance - state.innerApplied}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider block">GRAMS</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#a0a0a0]">
                Applied: {state.innerApplied}g / {state.innerImbalance}g
              </span>
            </div>

            {/* Right Dial */}
            <div className="flex flex-col items-center space-y-3">
              <span className="text-[10px] font-mono tracking-widest text-[#a0a0a0] font-bold uppercase block">
                [R. OUTER OFF-REST]
              </span>
              <div className={`relative h-32 w-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                state.outerApplied === state.outerImbalance
                  ? "border-[#00E676] bg-[#00E676]/5 shadow-[0_0_20px_rgba(0,230,118,0.15)]"
                  : "border-[#ffd700]/30 bg-[#ffd700]/2"
              }`}>
                <div className="absolute inset-2 border border-dashed border-white/20 rounded-full animate-spin-slow" />
                <div className="text-center space-y-0.5">
                  <span className={`text-4xl font-mono font-bold font-headline block ${
                    state.outerApplied === state.outerImbalance ? "text-[#00E676]" : "text-[#eae2cf]"
                  }`}>
                    {state.outerImbalance - state.outerApplied}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider block">GRAMS</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#a0a0a0]">
                Applied: {state.outerApplied}g / {state.outerImbalance}g
              </span>
            </div>

            {/* Simulated interactive rotating mechanical hub */}
            <div className="col-span-2 flex justify-center pt-4 relative">
              <div className="relative border-t border-[#4d4732]/30 pt-6 w-full max-w-md flex flex-col items-center">
                {/* Laser pointers inside wheel schematic */}
                {state.laserGuideActive && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-[#00E676] animate-pulse shadow-[0_0_10px_#00e676]" />
                )}

                <div className="flex items-center gap-12">
                  <div className={`w-20 h-20 rounded-full border-4 border-dashed border-[#ffd700]/60 flex items-center justify-center relative transition-transform duration-100`} style={{ transform: `rotate(${state.currentWheelAngle}deg)` }}>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-[#161308] flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#ffd700] rounded-full" />
                    </div>
                    {/* Imbalance sensor spots */}
                    {state.innerApplied < state.innerImbalance && (
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ff3b30] rounded-full" />
                    )}
                    {state.outerApplied < state.outerImbalance && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                  </div>
                  <div className="text-left font-mono text-[11px] text-[#d0c6ab] space-y-1">
                    <p className="font-bold text-white">// HUB ROTATION INDEX</p>
                    <p>Current Angle: {state.currentWheelAngle}°</p>
                    <p>Weight Placement: 6 o'clock position (under shadow)</p>
                    <p>Lock status: <span className="text-[#00E676]">ENGAGED</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick interactive screen logs */}
          <div className="bg-[#161308] border border-white/5 rounded p-3 font-mono text-[10px] text-zinc-400 space-y-1 mt-auto">
            {simulationLog.map((log, idx) => (
              <p key={idx} className={idx === 0 ? "text-[#00E676]" : ""}>{log}</p>
            ))}
          </div>
        </div>

        {/* Right controller buttons cabinet represent terminal triggers */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div className="bg-[#1a1a2e] border border-[#ffd700]/10 p-5 rounded-lg space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#ffd700] tracking-wider uppercase border-b border-[#4d4732]/40 pb-2">
              // BALANCER DRIVES
            </h4>
            <div className="space-y-2">
              <button
                onClick={startSpinCycle}
                disabled={state.isSpinning}
                className="w-full bg-[#ffd700] hover:bg-[#ffe16d] text-[#161308] font-mono text-xs font-bold py-3.5 flex items-center justify-center gap-2 rounded disabled:opacity-50 tracking-wider shadow-[0_0_15px_rgba(255,215,0,0.1)] transition-all"
              >
                <Play className="h-4 w-4 fill-current" />
                START SPINDLE DRIVE (SPIN)
              </button>

              <button
                onClick={runSonarScan}
                disabled={state.isSpinning}
                className="w-full border border-[#999077] hover:bg-white/5 text-white font-mono text-xs font-bold py-3 flex items-center justify-center gap-2 rounded"
              >
                <Compass className="h-4 w-4" />
                AUTO-SONAR PARAMETERS SCAN
              </button>

              <button
                onClick={toggleLaserGuideline}
                className={`w-full border font-mono text-xs font-bold py-3 flex items-center justify-center gap-2 rounded transition-colors ${
                  state.laserGuideActive
                    ? "border-[#00E676] text-[#00E676] bg-[#00E676]/10"
                    : "border-[#4d4732] text-[#d0c6ab] hover:text-white"
                }`}
              >
                <Zap className="h-4 w-4" />
                {state.laserGuideActive ? "DISABLE LASER POINTER" : "ACTIVATE LASER GUIDELINE"}
              </button>
            </div>
          </div>

          {/* Grams Clips Cabinet */}
          <div className="bg-[#1a1a2e] border border-[#ffd700]/10 p-5 rounded-lg space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold text-[#ffd700] tracking-wider uppercase border-b border-[#4d4732]/40 pb-2 flex justify-between">
                <span>// LEAD WEIGHT CABINET</span>
                <span className="text-[#00E676] font-sans font-normal text-[10px]">{activeCabinetWeight}g selected</span>
              </h4>

              {/* Weight Selector */}
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 25, 35].map((w) => (
                  <button
                    key={w}
                    onClick={() => setActiveCabinetWeight(w)}
                    className={`py-2 text-xs font-mono font-bold rounded border transition-all ${
                      activeCabinetWeight === w
                        ? "bg-[#ffd700] text-[#161308] border-[#ffd700]"
                        : "bg-[#161308] border-[#4d4732] hover:border-[#ffd700] text-[#eae2cf]"
                    }`}
                  >
                    {w}g
                  </button>
                ))}
              </div>

              {/* Application points */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleWeightApply("inner")}
                  disabled={state.isSpinning || state.innerApplied >= state.innerImbalance}
                  className="bg-[#231f14] border border-[#ffd700]/30 hover:border-[#ffd700] disabled:opacity-50 py-3 text-xs font-mono rounded font-bold text-center"
                >
                  Apply to Left
                  <span className="block text-[9px] text-zinc-500 font-normal">Inner Rim</span>
                </button>
                <button
                  onClick={() => handleWeightApply("outer")}
                  disabled={state.isSpinning || state.outerApplied >= state.outerImbalance}
                  className="bg-[#231f14] border border-[#ffd700]/30 hover:border-[#ffd700] disabled:opacity-50 py-3 text-xs font-mono rounded font-bold text-center"
                >
                  Apply to Right
                  <span className="block text-[9px] text-zinc-500 font-normal">Outer Rim</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#4d4732]/30 space-y-2">
              <button
                onClick={handleClearWeights}
                className="w-full text-xs font-mono text-center text-zinc-500 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                CLEAR ALL CABINET WEIGHTS
              </button>
            </div>
          </div>
        </div>
      </div>

      {state.isBalanced && (
        <div className="bg-[#00E676] text-[#161308] py-4 px-6 font-mono text-center text-xs font-black tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck className="h-5 w-5 shrink-0 animate-bounce" />
          CALIBRATION SUCCESS: HUB IS EXTREMELY BALANCED [REMAINDER: 0.00g] // PASS
        </div>
      )}
    </div>
  );
}
