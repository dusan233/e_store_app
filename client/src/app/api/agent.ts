import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5063/api/";

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const catalog = {
  list: () => request.get("products"),
  details: (id: number) => request.get(`products/${id}`),
};

const testErrors = {
  get400Error: () => request.get("buggy/bad-request"),
  get401Unauthorized: () => request.get("buggy/unauthorized"),
  get404Error: () => request.get("buggy/not-found"),
  get500Error: () => request.get("buggy/server-error"),
  getValidationError: () => request.get("buggy/validation-error"),
};

const api = {
  catalog,
  testErrors,
};

export default api;
