import RootSidebar from "@/pages/root/common/sidebar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <main className="flex w-svw">
      <RootSidebar />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
    </main>
  );
}

export default RootLayout;
