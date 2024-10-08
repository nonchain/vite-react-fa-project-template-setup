import { useAuthStore } from "@/lib/store/auth/authStore";
import { PropsWithChildren } from "react";

function LoggedOut({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthStore((s) => s);

  if (!isAuthenticated) return children;

  return <div></div>;
}

export default LoggedOut;
