import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
} from "../lib/api";

export const useProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: getAllProducts });

export const useCreateProduct = () =>
  useMutation({ mutationFn: createProduct });

export const usedProduct = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    //double bang opperator
  });

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    },
  });
};

export const useMyProducts = () => {
  return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts });
};
