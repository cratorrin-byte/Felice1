import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "ai-600b",
    name: "Ai-600B Series",
    series: "Smart Wheel Balancer",
    category: "Balancing",
    tagline: "ADVANCED CALIBRATION",
    badge: "CE CERTIFIED",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbTRr88zSbgGa0pbDeY5hozF4aFA0Lgp_EmPKC7NqCGz12ljIXlw_xW7fMMmyYgT267W5_1Pv-XrIXlIVBXJVUUtAVZqSf8pZl-yKyQ7e_zdhITfWlFIIbuqR3XS8hzDMqnnnRJu7HlOsUecfXYq6Bx2UaFGn6oOyQ5rK5SHYqbom7KoOM1RZH8-v8HBL6MJItJVITpqs5xNkDkxttdPQsgIKxbmU27GXOT4KVj3zkHAQP7CNbfMVuI2jTn7TKW2ch2qmYwRgqdCo",
    description: "Premium computer-guided balancer equipped with automated micro-sonars for contactless parameters entry.",
    bullets: [
      "High-precision laser positioning for millimeter accuracy.",
      "Automated data entry via sonar distance sensor.",
      "Interactive 19-inch visual telemetry control deck.",
      "Dual electro-magnetic automatic mechanical locking shaft."
    ],
    specs: [
      { label: "Max Wheel Weight", value: "75 kg" },
      { label: "Balancing Precision", value: "±1g" },
      { label: "Measuring Time", value: "6.0 s" },
      { label: "Spindle Speed", value: "180 rpm" },
      { label: "Rim Diameter Range", value: "10\" - 30\"" },
      { label: "Rim Width Range", value: "1.5\" - 20\"" }
    ]
  },
  {
    id: "quantum",
    name: "Quantum Series",
    series: "Professional Tyre Changer",
    category: "TireChanger",
    tagline: "HEAVY-DUTY PERFORMANCE",
    badge: "HEAVY-DUTY",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJSPR5wrdVQf4E2yUnSdjoB3VgGOkcl_EKL7GmLDKQmSe4IURHAOIakj09zLJaDfSgawOhZ4FoXillkBEHW3byGKHd4_2f8vlCGnZbCY_L0_qtfcq1-TYLZNbo8x6ZAQxj2NokLegLXRzLMhUv3nL-P8f14CigsLrzfPyzkTAFZPjvU-l2bP8-iiVzjT4BALgEfbWw9NtZHmcNGbVhH4Bcr_-Q8wkwYAyt-QNK_LSDAxmSMcB56tTmUJg_guMcbJA0cK_7EemKFrM",
    description: "Leverless design engineered for the most demanding workshops. Ideal for low-profile, run-flat, and delicate alloy structures.",
    bullets: [
      "Leverless automatic demounting tool with polymer safety protection.",
      "Dual bead breaker cylinders delivering over 15,000 N of vertical force.",
      "Pneumatically controlled helper arm to securely navigate tricky rigid beads.",
      "Robust pedal assembly for high-torque dual rotation speed (7 / 14 rpm)."
    ],
    specs: [
      { label: "Clamping Capacity", value: "10\" - 32\"" },
      { label: "Max Tire Diameter", value: "1200 mm" },
      { label: "Max Tire Width", value: "15\"" },
      { label: "Operating Pressure", value: "8 - 10 bar" },
      { label: "Motor Power", value: "3.5 kW" },
      { label: "Electrical Input", value: "400V 3ph 50Hz" }
    ]
  },
  {
    id: "two-post",
    name: "Mechanical Two-Post Lift",
    series: "Industrial Lifting Systems",
    category: "Lift",
    tagline: "SAFETY FIRST",
    badge: "5.0T RATED",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmspAvpQPys67JgdAWTiIxo-83_ic14z6Nq_JLeuT7mKW71fPkIK2ujWbMUS1mlVSKLn7w341DzE0tjJ656unYkg4TI_zi7L17-lMIOQnaVLXIxitDMgi7BT69P7hlU6aeec0pSUCCosfLlz4BhYxod6bBVmmkkuzTg1X56kLZind5iFwhPc7dsOUrRVPnrXKBjfFb3pCvI9X3ficT-gQ71PEja3N0dWc7FOyHaj7G4yBNtY_QBcMtKMpp1nspvbwOKX8hKTQn4-U",
    description: "Space-efficient asymmetric lifting system engineered to deliver superior workspace clearance and rigid security.",
    bullets: [
      "Electro-mechanical synchronized heights with triple redundency chain sensors.",
      "Low profile lifting pads adaptable to modern electric vehicle low-hung batteries.",
      "Mechanical safety lock triggers every 50mm of upward carriage translation.",
      "Dual powerful 3.0 kW heavy duty motors to raise max capacity effortlessly."
    ],
    specs: [
      { label: "Lifting Capacity", value: "5,000 kg (5.0T)" },
      { label: "Max Lifting Height", value: "1,980 mm" },
      { label: "Lowest Pad Height", value: "95 mm" },
      { label: "Overall Column Height", value: "4,120 mm" },
      { label: "Width Between Columns", value: "2,850 mm" },
      { label: "Lifting Time", value: "45 seconds" }
    ]
  }
];

export const WORKSHOP_UPGRADES = [
  {
    id: "laser",
    name: "Precision Laser Guideline System (Balancer upgrade)",
    description: "Casts a vivid green line at exactly 6 o'clock highlighting clip-on or adhesive placement positions.",
    powerIncreaseKW: 0.1,
    priceLabel: "Included in Pro Kit"
  },
  {
    id: "sonar",
    name: "Automated Contactless Sonar Distance Entry",
    description: "Eliminates physical parameters entry; measures wheel offset and widths instantly on hood drop.",
    powerIncreaseKW: 0.15,
    priceLabel: "Premium Upgrade"
  },
  {
    id: "assistArm",
    name: "Dual Pneumatic Bead Helper Arms (Tyre Changer upgrade)",
    description: "Indispensable helper arms that push run-flat tires down during rotation, preventing bead tearing.",
    powerIncreaseKW: 0.5,
    priceLabel: "Essential for Low-profile"
  },
  {
    id: "overheadBeam",
    name: "Overhead Laser Safety Limit Beam (Lift upgrade)",
    description: "Halts power instantly if a vehicle's roof breaks the beam threshold near overhead steel trusses.",
    powerIncreaseKW: 0.2,
    priceLabel: "ANSI Compliant Approved"
  }
];
