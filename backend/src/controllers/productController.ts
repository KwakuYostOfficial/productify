import type { Request, Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

//Get all the products
export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).json({ error: "Failed to get products" });
  }
}

//Get products by current user
export async function getMyProducts(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const products = await queries.getProductsByUserId(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Failed to get user products" });
  }
}

//Get a single product by Id (public)
export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id as string);

    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error getting products", error);
    res.status(500).json({ error: "Failed to get product" });
  }
}

//Create product (PROTECTED)
export async function createProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Title, description, and imageUrl are required" });
    }

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({ error: "Failed to create products" });
  }
}

//Update a product (PROTECTED - owner only)
export async function updateProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    //Check if product exist and belongs to user
    const existingProduct = await queries.getProductById(id as string);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(403).json({ error: "You can only update your own products" });
      return;
    }

    const product = await queries.updateProduct(id as string, {
      title,
      description,
      imageUrl,
    });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
}

//Delete Product (PROTECTED - Owner only)
export async function deleteProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    //Checks if product exists and belongs to user
    const existingProduct = await queries.getProductById(id as string);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    if (existingProduct.userId !== userId) {
      res.status(401).json({ error: "You can only delete your own product" });
      return;
    }

    await queries.deleteProduct(id as string);
    res.status(200).json({ message: "Product deleted succesful" });
  } catch (error) {
    console.error("Error deleting the product : ", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
}
