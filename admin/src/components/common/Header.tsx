import useAuthStore from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

function Header() {
  const { user } = useAuthStore();
  return (
    <header className="sticky top-0 flex items-center h-16 bg-background border border-b  px-4">
      <div className="flex items-center gap-4 ml-auto">
        <Button variant={"ghost"} size={"icon"} className="rounded-full border">
          <Bell size={18} />
        </Button>
        <div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
        </div>
        <div className="h-9 w-9 rounded-full bg-primary/10 flex justify-center items-center overflow-hidden border">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="user image"
              className="h-full w-full object-cover"
            />
          ) : (
            user?.name?.charAt(0).toUpperCase()
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
