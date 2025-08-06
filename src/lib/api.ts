import { Product, Category } from "@/types/types";
const API_PATH = "https://dummyjson.com/";

export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_PATH}products`);

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
        const res = await fetch(`${API_PATH}products/categories`);

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
        const res = await fetch(`${API_PATH}products/category/${id}`);

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
        const res = await fetch(`${API_PATH}products/${id}`);

        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching product:", err);
        return null;
    }
}