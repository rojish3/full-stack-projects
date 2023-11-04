import { IProduct } from "../../types/products.types";
import * as ProductRepository from "../Repository";
export const addProduct = async (product: IProduct) => {
  try {
    return await ProductRepository.addProduct(product);
  } catch (error) {
    throw error;
  }
};

export const listProduct = async () => {
  try {
    return await ProductRepository.listProduct();
  } catch (error) {
    return error;
  }
};

export const singleProduct = async (id: any) => {
  try {
    return await ProductRepository.singleProduct(id);
  } catch (error) {
    return error;
  }
};

export const udpateProduct = async (product: IProduct) => {
  try {
    return await ProductRepository.updateProduct(product);
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (id: any) => {
  try {
    return await ProductRepository.deleteProduct(id);
  } catch (error) {
    return error;
  }
};
