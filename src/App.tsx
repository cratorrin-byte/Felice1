import React, { useState } from "react";
import { 
  Play, 
  Wrench, 
  ShieldCheck, 
  ChevronRight, 
  ArrowUpRight, 
  Check, 
  FileText, 
  Sparkles, 
  Clock, 
  HelpCircle,
  X,
  PhoneCall,
  Settings,
  Shield,
  Send
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SpecsModal from "./components/SpecsModal";
import QuoteForm from "./components/QuoteForm";
import BalancerSimulator from "./components/BalancerSimulator";
import WorkshopsConfigurator from "./components/WorkshopsConfigurator";
import { PRODUCTS } from "./data";
import { Product, WorkshopConfig } from "./types";

export default function App() {
  // Navigation active focus
  const [activeView, setActiveView] = useState("catalog");

  // Custom configurations stored locally
  const [config, setConfig] = useState<WorkshopConfig>({
    balancersCount: 1,
    changersCount: 1,
    liftsCount: 1,
    hasLaserUpgrade: true,
    hasSonarUpgrade: false,
    hasAssistArmUpgrade: true,
    hasOverheadBeamUpgrade: false,
    powerPhase: "ThreePhase",
  });

  // Modal spec triggers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Quote Request Drawer/Slide-over
  const [quoteDrawerOpen, setQuoteDrawerOpen] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const [bottomFormSuccess, setBottomFormSuccess] = useState(false);
  const [bottomFormSubmitting, setBottomFormSubmitting] = useState(false);

  // Video overlay
  const [videoOpen, setVideoOpen] = useState(false);

  const handleAddToConfig = (prodId: string) => {
    if (prodId === "ai-600b") {
      setConfig(p => ({ ...p, balancersCount: p.balancersCount + 1 }));
    } else if (prodId === "quantum") {
      setConfig(p => ({ ...p, changersCount: p.changersCount + 1 }));
    } else if (prodId === "two-post") {
      setConfig(p => ({ ...p, liftsCount: p.liftsCount + 1 }));
    }
  };

  const handleNavIndex = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBottomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ctaEmail) return;

    setBottomFormSubmitting(true);
    setTimeout(() => {
      setBottomFormSubmitting(false);
      setBottomFormSuccess(true);
    }, 1500);
  };

  return (
    <div className="industrial-grid bg-[#161308] text-[#eae2cf] min-h-screen selection:bg-[#ffd700] selection:text-[#161308] relative font-sans overflow-x-hidden">
      
      {/* Top sticky app-bar */}
      <Header 
        onRequestQuote={() => setQuoteDrawerOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="space-y-24 pb-12 max-w-7xl mx-auto px-4 md:px-16" id="catalog-section">
        
        {/* HERO SECTION - exact match with custom backplate illustration */}
        <section className="relative min-h-[85vh] flex flex-col justify-center py-16 overflow-hidden border-b border-[#4d4732]/20">
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            {/* Grayscale heavy tire changing machinery background matching HTML asset */}
            <img 
              alt="Felice Industrial Heavy Machinery" 
              className="w-full h-full object-cover grayscale brightness-50 scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOnBSq2ft1C2rp_hYkqtxRRDufzoi2zOchQY3_EHS7GeD9jE0py6dIQ6J8qd-n2rm4oG1Dd0gOyTkpAGrBZ8m1EGmEBFrNqcENd0fDIdHsrIM-7OJcYCX0yxY4xjn9kftZuqLcUKwuGD7W7Veb_enDCyKKB2fOmhcSL857gOuhSuk6MTUPWaQ2zx0WTTmgiXt8G7exMyNd4iJtpUwcR2SK6nCc5Hq2q58ZQhQ2_AQqpi9vFvtaNFvJknsywPy5uidpxgwSChM7Eu4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161308] via-transparent to-[#161308]" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full">
              <span className="h-2 w-2 rounded-full bg-[#ffd700] animate-pulse" />
              <span className="font-mono text-[10px] text-[#ffd700] font-bold tracking-widest uppercase">
                ESTABLISHED 1971 // TAIWAN HEADQUARTERS
              </span>
            </div>

            <h2 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white">
              Precision <span className="text-[#ffd700]">Tire Tech</span> <br />For The Industrial Era
            </h2>

            <p className="text-sm md:text-base text-[#d0c6ab] leading-relaxed max-w-lg">
              Leading the high-volume automotive maintenance industries with heavy-duty robotic changers, calibrated dynamic wheel weight indicators, and certified two-post lifting assets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => handleNavIndex("wheel-balancers-section")}
                className="bg-[#ffd700] hover:bg-[#ffe16d] active:scale-95 text-[#161308] py-4 px-8 font-mono text-xs font-bold tracking-wider rounded-sm shadow-[0_4px_20px_rgba(255,215,0,0.15)] transition-all flex items-center justify-center gap-2"
              >
                EXPLORE CATALOG
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setVideoOpen(true)}
                className="border border-[#999077] hover:bg-white/5 py-4 px-8 font-mono text-xs font-bold tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="h-4 w-4 fill-current text-[#ffd700]" />
                WATCH VIDEOS SHOWCASE
              </button>
            </div>
          </div>
        </section>


        {/* STATS BAR - exact specs items block */}
        <section className="bg-[#231f14] py-12 px-6 md:px-10 rounded-md border border-[#4d4732]/30 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-gutter shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          <div className="flex flex-col border-l-2 border-[#ffd700] pl-4 space-y-1">
            <span className="text-4xl font-headline font-black text-[#ffd700] tracking-tight">50+</span>
            <span className="font-mono text-[10px] text-[#d0c6ab] font-bold tracking-wider uppercase">
              Years Experience
            </span>
          </div>
          <div className="flex flex-col border-l-2 border-[#ffd700] pl-4 space-y-1">
            <span className="text-4xl font-headline font-black text-[#ffd700] tracking-tight">1000+</span>
            <span className="font-mono text-[10px] text-[#d0c6ab] font-bold tracking-wider uppercase">
              Workshops Equipped
            </span>
          </div>
          <div className="flex flex-col border-l-2 border-[#ffd700] pl-4 space-y-1">
            <span className="text-4xl font-headline font-black text-[#ffd700] tracking-tight">24/7</span>
            <span className="font-mono text-[10px] text-[#d0c6ab] font-bold tracking-wider uppercase">
              Tech Support Active
            </span>
          </div>
          <div className="flex flex-col border-l-2 border-[#ffd700] pl-4 space-y-1">
            <span className="text-4xl font-headline font-black text-[#ffd700] tracking-tight">GOLD</span>
            <span className="font-mono text-[10px] text-[#d0c6ab] font-bold tracking-wider uppercase">
              Industry Standard
            </span>
          </div>
        </section>


        {/* SECTION: SMART WHEEL BALANCERS (Ai-600B Series) */}
        <section id="wheel-balancers-section" className="space-y-8 border-b border-[#4d4732]/20 pb-16">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#ffd700] font-bold tracking-widest uppercase block">
              ADVANCED CALIBRATION
            </span>
            <h3 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-white block">
              Smart Wheel Balancers
            </h3>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left Image Asset */}
            <div className="md:col-span-5 bg-[#1f1b10] border border-[#4d4732]/30 rounded p-4 h-96 flex items-center justify-center overflow-hidden">
              <img 
                alt="FELICE Wheel Balancer Series" 
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbTRr88zSbgGa0pbDeY5hozF4aFA0Lgp_EmPKC7NqCGz12ljIXlw_xW7fMMmyYgT267W5_1Pv-XrIXlIVBXJVUUtAVZqSf8pZl-yKyQ7e_zdhITfWlFIIbuqR3XS8hzDMqnnnRJu7HlOsUecfXYq6Bx2UaFGn6oOyQ5rK5SHYqbom7KoOM1RZH8-v8HBL6MJItJVITpqs5xNkDkxttdPQsgIKxbmU27GXOT4KVj3zkHAQP7CNbfMVuI2jTn7TKW2ch2qmYwRgqdCo"
              />
            </div>

            {/* Right Information Specification block */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex justify-between items-center bg-[#4d4732]/10 px-4 py-2 border-l-2 border-[#ffd700]">
                <h4 className="font-headline text-2xl font-black text-white">Ai-600B Series</h4>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#ffd700] bg-[#ffd700]/10 px-2.5 py-1 border border-[#ffd700]/30 rounded-sm">
                  CE CERTIFIED
                </span>
              </div>

              <p className="text-sm text-[#d0c6ab] leading-relaxed">
                Experience maximum measuring speed. Features a digital 19-inch high-contrast workstation with automated micro-sonars for parameter ingestion and custom laser spotting guideline systems.
              </p>

              <ul className="space-y-3.5 pb-4">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#ffd700]/10 flex items-center justify-center text-[#ffd700] mt-0.5">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                  <p className="text-sm text-[#d0c6ab]">High-precision laser positioning for millimeter accuracy.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#ffd700]/10 flex items-center justify-center text-[#ffd700] mt-0.5">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                  <p className="text-sm text-[#d0c6ab]">Automated parameter capture via contactless sonar sensor.</p>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setSelectedProduct(PRODUCTS[0])}
                  className="bg-transparent border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#161308] font-mono text-xs font-bold py-3.5 px-6 rounded-sm tracking-widest transition-all duration-300"
                >
                  VIEW SPECIFICATIONS
                </button>
                <button
                  onClick={() => {
                    handleAddToConfig("ai-600b");
                    setQuoteDrawerOpen(true);
                  }}
                  className="bg-[#231f14] border border-[#4d4732] hover:border-[#ffd700] font-mono text-xs font-bold py-3.5 px-6 rounded-sm text-white"
                >
                  ADD TO WORKSHOP LINEUP
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION: PROFESSIONAL TYRE CHANGERS (Quantum Series) */}
        <section id="tyre-changers-section" className="space-y-8 border-b border-[#4d4732]/20 pb-16">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#ffd700] font-bold tracking-widest uppercase block">
              HEAVY-DUTY PERFORMANCE
            </span>
            <h3 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-white block">
              Professional Tyre Changers
            </h3>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left description text */}
            <div className="md:col-span-7 space-y-6 order-2 md:order-1">
              <div className="flex justify-between items-center bg-[#4d4732]/10 px-4 py-2 border-l-2 border-[#ffd700]">
                <h4 className="font-headline text-2xl font-black text-white">Quantum Series</h4>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#ffd700] bg-[#ffd700]/10 px-2.5 py-1 border border-[#ffd700]/30 rounded-sm">
                  HEAVY-DUTY
                </span>
              </div>

              <p className="text-sm text-[#d0c6ab] leading-relaxed">
                Leverless automatic changer featuring robust dual helper-pneumatic arms specs. Fully designed to accommodate massive, high-profile tires up to 32 inches inside busy fleets or custom workshops.
              </p>

              {/* Specification highlight grid from screenshot */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#161308] p-4 rounded border border-[#4d4732]/20">
                  <span className="block text-[9px] font-mono text-[#ffd700] uppercase font-bold tracking-wider">
                    // TYRE CAPACITY
                  </span>
                  <span className="text-lg font-headline font-black text-white">Up to 32"</span>
                </div>
                <div className="bg-[#161308] p-4 rounded border border-[#4d4732]/20">
                  <span className="block text-[9px] font-mono text-[#ffd700] uppercase font-bold tracking-wider">
                    // TORQUE MOTOR
                  </span>
                  <span className="text-lg font-headline font-black text-white">3.5kW Power</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setSelectedProduct(PRODUCTS[1])}
                  className="bg-transparent border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#161308] font-mono text-xs font-bold py-3.5 px-6 rounded-sm tracking-widest transition-all duration-300"
                >
                  VIEW SPECIFICATIONS
                </button>
                <button
                  onClick={() => {
                    handleAddToConfig("quantum");
                    setQuoteDrawerOpen(true);
                  }}
                  className="bg-[#231f14] border border-[#4d4732] hover:border-[#ffd700] font-mono text-xs font-bold py-3.5 px-6 rounded-sm text-white"
                >
                  ADD TO WORKSHOP LINEUP
                </button>
              </div>
            </div>

            {/* Right Image Asset */}
            <div className="md:col-span-5 bg-[#1f1b10] border border-[#4d4732]/30 rounded p-4 h-96 flex items-center justify-center overflow-hidden order-1 md:order-2">
              <img 
                alt="FELICE Tyre Changer Series" 
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJSPR5wrdVQf4E2yUnSdjoB3VgGOkcl_EKL7GmLDKQmSe4IURHAOIakj09zLJaDfSgawOhZ4FoXillkBEHW3byGKHd4_2f8vlCGnZbCY_L0_qtfcq1-TYLZNbo8x6ZAQxj2NokLegLXRzLMhUv3nL-P8f14CigsLrzfPyzkTAFZPjvU-l2bP8-iiVzjT4BALgEfbWw9NtZHmcNGbVhH4Bcr_-Q8wkwYAyt-QNK_LSDAxmSMcB56tTmUJg_guMcbJA0cK_7EemKFrM"
              />
            </div>
          </div>
        </section>


        {/* SECTION: INDUSTRIAL LIFTING SYSTEMS (Two-Post Lift) */}
        <section id="lifting-systems-section" className="space-y-8 border-b border-[#4d4732]/20 pb-16">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#ffd700] font-bold tracking-widest uppercase block">
              SAFETY FIRST
            </span>
            <h3 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-white block">
              Industrial Lifting Systems
            </h3>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-lg grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left Image Asset */}
            <div className="md:col-span-5 bg-[#1f1b10] border border-[#4d4732]/30 rounded p-4 h-96 flex items-center justify-center overflow-hidden">
              <img 
                alt="FELICE Lift Series" 
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmspAvpQPys67JgdAWTiIxo-83_ic14z6Nq_JLeuT7mKW71fPkIK2ujWbMUS1mlVSKLn7w341DzE0tjJ656unYkg4TI_zi7L17-lMIOQnaVLXIxitDMgi7BT69P7hlU6aeec0pSUCCosfLlz4BhYxod6bBVmmkkuzTg1X56kLZind5iFwhPc7dsOUrRVPnrXKBjfFb3pCvI9X3ficT-gQ71PEja3N0dWc7FOyHaj7G4yBNtY_QBcMtKMpp1nspvbwOKX8hKTQn4-U"
              />
            </div>

            {/* Right details panel */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex justify-between items-center bg-[#4d4732]/10 px-4 py-2 border-l-2 border-[#ffd700]">
                <h4 className="font-headline text-2xl font-black text-white">Mechanical Two-Post Lift</h4>
                <span className="text-[10px] font-mono font-bold tracking-wider text-[#ffd700] bg-[#ffd700]/10 px-2.5 py-1 border border-[#ffd700]/30 rounded-sm">
                  5.0T RATED
                </span>
              </div>

              <p className="text-sm text-[#d0c6ab] leading-relaxed">
                Heavy-capacity space-efficient asymmetric layout lift. Fully ANSI Certified, combining automated column mechanical load locking steps with powerful redundant 3.0kW synchronous motors.
              </p>

              <div className="bg-[#231f14] p-4 border border-[#ffd700]/10 font-mono text-xs text-[#d0c6ab] space-y-2.5">
                <span className="block text-[10px] font-mono text-[#ffd700] font-bold tracking-wider uppercase mb-1">
                  // CRITICAL HYDRAULIC TOLERANCES
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div>Max Height Clearance: <strong className="text-white">4120 mm</strong></div>
                  <div>Pad Minimum Ground clearance: <strong className="text-white">95 mm</strong></div>
                  <div>Full Translation Time: <strong className="text-white">45s</strong></div>
                  <div>Safety locks intervals: <strong className="text-white">Every 50mm</strong></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setSelectedProduct(PRODUCTS[2])}
                  className="bg-transparent border border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-[#161308] font-mono text-xs font-bold py-3.5 px-6 rounded-sm tracking-widest transition-all duration-300"
                >
                  VIEW SPECIFICATIONS
                </button>
                <button
                  onClick={() => {
                    handleAddToConfig("two-post");
                    setQuoteDrawerOpen(true);
                  }}
                  className="bg-[#231f14] border border-[#4d4732] hover:border-[#ffd700] font-mono text-xs font-bold py-3.5 px-6 rounded-sm text-white"
                >
                  ADD TO WORKSHOP LINEUP
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* SECTION: PRECISION INTELLIGENCE (Diagnostic Terminal Simulator Block) */}
        <section id="simulator-section" className="space-y-10 border-b border-[#4d4732]/20 pb-20">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-[#ffd700] font-bold tracking-widest uppercase block">
              PRECISION INTELLIGENCE SOFTWARE
            </span>
            <h3 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-white block">
              Autonomous Diagnostic Simulator
            </h3>
            <p className="text-sm text-[#d0c6ab] max-w-xl mx-auto leading-relaxed">
              Test drive the FELICE software console yourself. Interact with sonar offsets, trigger wheel balancing trials, and attach adhesive zinc gram weights to optimize hub imbalances.
            </p>
          </div>

          {/* Embedded rich interactive simulator */}
          <BalancerSimulator />
        </section>


        {/* SECTION: WORKSHOP CONFIGURATOR MODELER (Interactive Blueprint builder) */}
        <section id="configurator-section" className="space-y-10 border-b border-[#4d4732]/20 pb-20">
          <WorkshopsConfigurator 
            config={config}
            setConfig={setConfig}
            onConfigureSubmit={() => setQuoteDrawerOpen(true)}
          />
        </section>


        {/* SECTION: FOOTER CTA FORM ("Ready to upgrade your workshop?") */}
        <section className="bg-[#110e05] py-20 px-6 md:px-12 rounded-xl relative overflow-hidden border border-[#4d4732]/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ffd700]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Form Column */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none">
                Ready to upgrade your workshop?
              </h3>
              <p className="text-sm text-[#d0c6ab] leading-relaxed">
                Submit your corporate email below. Our Taipei system designers will assemble custom telemetry planning maps matching your requested units.
              </p>

              {bottomFormSuccess ? (
                <div className="bg-[#00E676]/10 border border-[#00E676]/30 p-5 rounded-sm flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#00E676]/20 flex items-center justify-center text-[#00E676]">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-white text-sm">Site request submitted!</h5>
                    <p className="text-xs text-[#d0c6ab]">Custom schematics sent to <span className="text-white font-mono">{ctaEmail}</span></p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBottomSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[#ffd700] tracking-widest uppercase block font-bold">
                      BUSINESS EMAIL ADDRESS
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        required
                        type="email" 
                        placeholder="name@workshop.com"
                        value={ctaEmail}
                        onChange={(e) => setCtaEmail(e.target.value)}
                        className="flex-1 bg-[#161308] border border-[#4d4732]/60 focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700] py-4 px-4 text-sm text-[#eae2cf] outline-none transition-all rounded-sm"
                      />
                      <button 
                        type="submit"
                        disabled={bottomFormSubmitting}
                        className="bg-[#ffd700] hover:bg-[#ffe16d] disabled:opacity-50 text-[#161308] font-mono text-xs font-black tracking-wider uppercase py-4 px-6 rounded-sm shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-colors"
                      >
                        {bottomFormSubmitting ? "TRANSMITTING..." : "REQUEST QUOTE"}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Hotline Column */}
            <div className="md:col-span-5 h-full flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#4d4732]/30 pt-10 md:pt-0 md:pl-10 space-y-4">
              <span className="font-mono text-[10px] text-[#a0a0a0] tracking-wider uppercase block font-bold">
                // SALES & CALIBRATION HOTLINE
              </span>
              <a 
                href="tel:+886423501971" 
                className="font-headline text-3xl font-extrabold text-[#ffd700] hover:text-[#ffe16d] transition-colors leading-tight tracking-wider"
              >
                +886-4-2350-1971
              </a>
              <p className="text-xs text-[#a0a0a0] leading-relaxed">
                Contact our customer solutions center inside Taichung, Taiwan directly. Engineering office hours: Mon - Fri: 08:00 - 18:00 (UTC+8).
              </p>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <Footer onNavIndex={handleNavIndex} />


      {/* SPECIFICATIONS BLUEPRINT MODAL POPUP */}
      {selectedProduct && (
        <SpecsModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToConfig={(prodId) => {
            handleAddToConfig(prodId);
            setQuoteDrawerOpen(true);
          }}
        />
      )}


      {/* SLIDE-OVER DRAWER FOR CUSTOM QUANTITY ESTIMATE PROP */}
      {quoteDrawerOpen && (
        <div className="fixed inset-0 z-55 flex justify-end bg-[#110e05]/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-[#1a1a2e] border-l-2 border-[#ffd700]/30 h-full overflow-y-auto p-6 md:p-8 relative shadow-2xl flex flex-col justify-between text-[#eae2cf]">
            
            <button 
              onClick={() => setQuoteDrawerOpen(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-white/10 rounded text-[#d0c6ab] hover:text-[#ffd700] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6 flex-1 pt-6">
              <QuoteForm 
                config={config}
                setConfig={setConfig}
                onClose={() => setQuoteDrawerOpen(false)}
                defaultEmail={ctaEmail}
              />
            </div>

          </div>
        </div>
      )}


      {/* VIDEO PREVIEW MODAL */}
      {videoOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-[#110e05]/90 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-[#1a1a2e] border border-[#ffd700]/40 rounded-md p-6 space-y-4 text-[#eae2cf]">
            <div className="flex justify-between items-center border-b border-[#4d4732]/40 pb-3">
              <h4 className="font-headline text-xl font-bold">// FELICE EQUIPMENT IN-ACTION WORKSHOPS</h4>
              <button onClick={() => setVideoOpen(false)} className="text-[#a0a0a0] hover:text-[#ffd700]">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="aspect-video bg-[#111120] rounded relative overflow-hidden flex flex-col items-center justify-center border border-white/5 shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img 
                alt="Workshop installation" 
                className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity grayscale" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOnBSq2ft1C2rp_hYkqtxRRDufzoi2zOchQY3_EHS7GeD9jE0py6dIQ6J8qd-n2rm4oG1Dd0gOyTkpAGrBZ8m1EGmEBFrNqcENd0fDIdHsrIM-7OJcYCX0yxY4xjn9kftZuqLcUKwuGD7W7Veb_enDCyKKB2fOmhcSL857gOuhSuk6MTUPWaQ2zx0WTTmgiXt8G7exMyNd4iJtpUwcR2SK6nCc5Hq2q58ZQhQ2_AQqpi9vFvtaNFvJknsywPy5uidpxgwSChM7Eu4"
              />
              <div className="relative z-20 text-center space-y-3 p-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#ffd700] text-[#161308] flex items-center justify-center shadow-[0_0_20px_#ffd700]">
                  <Play className="h-5 w-5 fill-current ml-1" />
                </div>
                <div>
                  <h5 className="font-bold text-base text-white">Taiwan Production Facility tour // Video Feed</h5>
                  <p className="text-xs text-zinc-400">Showing automated laser alignment validation on spin testing platforms.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                onClick={() => setVideoOpen(false)} 
                className="bg-[#393528] hover:bg-[#4d4732] text-xs font-mono font-bold py-2.5 px-5 rounded-sm"
              >
                CLOSE STREAM
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
