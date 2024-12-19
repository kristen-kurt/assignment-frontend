import axios, { AxiosHeaders } from "axios";

export const baseURL = "http://localhost:3000/";

const client = axios.create({
  baseURL,
});

const get = async <T,>(endpoint: string, headers?: AxiosHeaders) => {
  const { data } = await client.get(endpoint, {
    headers,
  });
  return data as {
    message: string;
    result: T;
    success: boolean;
  };
};

const put = async (endpoint: string, body: unknown, headers?: AxiosHeaders) => {
  const { data } = await client.put(endpoint, body, {
    headers,
  });
  return data;
};

const post = async (
  endpoint: string,
  body: unknown,
  headers?: AxiosHeaders
) => {
  const { data } = await client.post(endpoint, body, {
    headers,
  });
  return data;
};

const del = async <T,>(endpoint: string, headers?: AxiosHeaders) => {
  const { data } = await client.delete(endpoint, {
    headers,
  });
  return data as { error: null; message: string; result: T };
};

export { get, post, put, del };
