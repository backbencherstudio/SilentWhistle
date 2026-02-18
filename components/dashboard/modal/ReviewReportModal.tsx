"use client";

import { Button } from "@/components/ui/button";
import { showDashboardToast } from "@/components/ui/CustomToast";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils/formatter";
import {
  useBanUserFromReportMutation,
  useGetSingleReportQuery,
  useUnBanUserMutation,
  useWarnUserFromReportMutation,
} from "@/redux/features/reports-moderation/reports-moderation.api";
import { ReportStatus } from "@/redux/features/reports-moderation/types";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import WarningModal from "./WarningModal";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string | null;
  reportType: "USER" | "SHOUT" | null;
  initialReportStatus: ReportStatus | undefined;
}

const ReviewReportModal = ({
  open,
  onOpenChange,
  reportId,
  reportType,
  initialReportStatus,
}: ModalProps) => {
  const { data, refetch, isLoading, isFetching } = useGetSingleReportQuery(
    reportId && reportType ? { id: reportId, type: reportType } : skipToken,
  );

  const reportStatus = data?.status ?? initialReportStatus;

  const formatDateOnly = (isoString?: string) => {
    if (!isoString) return "-";

    return new Date(isoString).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });
  };

  const isWarning = data?.reported?.status === "WARNING";
  const isBanned = data?.reported?.status === "BANNED";

  const [warnUser, { isLoading: warnIsLoading }] =
    useWarnUserFromReportMutation();
  const [banUser, { isLoading: banIsLoading }] = useBanUserFromReportMutation();
  const [unbanUser, { isLoading: unbanIsLoading }] = useUnBanUserMutation();

  const handleWarn = async (warnReasons: string[]) => {
    if (!data?.id) return;

    try {
      await warnUser({
        reportId: data?.id,
        type: reportType,
        reasons: warnReasons,
        status: "RESOLVED",
      }).unwrap();
      refetch();
      showDashboardToast({
        variant: "success",
        title: "User Warned",
        description: "User warned successfully!",
      });
    } catch (err) {
      showDashboardToast({
        variant: "error",
        title: "Failed to warn user",
        description: getErrorMessage(err),
      });
    }
  };

  const handleBan = async () => {
    if (!data?.id) return;

    try {
      await banUser({
        reportId: data?.id,
        type: reportType,
        reason: "Violation of community guidelines regarding hate speech.",
        status: "RESOLVED",
      }).unwrap();
      refetch();
      showDashboardToast({
        variant: "success",
        title: "User Banned",
        description: "User banned successfully!",
      });
    } catch (err) {
      showDashboardToast({
        variant: "error",
        title: "Failed to ban the user",
        description: getErrorMessage(err),
      });
    }
  };

  const handleUnBan = async () => {
    if (!data?.id || !data?.reported?.id) return;

    try {
      await unbanUser({
        userId: data.reported.id,
      }).unwrap();
      refetch();
      showDashboardToast({
        variant: "success",
        title: "User Unbanned",
        description: "User unbanned successfully!",
      });
    } catch (err) {
      showDashboardToast({
        variant: "error",
        title: "Failed to unban the user",
        description: getErrorMessage(err),
      });
    }
  };

  const [warningModalOpen, setWarningModalOpen] = useState(false);

  return (
    <>
      <WarningModal
        onSubmitDone={(reasons) => handleWarn(reasons)}
        open={warningModalOpen}
        onOpenChange={setWarningModalOpen}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogOverlay className="bg-black/40 backdrop-blur-sm" />

        <DialogContent
          showCloseButton={false}
          className="sm:max-w-4xl border-0 rounded-2xl bg-[#0D0F10]/95 text-white shadow-2xl p-0 overflow-hidden"
        >
          {/* Title */}
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-center text-lg font-semibold">Review Report</h2>
            <div className="mt-4 h-px w-full bg-white/10" />
          </div>
          <div className="overflow-y-auto max-h-160">
            {/* Top Report Header */}
            <div
              className={`mx-6 rounded-lg px-4 py-2 flex items-center justify-between ${
                reportStatus === "PENDING"
                  ? "bg-[#2A1F0B]"
                  : reportStatus === "RESOLVED"
                    ? "bg-[#0F2A1C]"
                    : "bg-[#2B0A0A]"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  reportStatus === "PENDING"
                    ? "text-[#FACC15]"
                    : reportStatus === "RESOLVED"
                      ? "text-[#22C55E]"
                      : "text-[#EF4444]"
                }`}
              >
                Report ID: {data?.reporter?.name}
              </p>
              <p
                className={`text-sm font-semibold ${
                  reportStatus === "PENDING"
                    ? "text-[#FACC15]"
                    : reportStatus === "RESOLVED"
                      ? "text-[#22C55E]"
                      : "text-[#EF4444]"
                }`}
              >
                {reportStatus}
              </p>
            </div>

            {/* Report Info Section */}
            <div className="relative mx-6 mt-4 rounded-xl bg-[#111315] px-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Username:"
                    value={data?.reporter?.username as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Email:"
                    value={data?.reporter?.email as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Join Date:"
                    value={formatDateTime(data?.reporter?.created_at) as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Status:"
                    value={data?.reporter?.status as string}
                  />
                </div>

                <div className="space-y-4">
                  {/* <InfoRow label="Location:" value="{data.location}" /> */}
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Role:"
                    value={data?.reporter?.type as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Total Posts:"
                    value={String(data?.reporter?.stats?.shouts)}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Reports Against:"
                    value={String(data?.reporter?.stats?.reports_received)}
                  />
                </div>
              </div>
            </div>

            {/* Reported User Header */}
            <div className="mx-6 mt-4 rounded-lg bg-[#0F1A13] px-4 py-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-green-500">
                Reported User: {data?.reported?.name}
              </p>
              <p className="text-sm font-semibold text-green-500">
                Report Date: {formatDateOnly(data?.created_at)}
              </p>
            </div>

            {/* Reported User Info Section */}
            <div className="relative mx-6 mt-3 rounded-xl bg-[#111315] px-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <InfoRow
                    label="Username:"
                    isLoading={isLoading || isFetching}
                    value={data?.reported?.username as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Email:"
                    value={data?.reported?.email as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Join Date:"
                    value={formatDateTime(data?.reported?.created_at) as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Status:"
                    value={data?.reported?.status as string}
                  />
                </div>

                <div className="space-y-4">
                  {/* <InfoRow label="Location:" value="{data.location}" /> */}
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Role:"
                    value={data?.reported?.type as string}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Total Posts:"
                    value={String(data?.reported?.stats?.shouts)}
                  />
                  <InfoRow
                    isLoading={isLoading || isFetching}
                    label="Reports Against:"
                    value={String(data?.reported?.stats?.reports_received)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mx-6 mt-5 mb-6 grid grid-cols-2 gap-4">
            <Button
              disabled={
                isWarning || isBanned || warnIsLoading || warningModalOpen
              }
              onClick={() => {
                setWarningModalOpen(true);
                onOpenChange(false);
              }}
              className={`h-11 rounded-xl font-semibold ${
                isWarning
                  ? "bg-[#1E2A22] text-green-400/40 cursor-not-allowed"
                  : "bg-[#16351F] text-green-500 hover:bg-[#16351F]"
              }`}
            >
              Warn User
            </Button>

            <Button
              onClick={() => {
                if (isBanned) {
                  handleUnBan();
                } else {
                  handleBan();
                }
              }}
              disabled={banIsLoading || unbanIsLoading}
              className="h-11 rounded-xl bg-[#3B0D0D] hover:bg-[#3B0D0D] text-red-500 font-semibold"
            >
              {isBanned ? "Unban User" : "Ban User"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReviewReportModal;

const InfoRow = ({
  label,
  value,
  isLoading,
}: {
  label: string;
  value: string;
  isLoading?: boolean;
}) => {
  return (
    <div>
      <p className="text-[12px] text-white/60">{label}</p>
      <p className="text-[14px] font-medium text-white">
        {isLoading ? (
          <Skeleton className="h-3 w-40 mt-2.25 rounded-xs" />
        ) : (
          value
        )}
      </p>
    </div>
  );
};
