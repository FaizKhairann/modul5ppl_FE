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
  message?: string;
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
  kode_unik?: string;
  nama?: string;
  category: string;
  division?: string;
  description?: string;
  profil?: string;
  status?: string;
  is_active?: boolean;
  kategori?: {
    id: number;
    nama: string;
  };
  divisi?: {
    id: number;
    nama: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface Partner {
  id: number;
  partner_id: string;
  unit_usaha_id: number;
  user_id?: number;
  nama_usaha?: string;
  name: string;
  kategori_usaha?: string;
  category: string;
  deskripsi_usaha?: string;
  description?: string;
  alamat_usaha?: string;
  address?: string;
  nomor_telepon_usaha?: string;
  phone?: string;
  email_usaha?: string;
  email?: string;
  profil_usaha?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TaxRate {
  id: string;
  name: string;
  rate: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  type: "PRODUCT" | "SERVICE" | string;
  unit: string;
  stock: number;
  price: number | string;
  tax_rate_id?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  partner_id?: string;
  tax_rates?: TaxRate;
}

export interface CatalogOverview {
  business_units: BusinessUnit[];
  products: Product[];
}

export interface CatalogFilters {
  categories: string[];
  types: string[];
  business_units: BusinessUnit[];
  price_range: {
    min: number;
    max: number;
  };
}

export interface CartItem {
  id: number;
  product_id: string;
  product_name: string;
  unit_price: number;
  qty: number;
  subtotal: number;
  is_active: boolean;
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
  service_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  title: string;
  description: string;
}
