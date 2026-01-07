import DashboardLayout from "@/components/common/DashboardLayout";
import Notification from "@/components/dashboard/Notification";

export default function NotificationPage() {
  return (
    <DashboardLayout>
      <div className="p-6 w-full">
        <Notification />
      </div>
    </DashboardLayout>
  );
}
