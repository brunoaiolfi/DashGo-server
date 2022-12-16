import { Product } from "@prisma/client";

export type ItemPurchaseIncludeProduct = {
    id: number;
    qntd: number;
    dtCreated: Date;
    productId: number;
    product: Product;
    userId: number;
    purchasesId: number;
};

export type CreateItemPurchase = {
    qntd: number;
    productId: number;
    // dtCreated: Date;
    // userId: number | null;
    // purchasesId: number;
  };
  