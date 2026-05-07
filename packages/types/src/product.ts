import {Product, Category} from "@repo/produuct-db";
export const ProductType = Product;

export type StripeProductType = {
    id: string;
    name: string;
    price: number;
}

    export const CategoryType = Category;