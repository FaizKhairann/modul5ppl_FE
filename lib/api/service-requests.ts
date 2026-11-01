import {
  apiClient,
  getApiErrorFields,
  getApiErrorMessage,
} from "@/lib/api/client";
import type { ApiSuccess, CreateServiceRequest } from "@/lib/types/api";

export interface ServiceRequestItem {
  id: number;
  unit_usaha_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export async function createServiceRequest(payload: CreateServiceRequest) {
  try {
    const response = await apiClient.post<ApiSuccess<ServiceRequestItem>>(
      "/service-requests",
      payload,
    );

    return response.data.data;
  } catch (error) {
    throw {
      message: getApiErrorMessage(error),
      fields: getApiErrorFields(error),
    };
  }
}
