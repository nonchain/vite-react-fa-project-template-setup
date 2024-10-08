export const SAMPLE_USER_ID = "1"
export const SAMPLE_PRODUCT_ID = "23"
export const SAMPLE_SERVICE_ID = "43"
export const SAMPLE_BUSINESS_ID = "11"

export const ROUTES = {
  auth: {
    login: "/login",
    register: "/register",
    otp: "/otp"
  },
  main: {
    root: "/",
  },
  profile: {
    root: `/profile/:userId`,
  },
};

export function parseRoute(routeLink: string, key: string, secondKey?: string): string {
  const placeholders = routeLink.match(/:[a-zA-Z]+/g);

  if (!placeholders) return routeLink;

  let newRoute = routeLink;

  if (placeholders[0]) {
    newRoute = newRoute.replace(placeholders[0], key);
  }

  if (placeholders[1] && secondKey) {
    newRoute = newRoute.replace(placeholders[1], secondKey);
  }

  return newRoute;
}
