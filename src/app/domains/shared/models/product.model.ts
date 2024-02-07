export interface Product {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    Category;
    images:      string[];
    updatedAt: string;
    creationAt: string;
}

export interface Category {
    id:    number;
    name:  string;
    image: string;
    updatedAt: string;
    creationAt: string;
}