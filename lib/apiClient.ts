// lib/apiClient.ts

import axios, { AxiosResponse } from 'axios';

/**
 * Type for API response data.
 */
type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

/**
 * Type for API error.
 */
type ApiError = {
  message: string;
  code: number;
};

/**
 * Fetch data from the API.
 * @param url - The endpoint URL.
 * @returns A promise resolving to the API response data.
 */
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.get(url);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Post data to the API.
 * @param url - The endpoint URL.
 * @param data - The data to post.
 * @returns A promise resolving to the API response data.
 */
async function postData<T>(url: string, data: any): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios.post(url, data);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Handle API errors.
 * @param error - The error object.
 * @returns An ApiResponse with error details.
 */
function handleApiError<T>(error: any): ApiResponse<T> {
  const apiError: ApiError = {
    message: error.response?.data?.message || 'An unknown error occurred',
    code: error.response?.status || 500,
  };
  return { success: false, data: null as any, error: apiError.message };
}

export { fetchData, postData, ApiResponse, ApiError };