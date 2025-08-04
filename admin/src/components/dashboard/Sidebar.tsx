import { cn } from "@/lib/utils";
import useAuthStore from "@/store/useAuthStore";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  User,
  Users,
  Package,
  FileText,
  Layers,
  ShoppingBag,
  Tag,
  Bookmark,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type NavItemProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
  open: boolean;
  end?: boolean;
};

const navigationItems = [
  {
    to: "/dashboard",
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    end: true,
  },
  {
    to: "/dashboard/account",
    icon: <User size={20} />,
    label: "Account",
  },
  {
    to: "/dashboard/users",
    icon: <Users size={20} />,
    label: "Users",
  },
  {
    to: "/dashboard/orders",
    icon: <Package size={20} />,
    label: "Orders",
  },
  {
    to: "/dashboard/invoices",
    icon: <FileText size={20} />,
    label: "Invoices",
  },
  {
    to: "/dashboard/banners",
    icon: <Layers size={20} />,
    label: "Banners",
  },
  {
    to: "/dashboard/products",
    icon: <ShoppingBag size={20} />,
    label: "Products",
  },
  {
    to: "/dashboard/categories",
    icon: <Tag size={20} />,
    label: "Categoreis",
  },
  {
    to: "/dashboard/brands",
    icon: <Bookmark size={20} />,
    label: "Brands",
  },
];

function Sidebar({ open, setOpen }: Props) {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  console.log(location.pathname);

  return (
    <motion.aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col border-r border-slate-800/50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white hoverEffect shadow-2xl hoverEffect",
        open ? "w-64" : "w-20"
      )}
      initial={{ width: open ? 256 : 80 }}
      animate={{ width: open ? 256 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between p-4 h-16 bg-gradient-to-r from-[#29beb3] via-slate-700 to-[#a96bde] border-b border-slate-600">
        <motion.div
          initial={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
          animate={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex items-center overflow-hidden",
            open ? "w-auto opacity-100" : "opacity-0"
          )}
        >
          <h2 className="font-bold text-xl text-white">BabyShop Admin</h2>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setOpen(!open)}
            className="rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white hoverEffect hover:border-white/30 backdrop-blur-sm"
            size={"icon"}
            variant={"ghost"}
          >
            <motion.div
              animate={{ rotate: open ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <ChevronLeft /> : <ChevronRight className="rotate-180" />}
            </motion.div>
          </Button>
        </motion.div>
      </div>

      {/* middle options */}
      <div className="flex flex-col gap-1 flex-1 p-3 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
        {navigationItems?.map((item, index) => (
          <NavItem
            key={index}
            to={item.to}
            label={item.label}
            icon={item.icon}
            end={item.end}
            open={open}
          />
        ))}
      </div>

      <div className="p-4 border-t border-slate-600/50 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={cn(
            "flex items-center gap-3 mb-4",
            open ? "justify-start" : "justify-center"
          )}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#29beb3] to-[#a96bde] flex items-center justify-center text-white font-semibold overflow-hidden shadow-lg ring-2 ring-white/20">
            {user?.avatar ? (
              <img src={user?.avatar} className="h-full w-full object-cover" />
            ) : (
              user?.name?.charAt(0).toUpperCase()
            )}
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm font-medium text-white truncate ">
                  {user?.name}
                </p>
                <p className="text-xs text-[#29beb3] capitalize">
                  {user?.role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          className=""
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => logout()}
            variant={"outline"}
            size={open ? "default" : "icon"}
            className="w-full border-red-500/30 hover:bg-red-600/20 hover:border-red-400/50 text-red-400 transition-colors bg-red-600/10 backdrop-blur-sm overflow-hidden hover:text-white hoverEffect"
          >
            <LogOut className={cn("mr-2", !open && "mr-0")} />{" "}
            {open ? "logout" : ""}
          </Button>
        </motion.div>
      </div>
    </motion.aside>
  );
}

function NavItem({ to, icon, label, open, end }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={cn(
        "flex items-center p-3 rounded-xl text-sm font-medium hoverEffect gap-3 overflow-hidden text-white/80 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 hover:text-white hover:shadow-lg hover:backdrop-blur-sm ",
        location.pathname === to
          ? "bg-gradient-to-r from-[#29beb3]/20 to-[#a96bde]/20 text-white shadow-lg shadow-[#29beb3]/20 scale-105 ring-1 ring-[#29beb3]/30 border border-white/10 backdrop-blur-sm"
          : "text-slate-300 hover:scale-102"
      )}
    >
      <span>{icon}</span>
      {open && <span>{label}</span>}
    </NavLink>
  );
}

export default Sidebar;
