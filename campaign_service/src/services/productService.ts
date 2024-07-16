import datastore from "../datastore";

// types
import { Product } from "../types/data";

const productKind = "Product";

export const createProduct = async (
  product: Omit<Product, "productId">
): Promise<Product> => {
  const key = datastore.key(productKind);
  const entity = {
    key,
    data: product,
  };

  await datastore.save(entity);
  return { ...product, productId: key.id! };
};

export const updateProduct = async (
  productId: string,
  update: Partial<Product>
): Promise<Product> => {
  const key = datastore.key([productKind, datastore.int(productId)]);
  const [product] = await datastore.get(key);
  if (!product) throw new Error("Product not found!");
  const updatedProduct = {
    ...product,
    ...update,
  };

  return updatedProduct;
};

export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  const key = datastore.key([productKind, datastore.int(productId)]);
  const [product] = await datastore.get(key);
  return product;
};
