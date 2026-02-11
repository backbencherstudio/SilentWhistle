"use client";

import { UserAvatar } from "@/app/dashboard/user-management/_components/UserAvatar";
import {
  useDeleteReportMutation,
  useGetAllReportsQuery,
  useGetReportAnalyticsQuery,
} from "@/redux/features/reports-moderation/reports-moderation.api";
import Link from "next/link";
import React, { useState } from "react";
import TablePagination from "../common/TablePagination";
import DeleteIcon from "../icons/DeleteIcon";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { UserTableSkeleton } from "./UserTable";
import ReviewReportModal from "./modal/ReviewReportModal";
import UserDeleteModal from "./modal/UserDeleteModal";

export const ReportsModeration = (): React.ReactElement => {
  const [contentViewModal, setContentViewModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedReportType, setSelectedReportType] = useState<
    "USER" | "SHOUT" | null
  >(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState<string | undefined>(undefined);

  const { data, isLoading } = useGetReportAnalyticsQuery();
  const {
    data: allData,
    isLoading: allReportsLoading,
    isFetching,
    refetch,
  } = useGetAllReportsQuery({ page, limit, type });

  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();

  const allReports = allData?.data;
  const meta = allData?.meta;

  const kpiCards = [
    {
      title: "Pending Reports",
      value: data?.pendingReports,
    },
    {
      title: "In Review",
      value: data?.inReview,
    },
    {
      title: "Resolved Today",
      value: data?.resolvedToday,
    },
    {
      title: "High Severity",
      value: data?.highSeverity,
    },
  ];

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return { date: "-", time: "-" };

    const dateObj = new Date(isoString);

    const date = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { date, time };
  };

  return (
    <div className="w-full">
      {/* Header Section with Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        {/* Title and Description */}
        <div className="inline-flex flex-col justify-start items-start gap-2">
          <div className="text-gray-50 text-xl font-semibold font-['Inter'] leading-8">
            Reports & Moderation
          </div>
          <div className="text-neutral-300 text-base font-['Inter'] leading-4">
            Handle content and user reports.
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
          {/* All Types Filter */}
          <Select
            value={type ?? "ALL"}
            onValueChange={(value) => {
              setPage(1);
              setType(value === "ALL" ? undefined : value);
            }}
          >
            <SelectTrigger className="h-10 min-w-36 bg-neutral-900 border border-zinc-800 rounded-lg text-white text-xs font-['Inter'] focus:ring-0">
              <SelectValue>{type ? type : "All Types"}</SelectValue>
            </SelectTrigger>

            <SelectContent className="bg-neutral-900 border border-zinc-800 text-white">
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="USER">USER</SelectItem>
              <SelectItem value="SHOUT">SHOUT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="flex w-full items-stretch gap-3 mb-6">
        {(isLoading ? Array(4).fill(null) : kpiCards).map((card, index) => (
          <Card
            key={index}
            className="flex-1 flex flex-col bg-[#101012] rounded-2xl border-0"
          >
            <CardContent className="flex flex-col items-start gap-4 px-3.5 py-4 flex-1">
              {isLoading ? (
                <>
                  {/* Title Skeleton */}
                  <Skeleton className="h-4 w-28 rounded-md bg-neutral-700" />

                  {/* Value Skeleton */}
                  <Skeleton className="h-8 w-20 rounded-md bg-neutral-600" />
                </>
              ) : (
                <>
                  <div className="font-['Inter'] font-normal text-gray-400 text-base">
                    {card.title}
                  </div>
                  <div className="font-['Inter'] font-semibold text-white text-2xl">
                    {card.value}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col w-full items-start bg-[#101012] rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="h-14 border-0 border-b border-[#212529] hover:bg-transparent">
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Report ID
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Time & Date
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Reason
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Status
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Reported User
                </TableHead>
                <TableHead className="bg-[#1a1a1a] font-medium text-gray-50 text-lg font-['Inter']">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allReportsLoading ? (
                <UserTableSkeleton cols={6} />
              ) : allReports && allReports.length > 0 ? (
                allReports?.map((row, index) => (
                  <TableRow
                    key={index}
                    className="h-16 border-t border-[#212529] hover:bg-transparent"
                    // onClick={() => {
                    // setWarningModalOpen(true);
                    // console.log("Row clicked", index);
                    // }}
                  >
                    {/* Report ID Column */}
                    <TableCell className="p-0">
                      <Link
                        href={`/dashboard/user-management/user/${row?.reporter?.id}`}
                        className="flex items-center gap-2 px-4.5"
                      >
                        <UserAvatar
                          className="size-9"
                          avatar={row?.reporter?.avatar}
                          name={row?.reporter?.name}
                        />
                        <div className="flex flex-col gap-1">
                          <div className="font-medium text-white text-sm font-['Inter']">
                            {row?.reporter?.name}
                          </div>
                          <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                            {row?.reporter?.username}
                          </div>
                        </div>
                      </Link>
                    </TableCell>

                    {/* Time & Date Column */}
                    <TableCell className="p-0">
                      {(() => {
                        const { date, time } = formatDateTime(row?.date);
                        return (
                          <div className="flex items-center gap-2">
                            <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                              {time}
                            </div>
                            <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                              {date}
                            </div>
                          </div>
                        );
                      })()}
                    </TableCell>

                    {/* Reason Column */}
                    <TableCell className="p-0">
                      <div className="px-4.5">
                        <div className="font-['Inter'] font-medium text-gray-50 text-sm">
                          {row?.reason}
                        </div>
                      </div>
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="p-0">
                      <div className="px-4.5">
                        <Badge
                          className={`px-2.5 py-1.5 rounded-lg font-normal text-base whitespace-nowrap font-['Inter'] border-none ${
                            row?.status === "PENDING"
                              ? "bg-yellow-800 text-yellow-500 hover:bg-yellow-800"
                              : row?.status === "RESOLVED"
                                ? "bg-[#162924] text-[#38e07b] hover:bg-[#162924]"
                                : row?.status === "HIGH_SEVERITY"
                                  ? "bg-[#3f0005] text-[#ff0012] hover:bg-[#3f0005]"
                                  : "bg-[#162924] text-[#38e07b] hover:bg-[#162924]"
                          }`}
                        >
                          {row?.status}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Reported User Column */}
                    <TableCell className="p-0">
                      <Link
                        href={`/dashboard/user-management/user/${row?.reportedEntity?.id}`}
                        className="flex items-center gap-2 px-4.5"
                      >
                        <UserAvatar
                          className="size-9"
                          avatar={row?.reportedEntity?.avatar}
                          name={row?.reportedEntity?.name}
                        />
                        <div className="flex flex-col gap-1">
                          <div className="font-medium text-white text-sm font-['Inter']">
                            {row?.reportedEntity?.name}
                          </div>
                          <div className="font-['Inter'] font-normal text-gray-400 text-xs">
                            {row?.reportedEntity.username}
                          </div>
                        </div>
                      </Link>
                    </TableCell>

                    {/* Actions Column */}
                    <TableCell className="p-0">
                      <div className="px-4.5 flex items-center">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReportId(row.id);
                            setSelectedReportType(row.type);
                            setContentViewModalOpen(true);
                          }}
                          className="px-4 py-2 bg-[#38e07b] text-black hover:bg-[#38e07b] hover:opacity-90 rounded-lg font-['Inter'] font-medium text-sm cursor-pointer"
                        >
                          Review
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReportId(row.id);
                            setDeleteOpen(true);
                          }}
                          className="bg-transparent hover:bg-transparent cursor-pointer"
                        >
                          <DeleteIcon stroke="#f84355" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-gray-400 text-sm font-['Inter']"
                  >
                    No reports found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center">
          <TablePagination
            page={page}
            totalPages={meta?.totalPages ?? 1}
            onPageChange={setPage}
            pageSize={limit}
            onPageSizeChange={setLimit}
            showRefresh
            onRefresh={!allReportsLoading ? refetch : undefined}
            isFetching={isFetching}
          />
        </div>
      )}

      <ReviewReportModal
        open={contentViewModal}
        onOpenChange={setContentViewModalOpen}
        reportId={selectedReportId}
        reportType={selectedReportType}
      />

      <UserDeleteModal
        desc="This can't be undone. Visit your settings to delete any memories saved during this chat."
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!selectedReportId) return;
          try {
            await deleteReport(selectedReportId).unwrap();
            setDeleteOpen(false);
            setSelectedReportId(null);
          } catch (error) {
            console.error("Failed to delete report", error);
          }
        }}
      />
    </div>
  );
};
