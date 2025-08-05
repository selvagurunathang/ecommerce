
export interface Product {
    id: number;
    title: string;
    brand: string;
    price: number;
    thumbnail: string;
}

export type ProductCardProps = {
    product: Product;
};

export type ProductGridProps = {
    products: Product[];
};

export interface Category {
    slug: string;
    name: string;
    url: string;
}
