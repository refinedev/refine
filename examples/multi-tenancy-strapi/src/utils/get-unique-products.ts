import type { Product } from "@/types";

export type UniqueProduct = Product & { quantity: number };

export const getUniqueProductsWithQuantity = (products: Product[]) => {
  const uniqueProducts = products.reduce((acc, product) => {
    const existingProduct = acc.find((p) => p.id === product.id);

    if (!existingProduct) {
      return [...acc, { ...product, quantity: 1 }];
    }

    existingProduct.quantity += 1;

    return acc;
  }, [] as UniqueProduct[]);

  return uniqueProducts;
};
