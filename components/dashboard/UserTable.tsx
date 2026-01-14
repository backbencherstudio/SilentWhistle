"use client";

import { MoreVerticalIcon, User } from "lucide-react";
import { ReactElement, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserProfileModal from "./modal/UserViewModal";
import UserEditModal from "./modal/UserEditModal";
import UserDeleteModal from "./modal/UserDeleteModal";
import { useGetAllUsersQuery } from "@/redux/features/user-management/user-management.api";
import TablePagination from "../common/TablePagination";
import { IUser } from "@/redux/features/user-management/types";
import IdentityCardIcon from "../icons/IdentityCardIcon";
import Image from "next/image";

interface UserTableProps {
  status?: string;
  search?: string;
}

const headerColumns = [
  { label: "Name" },
  { label: "Email" },
  { label: "Status" },
  { label: "Account" },
  { label: "Joined Date" },
  { label: "Actions" },
];

export const UserTable = ({ status, search }: UserTableProps): ReactElement => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const queryPage = status || search ? 1 : page;

  const {
    data,
    isLoading: allUserLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllUsersQuery({
    page: queryPage,
    limit,
    status,
    q: search || undefined,
  });

  const allUsers = data?.data;
  const meta = data?.meta;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  const handlePageSizeChange = (size: number) => {
    setLimit(size);
    setPage(1);
  };

  if (isError) {
    return (
      <div className="p-6 text-red-400">
        Failed to load users.
        <button onClick={refetch} className="underline ml-2">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full items-start bg-[#101012] rounded-xl overflow-hidden">
        <header className="flex h-14 items-center w-full bg-[#1a1a1a]">
          {headerColumns.map((column, index) => (
            <div key={index} className="flex items-center flex-1 h-full px-4.5">
              <span className="font-['Inter'] font-medium text-gray-50 text-lg">
                {column.label}
              </span>
            </div>
          ))}
        </header>

        {allUserLoading ? (
          <UserTableSkeleton />
        ) : allUsers && allUsers?.length > 0 ? (
          allUsers?.map((user) => (
            <div
              key={user?.id}
              className="flex h-16 items-center w-full border-t border-solid border-[#212529]"
            >
              {/* Name */}
              <div className="flex-1 flex items-center gap-2 px-4.5">
                {user?.avatar ? (
                  <div className="relative w-9 h-9 rounded-full border border-solid border-[#e3e5e6]">
                    <Image
                      src={user?.avatar}
                      alt={user?.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <Avatar className="w-9 h-9 rounded-full border border-solid border-[#e3e5e6] bg-gray-700">
                    <AvatarFallback className="bg-gray-700 text-gray-300">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div className="flex flex-col gap-1">
                  <div className="font-['Inter'] font-medium text-white text-sm">
                    {user?.name}
                  </div>
                  <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                    {user?.username}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex-1 flex items-center px-4.5">
                <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                  {user?.email}
                </div>
              </div>

              {/* Status */}
              <div className="flex-1 flex items-center px-4.5">
                <Badge
                  className={`inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 rounded-lg border-0 ${
                    user.status === "ACTIVE" ? "bg-[#162924]" : "bg-[#2f1300]"
                  }`}
                >
                  <span
                    className={`text-base font-['Inter'] font-medium ${
                      user.status === "ACTIVE"
                        ? "text-[#38e07b]"
                        : user?.status === "WARNING"
                        ? "text-[#ff8000]"
                        : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </Badge>
              </div>

              {/* Account */}
              <div className="flex-1 flex items-center px-4.5 text-white">
                <Badge
                  className={`inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 rounded-lg border-0 ${
                    user?.subscription_status === "free"
                      ? "bg-[#162924]"
                      : "bg-[#2f1300]"
                  }`}
                >
                  <IdentityCardIcon
                    stroke={
                      user.subscription_status === "free"
                        ? "white"
                        : user.subscription_status === "PREMIUM"
                        ? "#ff8000"
                        : "#fb2c36"
                    }
                  />
                  <span
                    className={`text-base font-['Inter'] font-medium ${
                      user.subscription_status === "free"
                        ? "text-white"
                        : user?.subscription_status === "PREMIUM"
                        ? "text-[#ff8000]"
                        : "text-red-500"
                    }`}
                  >
                    {user?.subscription_status === "free"
                      ? "Free"
                      : user?.subscription_status === "PREMIUM"
                      ? "Premium"
                      : "Trailing"}
                  </span>
                </Badge>
                {/* {user?.subscription_status} */}
              </div>

              {/* Shouts/Post */}
              {/* <div className="flex-1 flex items-center px-2">
        <div className="inline-flex items-center gap-2 px-2 py-1.5 rounded-lg">
          <FileText />
          <div className="font-['Inter'] font-normal text-gray-50 text-base whitespace-nowrap">
            user.documentCount
          </div>
        </div>
      </div> */}

              {/* Joined Date */}
              <div className="flex-1 flex items-center px-4.5">
                <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                  {formatDate(user?.created_at)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex-1 flex items-center justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Button variant="ghost" size="icon" className="w-6 h-6 p-0">
                      <MoreVerticalIcon className="w-6 h-6 text-gray-50" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="min-w-40 bg-neutral-900 border border-zinc-800 rounded-lg"
                  >
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        setProfileOpen(true);
                      }}
                      className="cursor-pointer text-white focus:bg-neutral-800 focus:text-white"
                    >
                      View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        setEditOpen(true);
                      }}
                      className="cursor-pointer text-white focus:bg-neutral-800 focus:text-white"
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteOpen(true);
                      }}
                      className="cursor-pointer text-red-400 focus:bg-neutral-800 focus:text-red-400"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center">
          <TablePagination
            page={queryPage}
            totalPages={meta?.totalPages ?? 1}
            onPageChange={setPage}
            pageSize={limit}
            onPageSizeChange={handlePageSizeChange}
            showRefresh
            onRefresh={!allUserLoading ? refetch : undefined}
            isFetching={isFetching}
          />
        </div>
      )}

      {/* Modal */}
      <UserProfileModal
        open={profileOpen}
        onOpenChange={setProfileOpen}
        user={selectedUser}
      />

      <UserEditModal open={editOpen} onOpenChange={setEditOpen} />
      <UserDeleteModal open={deleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
};
export default UserTable;

const UserTableSkeleton = () => (
  <>
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        className="flex h-16 items-center w-full border-t border-[#212529] animate-pulse"
      >
        {headerColumns.map((_, idx) => (
          <div key={idx} className="flex-1 px-4.5">
            <div className="h-4 bg-neutral-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    ))}
  </>
);

const EmptyState = () => (
  <div className="py-12 text-center text-gray-400">No users found</div>
);
