export interface Image {
    url: string;
    publicId: string;
}

export interface Video {
    url: string;
    publicId: string;
}

export interface Machine {
    _id: string;
    name: string;
    category: string;
    shortDescription: string;
    description: string;
    powerSource: 'Electric' | 'Fuel-powered' | 'Manual' | 'Hybrid';
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
    createdAt?: string;
    updatedAt?: string;
    price?: string;
    __v?: number;
}
