export interface Image {
    url: string;
    publicId: string;
    file: File;
}

export interface Video {
    url: string;
    publicId: string;
    file: File;
}

export interface Machine {
    _id?: string;
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    powerSource: 'Electric' | 'Fuel-powered' | 'Manual' | 'Hybrid' | '';
    capacity: string;
    media: {
        images: Image[];
        videos: Video[];
    };
    featured?: boolean;
    tags?: string[];
    specifications: {
        weight?: string;
        dimensions?: string;
        materials: string;
        [key: string]: string | undefined;
    }
    __v?: number;
}


export const machineDefaultData: Machine = {
    name: "",
    description: "",
    shortDescription: "",
    powerSource: "",
    capacity: "",
    specifications: {
        dimensions: "",
        weight: "",
        materials: "",
    },
    media: {
        images: [],
        videos: [],
    },
    featured: false,
    category: "",
}