import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Router } from "@remix-run/router";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SidebarProvider } from "./components/ui/sidebar";
import { useTailwindBreakpoint } from "./lib/hooks/useTailwindBreackpoint";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function Providers({ router }: { router: Router }) {
  const { width } = useTailwindBreakpoint();
  const SIDEBAR_WITH = width < 1544 ? "16rem" : "18rem";

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider
          defaultOpen={true}
          style={{
            //@ts-ignore
            "--sidebar-width": SIDEBAR_WITH,
            "--sidebar-width-mobile": "10rem",
          }}
        >
          <RouterProvider router={router} />
        </SidebarProvider>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </QueryClientProvider>
      <ToastContainer
        position="top-left"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Providers;
Providers.queryClient = queryClient;
