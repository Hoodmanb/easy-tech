import type { Machine } from "@/types/machine";

export const machines: Record<string, Machine> = {
  "cnc-milling-machine": {
    id: "cnc-milling-machine",
    name: "CNC Milling Machine",
    description: "Our premium 5-axis CNC milling machine represents the pinnacle of precision manufacturing technology. Designed for complex operations, this machine delivers exceptional accuracy and reliability for demanding industrial applications. The advanced control system ensures consistent results while the robust construction guarantees long-term durability. Perfect for aerospace, automotive, and precision manufacturing industries.",
    shortDescription: "High-precision 5-axis CNC milling machine for complex manufacturing operations.",
    powerSource: "Electric",
    capacity: "10,000 RPM",
    specifications: {
      dimensions: "4m x 3m x 2.5m",
      weight: "5,500 kg",
      materials: "Hardened steel frame with aluminum components",
      workingArea: "1200mm x 800mm x 600mm",
      accuracy: "±0.005mm",
      toolCapacity: "40 tools",
      powerConsumption: "25 kW"
    },
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    videos: ["placeholder-video-1.mp4", "placeholder-video-2.mp4"],
    featured: true,
    category: "Machining",
    price: "Contact for pricing"
  },
  "industrial-lathe": {
    id: "industrial-lathe",
    name: "Industrial Lathe",
    description: "Heavy-duty lathe machine engineered for large-scale turning operations with exceptional precision and reliability. This robust machine is designed to handle the most demanding manufacturing tasks while maintaining superior surface finish and dimensional accuracy. The rigid construction and advanced control system make it ideal for high-volume production environments.",
    shortDescription: "Heavy-duty lathe machine capable of handling large-scale turning operations.",
    powerSource: "Electric",
    capacity: "2,500 RPM",
    specifications: {
      dimensions: "6m x 2m x 1.8m",
      weight: "7,200 kg",
      materials: "Cast iron bed with hardened steel components",
      swingOverBed: "800mm",
      distanceBetweenCenters: "3000mm",
      spindleBore: "105mm",
      powerConsumption: "30 kW"
    },
    images: ["/placeholder.svg", "/placeholder.svg"],
    videos: ["placeholder-video-1.mp4"],
    featured: true,
    category: "Machining",
    price: "Contact for pricing"
  },
  "hydraulic-press": {
    id: "hydraulic-press",
    name: "Hydraulic Press",
    description: "Powerful hydraulic press designed for metal forming and fabrication processes. This versatile machine offers precise control and consistent results for various forming operations including stamping, bending, and deep drawing. The robust hydraulic system ensures reliable operation while the safety features provide secure operation in industrial environments.",
    shortDescription: "Powerful hydraulic press for metal forming and fabrication processes.",
    powerSource: "Electric",
    capacity: "500 Tons",
    specifications: {
      dimensions: "3m x 2m x 4m",
      weight: "8,000 kg",
      materials: "Heavy-duty steel construction",
      bedSize: "2000mm x 1500mm",
      stroke: "800mm",
      approachSpeed: "150mm/s",
      powerConsumption: "18 kW"
    },
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    videos: [],
    featured: false,
    category: "Forming",
    price: "Contact for pricing"
  },
  "welding-station": {
    id: "welding-station",
    name: "Automated Welding Station",
    description: "Advanced automated welding station with robotic arms for consistent, high-quality welds across various materials.",
    shortDescription: "Advanced automated welding station with robotic arms for consistent welds.",
    powerSource: "Electric",
    capacity: "400A",
    specifications: {
      dimensions: "2.5m x 2.5m x 2m",
      weight: "3,500 kg",
      materials: "Aluminum frame with stainless steel components"
    },
    images: ["/placeholder.svg"],
    videos: ["placeholder-welding-demo.mp4"],
    featured: false,
    category: "Welding",
    price: "Contact for pricing"
  },
  "conveyor-system": {
    id: "conveyor-system",
    name: "Industrial Conveyor System",
    description: "Modular conveyor system designed for efficient material handling in manufacturing environments.",
    shortDescription: "Modular conveyor system for efficient material handling.",
    powerSource: "Electric",
    capacity: "1000 kg/minute",
    specifications: {
      dimensions: "Customizable length x 1m x 1.5m",
      weight: "Varies by configuration",
      materials: "Stainless steel with polymer belting"
    },
    images: ["/placeholder.svg", "/placeholder.svg"],
    videos: [],
    featured: false,
    category: "Material Handling",
    price: "Contact for pricing"
  },
  "grinding-machine": {
    id: "grinding-machine",
    name: "Precision Grinding Machine",
    description: "High-precision surface grinding machine for finishing operations with micron-level accuracy.",
    shortDescription: "High-precision surface grinding machine for finishing operations.",
    powerSource: "Electric",
    capacity: "3,600 RPM",
    specifications: {
      dimensions: "2.5m x 1.5m x 2m",
      weight: "4,200 kg",
      materials: "Cast iron base with precision steel components"
    },
    images: ["/placeholder.svg"],
    videos: [],
    featured: false,
    category: "Finishing",
    price: "Contact for pricing"
  },
  "plasma-cutter": {
    id: "plasma-cutter",
    name: "CNC Plasma Cutting Machine",
    description: "High-performance CNC plasma cutting machine for precise metal cutting operations.",
    shortDescription: "High-performance CNC plasma cutting machine for precise metal cutting.",
    powerSource: "Electric",
    capacity: "200A",
    specifications: {
      dimensions: "3m x 2m x 1.5m",
      weight: "2,800 kg",
      materials: "Steel frame with precision guides"
    },
    images: ["/placeholder.svg", "/placeholder.svg"],
    videos: ["placeholder-plasma-cutting.mp4"],
    featured: true,
    category: "Cutting",
    price: "Contact for pricing"
  },
  "laser-cutter": {
    id: "laser-cutter",
    name: "Fiber Laser Cutting Machine",
    description: "Advanced fiber laser cutting system for high-precision cutting of various metals.",
    shortDescription: "Advanced fiber laser cutting system for high-precision metal cutting.",
    powerSource: "Electric",
    capacity: "6kW",
    specifications: {
      dimensions: "4m x 2.5m x 2m",
      weight: "4,500 kg",
      materials: "Cast iron with granite base"
    },
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    videos: ["placeholder-laser-cutting.mp4", "placeholder-laser-setup.mp4"],
    featured: true,
    category: "Cutting",
    price: "Contact for pricing"
  },
  "band-saw": {
    id: "band-saw",
    name: "Horizontal Band Saw",
    description: "Heavy-duty horizontal band saw for cutting large metal sections and pipes.",
    shortDescription: "Heavy-duty horizontal band saw for cutting large metal sections.",
    powerSource: "Electric",
    capacity: "500mm cut capacity",
    specifications: {
      dimensions: "2m x 1.5m x 1.8m",
      weight: "1,200 kg",
      materials: "Cast iron construction"
    },
    images: ["/placeholder.svg"],
    videos: [],
    featured: false,
    category: "Cutting",
    price: "Contact for pricing"
  },
  "drill-press": {
    id: "drill-press",
    name: "Radial Drill Press",
    description: "Heavy-duty radial drill press for large workpieces and precise drilling operations.",
    shortDescription: "Heavy-duty radial drill press for large workpieces and precise drilling.",
    powerSource: "Electric",
    capacity: "50mm drill capacity",
    specifications: {
      dimensions: "2m x 1.8m x 3m",
      weight: "3,200 kg",
      materials: "Cast iron column and base"
    },
    images: ["/placeholder.svg", "/placeholder.svg"],
    videos: [],
    featured: false,
    category: "Machining",
    price: "Contact for pricing"
  },
  "shearing-machine": {
    id: "shearing-machine",
    name: "Hydraulic Shearing Machine",
    description: "Precision hydraulic shearing machine for clean cuts in sheet metal fabrication.",
    shortDescription: "Precision hydraulic shearing machine for clean sheet metal cuts.",
    powerSource: "Electric",
    capacity: "10mm steel capacity",
    specifications: {
      dimensions: "3.5m x 2m x 2.5m",
      weight: "6,500 kg",
      materials: "Heavy steel frame with hardened blades"
    },
    images: ["/placeholder.svg"],
    videos: [],
    featured: false,
    category: "Forming",
    price: "Contact for pricing"
  },
  "bending-machine": {
    id: "bending-machine",
    name: "CNC Press Brake",
    description: "Computer-controlled press brake for precise bending of sheet metal components.",
    shortDescription: "Computer-controlled press brake for precise sheet metal bending.",
    powerSource: "Electric",
    capacity: "200 Tons",
    specifications: {
      dimensions: "4m x 2.5m x 3m",
      weight: "12,000 kg",
      materials: "Steel frame with precision tooling"
    },
    images: ["/placeholder.svg", "/placeholder.svg"],
    videos: ["placeholder-press-brake.mp4"],
    featured: false,
    category: "Forming",
    price: "Contact for pricing"
  }
};

export const getMachinesByCategory = (category: string): Machine[] => {
  return Object.values(machines).filter(machine => machine.category === category);
};

export const getRelatedMachines = (machineId: string, limit: number = 3): Machine[] => {
  const currentMachine = machines[machineId];
  if (!currentMachine) return [];
  
  return Object.values(machines)
    .filter(machine => machine.id !== machineId && machine.category === currentMachine.category)
    .slice(0, limit);
};