import { PaginatedResponse } from "./common";

/**
 * API error response
 */
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

/**
 * API success response
 */
export interface ApiSuccess<T> {
  data: T;
  message?: string;
}

/**
 * API response (either success or error)
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * API paginated response
 */
export type ApiPaginatedResponse<T> =
  | ApiSuccess<PaginatedResponse<T>>
  | ApiError;

/**
 * API request options
 */
export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: "json" | "text" | "blob" | "arraybuffer";
}

/**
 * API client interface
 */
export interface ApiClient {
  get<T>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>>;
  post<T>(
    url: string,
    data?: any,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>>;
  put<T>(
    url: string,
    data?: any,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>>;
  patch<T>(
    url: string,
    data?: any,
    options?: ApiRequestOptions,
  ): Promise<ApiResponse<T>>;
  delete<T>(url: string, options?: ApiRequestOptions): Promise<ApiResponse<T>>;
}

/**
 * API cache options
 */
export interface ApiCacheOptions {
  enabled: boolean;
  ttl: number; // Time to live in milliseconds
  key?: string; // Custom cache key
}

/**
 * API request with cache options
 */
export interface ApiRequestWithCache extends ApiRequestOptions {
  cache?: ApiCacheOptions;
}

/**
 * API error codes
 */
export enum ApiErrorCode {
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT = "TIMEOUT",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}
