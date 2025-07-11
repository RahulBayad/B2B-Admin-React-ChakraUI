import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";

interface ApiRequestParams<T = any> {
  url: string;
  method?: "get" | "post" | "put" | "delete" | "patch";
  data?: any;
  config?: AxiosRequestConfig;
  successMessage?: string;
  errorMessage?: string;
}

interface ApiErrorResponse {
  status: number;
  data: null;
  message: string;
}

const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL
})

export const apiRequest = async <T = any>({
  url,
  method = "get",
  data = null,
  config = {},
  errorMessage = "Something went wrong",
}: ApiRequestParams): Promise<T | ApiErrorResponse> => {
  try {
    const response: AxiosResponse<T> = await api.request({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;

    return {
      status: err.response?.status || 500,
      data: null,
      message:
        (err.response?.data as any)?.message || err.message || errorMessage,
    };
  }
};