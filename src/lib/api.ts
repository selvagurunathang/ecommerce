import { Product, Category } from "@/types/types";

export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const res = await fetch("https://dummyjson.com/products");

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function fetchAllCategories(): Promise<Category[]> {
    try {
        const res = await fetch("https://dummyjson.com/products/categories");

        if (!res.ok) {
            throw new Error("Failed to fetch categories");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function fetchProducts(id: string): Promise<Product[]> {
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${id}`);

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function fetchProductById(id: string) {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching product:", err);
        return null;
    }
}