"use client";

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetSingleReportQuery } from "@/redux/features/reports-moderation/reports-moderation.api";
import { skipToken } from "@reduxjs/toolkit/query";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string | null;
  reportType: "USER" | "SHOUT" | null;
}

const ReviewReportModal = ({
  open,
  onOpenChange,
  reportId,
  reportType,
}: ModalProps) => {
  const { data } = useGetSingleReportQuery(
    reportId && reportType ? { id: reportId, type: reportType } : skipToken
  );

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return "-";

    const date = new Date(isoString);

    const formattedDate = date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedDate;
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/40 backdrop-blur-sm" />

      <DialogContent
        showCloseButton={false}
        className="w-105 border-0 rounded-2xl bg-[#0D0F10]/95 text-white shadow-2xl p-0 overflow-hidden"
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
              data?.status === "PENDING"
                ? "bg-[#2A1F0B]"
                : data?.status === "RESOLVED"
                ? "bg-[#0F2A1C]"
                : "bg-[#2B0A0A]"
            }`}
          >
            <p
              className={`text-sm font-semibold ${
                data?.status === "PENDING"
                  ? "text-[#FACC15]"
                  : data?.status === "RESOLVED"
                  ? "text-[#22C55E]"
                  : "text-[#EF4444]"
              }`}
            >
              Report ID: {data?.reporter?.name}
            </p>
            <p
              className={`text-sm font-semibold ${
                data?.status === "PENDING"
                  ? "text-[#FACC15]"
                  : data?.status === "RESOLVED"
                  ? "text-[#22C55E]"
                  : "text-[#EF4444]"
              }`}
            >
              {data?.status}
            </p>
          </div>

          {/* Report Info Section */}
          <div className="relative mx-6 mt-4 rounded-xl bg-[#111315] px-4 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoRow
                  label="Username:"
                  value={data?.reporter?.username as string}
                />
                <InfoRow
                  label="Email:"
                  value={data?.reporter?.email as string}
                />
                <InfoRow
                  label="Join Date:"
                  value={formatDateTime(data?.reporter?.created_at) as string}
                />
                <InfoRow
                  label="Status:"
                  value={data?.reporter?.status as string}
                />
              </div>

              <div className="space-y-4">
                {/* <InfoRow label="Location:" value="{data.location}" /> */}
                <InfoRow label="Role:" value={data?.reporter?.type as string} />
                <InfoRow
                  label="Total Posts:"
                  value={String(data?.reporter?.stats?.shouts)}
                />
                <InfoRow
                  label="Reports Against:"
                  value={String(data?.reporter?.stats?.reports_received)}
                />
              </div>
            </div>
          </div>

          {/* Reported User Header */}
          <div className="mx-6 mt-4 rounded-lg bg-[#0F1A13] px-4 py-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-green-500">
              Reported User
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
                  value={data?.reported?.username as string}
                />
                <InfoRow
                  label="Email:"
                  value={data?.reported?.email as string}
                />
                <InfoRow
                  label="Join Date:"
                  value={formatDateTime(data?.reported?.created_at) as string}
                />
                <InfoRow
                  label="Status:"
                  value={data?.reported?.status as string}
                />
              </div>

              <div className="space-y-4">
                {/* <InfoRow label="Location:" value="{data.location}" /> */}
                <InfoRow label="Role:" value={data?.reported?.type as string} />
                <InfoRow
                  label="Total Posts:"
                  value={String(data?.reported?.stats?.shouts)}
                />
                <InfoRow
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
            disabled={isWarning || isBanned}
            className={`h-11 rounded-xl font-semibold ${
              isWarning
                ? "bg-[#1E2A22] text-green-400/40 cursor-not-allowed"
                : "bg-[#16351F] text-green-500 hover:bg-[#16351F]"
            }`}
          >
            Warn User
          </Button>

          <Button
            disabled={isBanned}
            className="h-11 rounded-xl bg-[#3B0D0D] hover:bg-[#3B0D0D] text-red-500 font-semibold"
          >
            Ban User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewReportModal;

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-[12px] text-white/60">{label}</p>
      <p className="text-[14px] font-medium text-white">{value}</p>
    </div>
  );
};
