
export interface Product {
    id: string;
    title: string;
    brand?: string;
    price: number;
    thumbnail: string;
    sku?: string;
    category?: string;
    availabilityStatus?: string;
    rating?: number;
}

export interface CartItem extends Product {
    quantity: number;
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

export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
    sku?: string;
}

export interface CartContextType {
    cart: CartItem[];
    totalItems: number;
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (id: string) => void;
    updateCartItemQuantity: (id: string, newQuantity: number) => void;
}

export type QuantitySelectorProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};
