import router from "@/routes/routes";

export async function logout(callback_url: string = "/") {
  router.navigate(callback_url);
}

export async function login(callback_url: string = "/") {
  router.navigate(callback_url);
}
