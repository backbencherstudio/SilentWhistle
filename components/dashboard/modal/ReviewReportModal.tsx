"use client";

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReviewReportModal = ({ open, onOpenChange }: ModalProps) => {
  const reportData = {
    reportId: "1",
    status: "Pending",
    username: "@sarah_jones",
    email: "sarahjones@gmail.com",
    joinDate: "05/12/2024",
    location: "New York, USA",
    role: "User",
    totalPosts: 226,
    reportsAgainst: 2,
    accountStatus: "Active",
    reportDate: "05/12/2024",
  };

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
          <div className="mx-6 rounded-lg bg-[#2A0C0C] px-4 py-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-red-500">
              Report ID: {reportData.reportId}
            </p>
            <p className="text-sm font-semibold text-red-500">
              {reportData.status}
            </p>
          </div>

          {/* Report Info Section */}
          <div className="relative mx-6 mt-4 rounded-xl bg-[#111315] px-4 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoRow label="Username:" value={reportData.username} />
                <InfoRow label="Email:" value={reportData.email} />
                <InfoRow label="Join Date:" value={reportData.joinDate} />
                <InfoRow label="Status:" value={reportData.accountStatus} />
              </div>

              <div className="space-y-4">
                <InfoRow label="Location:" value={reportData.location} />
                <InfoRow label="Role:" value={reportData.role} />
                <InfoRow
                  label="Total Posts:"
                  value={String(reportData.totalPosts)}
                />
                <InfoRow
                  label="Reports Against:"
                  value={String(reportData.reportsAgainst)}
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
              Report Date: {reportData.reportDate}
            </p>
          </div>

          {/* Reported User Info Section */}
          <div className="relative mx-6 mt-3 rounded-xl bg-[#111315] px-4 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoRow label="Username:" value={reportData.username} />
                <InfoRow label="Email:" value={reportData.email} />
                <InfoRow label="Join Date:" value={reportData.joinDate} />
                <InfoRow label="Status:" value={reportData.accountStatus} />
              </div>

              <div className="space-y-4">
                <InfoRow label="Location:" value={reportData.location} />
                <InfoRow label="Role:" value={reportData.role} />
                <InfoRow
                  label="Total Posts:"
                  value={String(reportData.totalPosts)}
                />
                <InfoRow
                  label="Reports Against:"
                  value={String(reportData.reportsAgainst)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mx-6 mt-5 mb-6 grid grid-cols-2 gap-4">
          <Button className="h-11 rounded-xl bg-[#16351F] hover:bg-[#16351F] text-green-500 font-semibold">
            Warn User
          </Button>
          <Button className="h-11 rounded-xl bg-[#3B0D0D] hover:bg-[#3B0D0D] text-red-500 font-semibold">
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
