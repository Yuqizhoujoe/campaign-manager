import { Router } from "express";

// types
import { Product } from "../types/data";
import {
  CampaignServiceRequest,
  CampaignServiceResponse,
  ErrorData,
} from "../types/network";

// services
import { getProductById } from "../services/productService";

const router = Router();

const getProductController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<Product | ErrorData>
) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }

    return res.status(200).json(product);
  } catch (error: any) {
    console.error("PRODUCT_CONTROLLER_GET_PRODUCT_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const createProductController = async (
  req: CampaignServiceRequest<Partial<Product>>,
  res: CampaignServiceResponse<Product>
) => {
  const { title, desc, type } = req.body;
  try {
  } catch (error: any) {}
};
