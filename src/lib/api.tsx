import axios, { AxiosHeaders } from "axios";

export const baseURL = "http://localhost:8000/api/";

const apiClient = axios.create({
  baseURL: baseURL,
});
function getAuthHeader() {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  return authHeader;
}

const get = async <T,>(endpoint: string, headers?: AxiosHeaders, useApiBase: boolean = true) => {

  const { data } = await apiClient.get(endpoint, {
    headers: {
      ...getAuthHeader(),  // Add the Authorization header
      ...headers,     // Merge any additional headers passed to the function
    },
    withCredentials: true,
    withXSRFToken: true
  });
  return data as {
    user: any;
    authors: never[];
    sources: never[];
    categories: never[];
    message: string;
    data: T;
    meta: {last_page:number, current_page:number};
  };
};

const put = async (endpoint: string, body: unknown, headers?: AxiosHeaders) => {
  const { data } = await apiClient.put(endpoint, body, {
    headers,
  });
  return data;
};

const post = async (
  endpoint: string,
  body: unknown,
  headers?: AxiosHeaders
) => {
  const { data } = await apiClient.post(endpoint, body, {
    headers: {
      ...getAuthHeader(),  // Add the Authorization header
      ...headers,     // Merge any additional headers passed to the function
    },
    withCredentials: true,
    withXSRFToken: true
  });
  return data;
};

const del = async <T,>(endpoint: string, headers?: AxiosHeaders) => {
  const { data } = await apiClient.delete(endpoint, {
    headers,
  });
  return data as { error: null; message: string; result: T };
};

export { get, post, put, del };
