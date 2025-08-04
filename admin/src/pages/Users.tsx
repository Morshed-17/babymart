import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate";
import useAuthStore from "@/store/useAuthStore";
import {
  Edit,
  EyeIcon,
  PlusIcon,
  RefreshCcw,
  Trash,
  Users2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import type { UserType } from "../../type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const { checkIsAdmin } = useAuthStore();
  const isAdmin = checkIsAdmin();

  const fetchUser = async () => {
    setLoading(true);

    try {
      const response = await axiosPrivate.get("/users");
      setUsers(response?.data);
    } catch (error) {
      console.log("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "deliveryman":
        return "bg-blue-100 text-blue-800";

      case "user":
        return "bg-green-100 text-green-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">
            Users Management
          </h1>
          <p className="text-gray-600 mt-0.5">
            View and manage all system users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-blue-600 flex items-center gap-1">
            <Users2 className="w-8 h-8 " />
            <p className="text-2xl ">{users?.length}</p>
          </div>
          <Button
            variant={"ghost"}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 hoverEffect"
          >
            <RefreshCcw />
            Refresh
          </Button>
          {isAdmin && (
            <Button>
              <PlusIcon />
              Add User
            </Button>
          )}
        </div>
      </div>

      {/* Filters  */}
      {/* Users Table */}

      <div className="bg-white rounded-lg shadow-sm ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Avatar</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Created At</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length > 0 ? (
              <>
                {users?.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell>
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold overflow-hidden shadow-lg ring-2 ring-white/20">
                        {user?.avatar ? (
                          <img
                            src={user?.avatar}
                            alt="User image"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-black">
                            {user?.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{user?.name}</TableCell>
                    <TableCell className="text-gray-600">
                      {user?.email}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={cn("capitalize", getRoleColor(user.role))}
                      >
                        {user?.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          title="View User Details"
                          className="text-gray-500"
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          title="Edit User"
                          className="text-green-500"
                        >
                          <Edit />
                        </Button>

                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          title="Delete User"
                          className="text-red-500"
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <div>No users</div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Users;
