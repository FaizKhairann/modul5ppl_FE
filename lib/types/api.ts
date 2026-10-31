// Bentuk amplop response BE M5 (Panduan API Bersama v1.0)

export interface ApiMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: ApiMeta;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string> | null;
  };
}

export interface BusinessUnit {
  id: number;
  name: string;
  category: string;
  division: string;
  description: string;
  is_active: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  unit_usaha_id: number;
  price: number;
  description: string;
  is_active: boolean;
}

export interface CatalogOverview {
  business_units: BusinessUnit[];
  products: Product[];
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  unit_usaha_id: number;
  price: number;
  qty: number;
  subtotal: number;
}

export interface Cart {
  cart_id: number;
  customer_id: number;
  items: CartItem[];
  badge_count: number;
  total_items: number;
  total_amount: number;
}

export interface CreateServiceRequest {
  unit_usaha_id: number;
  service_id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  title: string;
  description: string;
}
