import { apiClient } from "@/lib/api/client";
import type {
  ApiSuccess,
  ApiMeta,
  BusinessUnit,
  CatalogOverview,
  Product,
} from "@/lib/types/api";

export async function getOverview(): Promise<CatalogOverview> {
  const res =
    await apiClient.get<ApiSuccess<CatalogOverview>>("/catalog/overview");
  return res.data.data;
}

export async function getBusinessUnits(): Promise<BusinessUnit[]> {
  const res = await apiClient.get<ApiSuccess<BusinessUnit[]>>(
    "/catalog/business-units",
  );
  return res.data.data;
}

export interface ProductQuery {
  q?: string;
  unit_usaha_id?: number;
  category?: string;
  page?: number;
  per_page?: number;
}

export interface ProductList {
  products: Product[];
  meta?: ApiMeta;
}

export async function getProducts(
  params: ProductQuery = {},
): Promise<ProductList> {
  const res = await apiClient.get<ApiSuccess<Product[]>>("/catalog/products", {
    params,
  });
  return { products: res.data.data, meta: res.data.meta };
}

export async function getProduct(id: number): Promise<Product> {
  const res = await apiClient.get<ApiSuccess<Product>>(
    `/catalog/products/${id}`,
  );
  return res.data.data;
}
