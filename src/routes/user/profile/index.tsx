import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes.constant";
import { Link } from "react-router-dom";

function UserProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-svh">
      <p>صفحه پروفایل</p>
      <Button>
        <Link to={ROUTES.main.root}>بازگشت به خانه</Link>
      </Button>
    </div>
  );
}

export default UserProfilePage;
