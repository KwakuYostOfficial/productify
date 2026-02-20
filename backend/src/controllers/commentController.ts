import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

import { Request, Response } from "express";

//Create a comment (PROTECTED)
export async function createComment(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(400).json({ error: "Unauthorized" });

    const { productId } = req.params as { productId: string };
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ error: "Comment content is required" });

    //Verify product exist
    const product = await queries.getProductById(productId);
    if (!product) return res.status(400).json({ error: "Product not found" });

    const comment = await queries.createComment({
      content,
      userId,
      productId,
    });

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error creating comment: ", error);
    res.status(500).json({ error: "Failed to add comment to product" });
  }
}

//Delete a comment (PROTECTED - Owner Only)
export async function deleteComment(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(400).json({ error: "Unauthorized" });

    const { commentId } = req.params as { commentId: string };
    const existingComment = queries.getCommentById(commentId);

    //This checks if the comment exist
    if (!existingComment)
      res.status(400).json({ error: "The comment does not exist" });

    await queries.deleteComment(commentId);
    res.status(200).json({ message: "Comment succesfully deleted" });
  } catch (error) {
    console.error("Error deleting the comment", error);
    res.status(500).json("Failed to delete the comment");
  }
}
