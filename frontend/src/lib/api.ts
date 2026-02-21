import api from "./axios";

type userData = {
  email: string;
  name: string;
  imageUrl: string;
};

//USER API data synchronization
export async function syncUser(userData: userData) {
  const { data } = await api.post("/users/sync", userData);
  return data;
}

//PRODUCTS API
//Get all prodcuts
export async function getAllProducts() {
  const { data } = await api.get("/products");
  return data;
}

//Get a single product by Id
export async function getProductById(id: string) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

//Get a users product
export async function getMyProducts() {
  const { data } = await api.get(`products/my`);
  return data;
}

//CREATE API
//Create a Product
export async function createProduct(productData: any) {
  const { data } = await api.post("/products", productData);
  return data;
}

//Update Product
export async function updateProduct({
  id,
  ...productData
}: {
  id: string;
  productData: string;
}) {
  const { data } = await api.put(`/products/${id}`, productData);
  return data;
}

//Delete Product
export async function deleteProduct(id: string) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
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
  const { data } = await api.post(`/comments/${productId}`, { content });
  return data;
}

//Delete comment
export async function deleteComment({ commentId }: { commentId: string }) {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
}
