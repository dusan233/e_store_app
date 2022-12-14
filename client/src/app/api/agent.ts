import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "http://localhost:5063/api/";
// axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;

  if (token) config.headers!.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );

      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse<{
      title: string;
      errors: { [key: string]: string } | undefined;
    }>;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        history.push("/login");
        toast.error(data.title);
        break;
      case 500:
        history.push("/server-error", { error: data });
        break;
    }
    console.log(error, "caught by interceptor");
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const catalog = {
  list: (params: URLSearchParams) => request.get("products", params),
  details: (id: number) => request.get(`products/${id}`),
  fetchFilters: () => request.get("products/filters"),
};

const cart = {
  get: () => request.get("cart"),
  addItem: (productId: number, quantity: number = 1) =>
    request.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity: number = 1) =>
    request.delete(`cart?productId=${productId}&quantity=${quantity}`),
};

const account = {
  login: (values: any) => request.post("account/login", values),
  register: (values: any) => request.post("account/register", values),
  currentUser: () => request.get("account/currentUser"),
  fetchAddress: () => request.get("account/savedAddress"),
};

const orders = {
  list: () => request.get("orders"),
  fetch: (id: number) => request.get(`orders/${id}`),
  create: (values: any) => request.post("orders", values),
};

const payments = {
  createPaymentIntent: () => request.post("payments", {}),
};

const testErrors = {
  get400Error: () =>
    request.get("buggy/bad-request").catch((err) => console.log(err)),
  get401Error: () =>
    request.get("buggy/unauthorized").catch((err) => console.log(err)),
  get404Error: () =>
    request.get("buggy/not-found").catch((err) => console.log(err)),
  get500Error: () =>
    request.get("buggy/server-error").catch((err) => console.log(err)),
  getValidationError: () => request.get("buggy/validation-error"),
};

const api = {
  catalog,
  testErrors,
  cart,
  orders,
  account,
  payments,
};

export default api;
