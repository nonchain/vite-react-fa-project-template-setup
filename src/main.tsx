import { createRoot } from "react-dom/client";
import "./index.css";
import Providers from "./providers.tsx";
import router from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <Providers router={router} />
);
