import App from '@/App';
import { ROUTES } from '@/lib/constants/routes.constant';
import { createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: ROUTES.main.root,
    element: <App />,
  },

]);
export default router;