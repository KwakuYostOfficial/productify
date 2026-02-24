import { useNavigate, useParams, Link } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import { usedProduct, useUpdateProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import EditProductForm from "../components/EditProductForm";

function EditProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const updateProduct = useUpdateProduct();
  const { data: product, isLoading } = usedProduct(id);

  if (isLoading) return <LoadingSpinner />;

  if (!product && !updateProduct.isPending) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Product not found</h2>
          <Link to="/" className="btn btn-primary btn-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (product && product.userId !== userId) {
    return <div className="text-center py-20">Access Denied</div>;
  }

  return (
    <EditProductForm
      product={product}
      isPending={updateProduct.isPending}
      isError={updateProduct.isError}
      onSubmit={(formData: any) => {
        updateProduct.mutate(
          { id, ...formData },
          {
            onSuccess: () => navigate(`/product/${id}`),
          },
        );
      }}
    />
  );
}

export default EditProductPage;
