import { Link, Navigate, Outlet } from "react-router";
import { Button } from "./components/ui/button";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/common/Header";
import { cn } from "./lib/utils";

function App() {
  const isAuthenticated = false;
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="h-screen flex bg-background">
      <Sidebar />
      <div
        className={cn(
          "flex flex-col flex-1 max-w-[--breakpoint-2xl] hoverEffect ml-64"
        )}
      >
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
