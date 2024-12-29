export const END_POINTS = {
  auth: {
    login: "/api/v1/login",
    register: "/api/v1/register",
  },
  main: {
    products: "/api/v1/products",
    productDetails: (id: string) => `/api/v1/products/${id}`,
  },
  user: {
    profile: "/api/v1/profile",
  },
};