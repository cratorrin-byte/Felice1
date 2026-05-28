export interface Product {
  id: string;
  name: string;
  series: string;
  category: "Balancing" | "TireChanger" | "Lift";
  tagline: string;
  badge: string;
  image: string;
  description: string;
  bullets: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export interface WorkshopConfig {
  balancersCount: number;
  changersCount: number;
  liftsCount: number;
  hasLaserUpgrade: boolean;
  hasSonarUpgrade: boolean;
  hasAssistArmUpgrade: boolean;
  hasOverheadBeamUpgrade: boolean;
  powerPhase: "SinglePhase" | "ThreePhase";
}

export interface SavedQuote {
  id: string;
  email: string;
  products: { name: string; qty: number }[];
  upgrades: string[];
  totalPowerRequired: number;
  status: "Pending" | "Approved" | "Contacted";
  timestamp: string;
}

export interface BalancingSimulatorState {
  wheelWidth: number; // in inches, default 6.5
  wheelDiameter: number; // in inches, default 15
  rimDistance: number; // in mm, default 120
  isSpinning: boolean;
  spinCompleted: boolean;
  innerImbalance: number; // Target weight offset (grams)
  outerImbalance: number; // Target weight offset (grams)
  innerApplied: number; // Grams applied by user
  outerApplied: number; // Grams applied by user
  innerPlacementAngle: number; // 0-359 degrees
  outerPlacementAngle: number; // 0-359 degrees
  currentWheelAngle: number; // Current virtual rotation 0-359
  laserGuideActive: boolean;
  isBalanced: boolean;
}
