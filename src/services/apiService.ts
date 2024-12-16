import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { isPublicEndpoint } from '@/configs/endpoints';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.api.interceptors.request.use(
      (config) => {
        if (!isPublicEndpoint(config.url || '')) {
          const token = localStorage.getItem('access_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.api.interceptors.response.use(
      (response) => {
        // Return only the data part of the response
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Generic GET method
  async get<T>(endpoint: string, params?: any): Promise<T> {
    return this.api.get(endpoint, { params });
  }

  // Generic POST method
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.api.post(endpoint, data);
  }

  // Generic PUT method
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.api.put(endpoint, data);
  }

  // Generic DELETE method
  async delete<T>(endpoint: string): Promise<T> {
    return this.api.delete(endpoint);
  }

  // Generic PATCH method
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.api.patch(endpoint, data);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export { apiService };
