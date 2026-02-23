import api from "./axios";

type userData = {
  email: string;
  name: string;
  imageUrl: string;
};

//USER API data synchronization
export async function syncUser(userData: userData) {
  try {
    const { data } = await api.post("/users/sync", userData);
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}

//PRODUCTS API
//Get all prodcuts
export async function getAllProducts() {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}

//Get a single product by Id
export async function getProductById(id: string) {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}

//Get a users product
export async function getMyProducts() {
  try {
    const { data } = await api.get(`/products/my`);
    return data;
  } catch (error) {
    const { data } = await api.get(`/products/my`);
    return data;
  }
}

//CREATE API
//Create a Product
export async function createProduct(productData: any) {
  try {
    const { data } = await api.post("/products", productData);
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}

//Update Product
export async function updateProduct({
  id,
  ...productData
}: {
  id: string;
  [key: string]: unknown;
}) {
  try {
    const { data } = await api.put(`/products/${id}`, productData);
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}

//Delete Product
export async function deleteProduct(id: string) {
  try {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}

//COMMENTS API
//Create comments
export async function createComment({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) {
  try {
    const { data } = await api.post(`/comments/${productId}`, { content });
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}

//Delete comment
export async function deleteComment({ commentId }: { commentId: string }) {
  try {
    const { data } = await api.delete(`/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error("Error Message: ", error);
  }
}
