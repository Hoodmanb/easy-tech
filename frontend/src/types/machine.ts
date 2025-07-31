export interface Machine {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  powerSource: 'Electric' | 'Fuel-powered' | 'Manual' | 'Hybrid';
  capacity: string;
  specifications: {
    dimensions: string;
    weight: string;
    materials: string;
    [key: string]: string;
  };
  images: string[];
  videos: string[];
  price?: string;
  featured?: boolean;
  category?: string;
}

export interface MachineFormData {
  name: string;
  description: string;
  shortDescription: string;
  powerSource: Machine['powerSource'];
  capacity: string;
  specifications: {
    dimensions: string;
    weight: string;
    materials: string;
    [key: string]: string;
  };
  images: string[];
  videos: string[];
  price?: string;
  featured?: boolean;
  category?: string;
}