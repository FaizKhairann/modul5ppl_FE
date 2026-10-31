import axios, { AxiosError, AxiosInstance } from "axios";
import type { ApiError } from "@/lib/types/api";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  // Gagal cepat saat dev kalau env belum diset, daripada request ke undefined.
  throw new Error("NEXT_PUBLIC_API_BASE_URL belum diset di .env");
}

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/** Pesan galat yang aman ditampilkan ke user. BE mengirim error.message sama persis dgn teks AC. */
export function getApiErrorMessage(err: unknown): string {
  const axiosErr = err as AxiosError<ApiError>;
  return (
    axiosErr.response?.data?.error?.message ??
    "Terjadi kesalahan. Coba lagi beberapa saat."
  );
}

/** Error per-field untuk form (galat validasi 422). */
export function getApiErrorFields(
  err: unknown,
): Record<string, string> | undefined {
  const axiosErr = err as AxiosError<ApiError>;
  return axiosErr.response?.data?.error?.fields ?? undefined;
}
