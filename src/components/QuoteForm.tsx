import React, { useState } from "react";
import { Send, Check, ShieldAlert, Sparkles, Plus, Minus, Trash2 } from "lucide-react";
import { WorkshopConfig } from "../types";
import { PRODUCTS, WORKSHOP_UPGRADES } from "../data";

interface QuoteFormProps {
  config: WorkshopConfig;
  setConfig: React.Dispatch<React.SetStateAction<WorkshopConfig>>;
  onClose?: () => void;
  defaultEmail?: string;
}

export default function QuoteForm({ config, setConfig, onClose, defaultEmail = "" }: QuoteFormProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+886-");
  const [workshopSize, setWorkshopSize] = useState("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  // Calculate stats based on configuration
  const balancerCount = config.balancersCount;
  const changerCount = config.changersCount;
  const liftCount = config.liftsCount;

  // Base motor loads
  const balancerPower = balancerCount * 1.5; // (1.5 kW average during spins)
  const changerPower = changerCount * 3.5; // (3.5 kW standard motor)
  const liftPower = liftCount * 3.0; // (3.0 kW dual crane motors)

  // Upgrade power demands
  const laserPower = config.hasLaserUpgrade ? 0.1 : 0;
  const sonarPower = config.hasSonarUpgrade ? 0.15 : 0;
  const assistPower = config.hasAssistArmUpgrade ? 0.5 : 0;
  const beamPower = config.hasOverheadBeamUpgrade ? 0.2 : 0;

  const totalPower = balancerPower + changerPower + liftPower + laserPower + sonarPower + assistPower + beamPower;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1800);
  };

  const handleClearConfig = () => {
    setConfig({
      balancersCount: 0,
      changersCount: 0,
      liftsCount: 0,
      hasLaserUpgrade: false,
      hasSonarUpgrade: false,
      hasAssistArmUpgrade: false,
      hasOverheadBeamUpgrade: false,
      powerPhase: "ThreePhase",
    });
  };

  return (
    <div className="bg-[#1a1a2e] rounded-md border border-[#4d4732]/50 p-6 md:p-8 space-y-6 text-[#eae2cf]">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full">
          <Sparkles className="h-3.5 w-3.5 text-[#ffd700]" />
          <span className="text-[10px] font-mono text-[#ffd700] uppercase tracking-wider font-bold">
            Real-time Allocation Estimate
          </span>
        </div>
        <h3 className="font-headline text-2xl font-black tracking-tight text-white">
          Secure Workshop Proposal
        </h3>
        <p className="text-xs text-[#d0c6ab] leading-relaxed">
          Specify your equipment setup below. Our structural engineers will compile custom wiring schematics.
        </p>
      </div>

      {submitSuccess ? (
        <div className="bg-[#00E676]/10 border border-[#00E676]/40 p-6 rounded-sm space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00E676]/20 text-[#00E676]">
            <Check className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="space-y-1">
            <h4 className="font-headline text-lg font-bold text-white">Proposal Initiated Successfully</h4>
            <p className="text-xs text-[#d0c6ab]">
              Verification token <span className="text-white font-mono">#FL-{Math.floor(100000 + Math.random() * 900000)}</span>
            </p>
          </div>
          <p className="text-xs text-[#d0c6ab] tracking-wide leading-relaxed">
            Our Taipei technical office has received your specs request for <span className="text-[#ffd700]">{balancerCount + changerCount + liftCount} pieces</span> of high-pressure machinery. An engineer will follow up with load schematics in 2 hours.
          </p>
          <div className="border-t border-[#4d4732]/30 pt-4 text-left space-y-2 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">Recipient:</span>
              <span className="text-white text-right">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#a0a0a0]">Estimated Power Capacity:</span>
              <span className="text-[#ffd700] text-right">{totalPower.toFixed(2)} kW ({config.powerPhase})</span>
            </div>
          </div>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="w-full bg-[#ffd700] text-[#161308] py-2.5 rounded-sm font-mono text-xs font-bold hover:bg-[#ffe16d]"
          >
            UPDATE DETAILS & QUANTITIES
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Layout Setup Grid */}
          <div className="space-y-3">
            <span className="block text-[10px] font-mono text-[#ffd700] uppercase tracking-widest font-bold">
              [STEP 1] CHOOSE ESTIMATED LINEUP
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#161308] p-3 border border-[#4d4732]/40 rounded flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-[#a0a0a0] font-mono uppercase">AI-600B Balancer</span>
                  <span className="text-sm font-mono font-bold text-white">{balancerCount} units</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, balancersCount: Math.max(0, prev.balancersCount - 1) }))}
                    className="p-1 hover:bg-white/5 rounded text-[#d0c6ab] hover:text-[#ffd700]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, balancersCount: prev.balancersCount + 1 }))}
                    className="p-1 hover:bg-white/5 rounded text-[#d0c6ab] hover:text-[#ffd700]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#161308] p-3 border border-[#4d4732]/40 rounded flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-[#a0a0a0] font-mono uppercase">Quantum Changer</span>
                  <span className="text-sm font-mono font-bold text-white">{changerCount} units</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, changersCount: Math.max(0, prev.changersCount - 1) }))}
                    className="p-1 hover:bg-white/5 rounded text-[#d0c6ab] hover:text-[#ffd700]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, changersCount: prev.changersCount + 1 }))}
                    className="p-1 hover:bg-white/5 rounded text-[#d0c6ab] hover:text-[#ffd700]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="bg-[#161308] p-3 border border-[#4d4732]/40 rounded flex justify-between items-center">
                <div>
                  <span className="block text-[10px] text-[#a0a0a0] font-mono uppercase">Mechanical Lift</span>
                  <span className="text-sm font-mono font-bold text-white">{liftCount} units</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, liftsCount: Math.max(0, prev.liftsCount - 1) }))}
                    className="p-1 hover:bg-white/5 rounded text-[#d0c6ab] hover:text-[#ffd700]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, liftsCount: prev.liftsCount + 1 }))}
                    className="p-1 hover:bg-white/5 rounded text-[#d0c6ab] hover:text-[#ffd700]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Electrical Load Warning */}
          {(balancerCount > 0 || changerCount > 0 || liftCount > 0) && (
            <div className="bg-[#231f14] p-4 border-l-2 border-[#ffd700] text-xs font-mono space-y-2">
              <div className="flex justify-between text-[#d0c6ab]">
                <span>TOTAL MACHINERY ITEMS:</span>
                <span className="text-white font-bold">{balancerCount + changerCount + liftCount} units</span>
              </div>
              <div className="flex justify-between text-[#d0c6ab]">
                <span>CALCULATED MOTOR DRAW:</span>
                <span className="text-white font-bold">{totalPower.toFixed(2)} kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#d0c6ab]">ELECTRICAL SYSTEM INPUT:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfig(p => ({ ...p, powerPhase: "SinglePhase" }))}
                    className={`px-2 py-0.5 rounded-sm border ${
                      config.powerPhase === "SinglePhase"
                        ? "border-[#ffd700] text-[#ffd700] bg-[#ffd700]/10"
                        : "border-[#4d4732] text-[#a0a0a0] hover:text-white"
                    }`}
                  >
                    220V 1ph
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfig(p => ({ ...p, powerPhase: "ThreePhase" }))}
                    className={`px-2 py-0.5 rounded-sm border ${
                      config.powerPhase === "ThreePhase"
                        ? "border-[#ffd700] text-[#ffd700] bg-[#ffd700]/10"
                        : "border-[#4d4732] text-[#a0a0a0] hover:text-white"
                    }`}
                  >
                    400V 3ph (Recommended)
                  </button>
                </div>
              </div>
              {totalPower > 15 && (
                <div className="flex items-center gap-1.5 text-[#ff3b30] text-[10px] mt-2 pt-1 border-t border-[#4d4732]/30">
                  <ShieldAlert className="h-3 w-3" />
                  <span>Grid Alert: Combined load exceeding 15kW requires heavy-duty breakers.</span>
                </div>
              )}
            </div>
          )}

          {/* Contact Field inputs */}
          <div className="space-y-4">
            <span className="block text-[10px] font-mono text-[#ffd700] uppercase tracking-widest font-bold">
              [STEP 2] COMPANY & RECIPIENT INFORMATION
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#ffd700] uppercase block">
                  CONTACT NAME
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Linus Lee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161308] border border-[#4d4732]/60 focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] p-3 text-sm rounded outline-none text-[#eae2cf] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#ffd700] uppercase block">
                  BUSINESS EMAIL
                </label>
                <input
                  required
                  type="email"
                  placeholder="e.g. service@leeworkshop.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161308] border border-[#4d4732]/60 focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] p-3 text-sm rounded outline-none text-[#eae2cf] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#ffd700] uppercase block">
                  WORKSHOP COMPANY BRAND
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Lee Precision Tuning"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-[#161308] border border-[#4d4732]/60 focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] p-3 text-sm rounded outline-none text-[#eae2cf] transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-[#ffd700] uppercase block">
                  TELEPHONE / DIRECT DIAL
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+886-4-XXXX-XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#161308] border border-[#4d4732]/60 focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] p-3 text-sm rounded outline-none text-[#eae2cf] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-[#ffd700] uppercase block">
                SPECIAL SITE REQUIREMENTS (OPTIONAL)
              </label>
              <textarea
                placeholder="Write specific workshop constraints, e.g. narrow entrance, low ceilings, overhead steel beams constraints..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                rows={3}
                className="w-full bg-[#161308] border border-[#4d4732]/60 focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] p-3 text-xs rounded outline-none text-[#eae2cf] transition-all"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-[#999077] hover:bg-white/5 text-xs font-mono font-bold py-3.5 tracking-wider uppercase rounded-sm"
              >
                CANCEL SCAN
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] bg-[#ffd700] hover:bg-[#ffe16d] text-[#161308] font-mono text-xs font-black tracking-widest uppercase py-3.5 border-none shadow-[0_0_20px_rgba(255,215,0,0.2)] disabled:opacity-50 flex items-center justify-center gap-2 rounded-sm transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-[#161308] border-t-transparent rounded-full animate-spin" />
                  COMPILING TELEMETRY SPECS...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  COMPILE PROPOSAL
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
