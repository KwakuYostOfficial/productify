import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../lib/api";

export const useProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: getAllProducts });

export const useCreateProduct = () =>
  useMutation({ mutationFn: createProduct });
