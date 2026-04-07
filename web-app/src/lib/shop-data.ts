export interface InventoryItem {
  id: string;
  name: string;
  category: 'real-estate' | 'building-materials';
  subCategory: string;
  price: string;
  description: string;
  image: string;
  location?: string;
  features: string[];
}

export const inventory: InventoryItem[] = [
  // Real Estate - Luxury
  {
    id: "re-1",
    name: "The Zenith Penthouse",
    category: "real-estate",
    subCategory: "Apartments",
    price: "₦1,200,000,000",
    description: "A breathtaking per-level penthouse with 360-degree views of Victoria Island and the Atlantic Ocean.",
    image: "/gallery-zenith.png",
    location: "Victoria Island, Lagos",
    features: ["5 Bedrooms", "Private Infinity Pool", "Smart Home Integration", "Concierge Service"]
  },
  {
    id: "re-2",
    name: "Lekki Phase 1 Smart Duplex",
    category: "real-estate",
    subCategory: "Apartments",
    price: "₦350,000,000",
    description: "Contemporary 4-bedroom detached duplex featuring cutting-edge automated systems and premium finishing.",
    image: "/gallery-lekki-smart.png",
    location: "Lekki Phase 1, Lagos",
    features: ["4 Bedrooms", "Automated Lighting", "Solar Power Ready", "CCTV Security"]
  },
  {
    id: "re-3",
    name: "Epe Resort & Estate Land",
    category: "real-estate",
    subCategory: "Land",
    price: "₦15,000,000",
    description: "Prime residential plots within a gated community, perfect for holiday homes or investment.",
    image: "/gallery-epe-land.png",
    location: "Epe, Lagos",
    features: ["500sqm", "Registered Survey", "C of O in Progress", "Gated Security"]
  },
  {
    id: "re-4",
    name: "Boutique Shortlet Suites",
    category: "real-estate",
    subCategory: "Shortlets",
    price: "₦75,000 / Night",
    description: "Exquisitely furnished 2-bedroom shortlet apartments for executives and luxury travelers.",
    image: "/gallery-shortlet.png",
    location: "Ikeja GRA, Lagos",
    features: ["2 Bedrooms", "High-speed Wi-Fi", "Fully Equipped Kitchen", "24/7 Power"]
  },
  {
    id: "re-5",
    name: "Ikeja Commercial Plaza",
    category: "real-estate",
    subCategory: "Commercial",
    price: "₦2,500,000,000",
    description: "A grade-A commercial office complex in the heart of Ikeja, designed for corporate giants and luxury retail.",
    image: "/gallery-industrial-1.jpg",
    location: "Ikeja, Lagos",
    features: ["10 Floors", "Underground Parking", "Central AC", "Helipad Ready"]
  },
  {
    id: "re-6",
    name: "Royal Palm Villa",
    category: "real-estate",
    subCategory: "Apartments",
    price: "₦600,000,000",
    description: "An architectural masterpiece in the serene Ikoyi neighborhood, featuring state-of-the-art living spaces and high-end security.",
    image: "/gallery-highrise-1.jpg",
    location: "Ikoyi, Lagos",
    features: ["6 Bedrooms", "Smart Home Hub", "Private Cinema", "Elevator"]
  },

  // Building Materials
  {
    id: "bm-1",
    name: "Dangote Cement (Grade 42.5R)",
    category: "building-materials",
    subCategory: "Foundations",
    price: "Request Quote",
    description: "High-strength cement for robust structural foundations and industrial construction projects.",
    image: "/bm-cement.png",
    features: ["Extra Strength", "Rapid Setting", "Certified Quality", "Bulk Delivery Available"]
  },
  {
    id: "bm-2",
    name: "Structural Steel Rods (12mm)",
    category: "building-materials",
    subCategory: "Structural Steel",
    price: "₦1,450,000 / Ton",
    description: "BS 4449 grade reinforced steel rods for beams, columns, and concrete reinforcement.",
    image: "/bm-steel.png",
    features: ["Anti-Corrosive", "High Tensile Strength", "Standard Lengths", "Verified Batch Test"]
  },
  {
    id: "bm-3",
    name: "Premium Italian Floor Tiles",
    category: "building-materials",
    subCategory: "Finishing",
    price: "₦12,500 / sqm",
    description: "Luxury 60x60cm porcelain floor tiles with a polished mirror finish for high-end interiors.",
    image: "/gallery-industrial-2.jpg",
    features: ["Porcelain Material", "Scratch Resistant", "Reflective Finish", "Multiple Colorways"]
  },
  {
    id: "bm-4",
    name: "Industrial Copper Wiring (2.5mm)",
    category: "building-materials",
    subCategory: "Industrial Fittings",
    price: "₦45,000 / Roll",
    description: "Top-grade insulated copper electrical wires for residential and commercial wiring.",
    image: "/eng-pm.jpg",
    features: ["Pure Copper Core", "Weather Resistant Insulation", "Standard 100m Roll", "Flame Retardant"]
  },
  {
    id: "bm-5",
    name: "Pure White Greek Marble",
    category: "building-materials",
    subCategory: "Finishing",
    price: "₦45,000 / sqm",
    description: "Exquisite Thassos Grade-A marble with a pure white surface, perfect for luxury flooring and wall cladding.",
    image: "/gallery-highrise-2.jpg",
    features: ["20mm Thickness", "Polished Finish", "Natural Stone", "Reflective Surface"]
  },
  {
    id: "bm-6",
    name: "Heavy Duty Concrete Mixer",
    category: "building-materials",
    subCategory: "Equipment",
    price: "₦1,200,000",
    description: "Industrial-grade diesel-powered concrete mixer designed for high-volume site operations.",
    image: "/eng-site.jpg",
    features: ["Diesel Powered", "350L Capacity", "Towable Design", "Extra Warranty"]
  }
];
