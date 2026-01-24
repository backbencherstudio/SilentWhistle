import { amountFormated } from "@/lib/transactions/AmountFormated";
import { Card, CardContent } from "../ui/card";
import type { PaymentOverviewResponse } from "@/types/transactions";

type FinanceAndPaymentStatsProps = {
  analytics?: PaymentOverviewResponse;
};

const FinanceAndPaymentStats = ({ analytics }: FinanceAndPaymentStatsProps) => {
  const statsData = [
    {
      title: "Total Payment",
      value:
        amountFormated(Number(analytics?.totalPayment || 0).toString()) || 0,
      badge: {
        text: "Paid User: " + analytics?.paidUsers,
        bgColor: "bg-[#0a160d]",
        textColor: "text-[#38e07b]",
      },
    },
    {
      title: "Provider" + " - " + (analytics?.breakdown[0]?.provider || ""),
      value:
        amountFormated(
          Number(analytics?.breakdown[0]?.amount || 0).toString(),
        ) || 0,
      badge: {
        text: analytics?.breakdown[0]?.users + " " + "Users ",
        bgColor: "bg-[#14151c]",
        textColor: "text-[#7485ff]",
      },
    },
    {
      title: "Total Refunded",
      value:
        amountFormated(
          Number(analytics?.totalCancelledRefunded || 0).toString(),
        ) || 0,
      badge: {
        text: analytics?.cancelledRefundedUsers + " User",
        bgColor: "bg-[#1a1600]",
        textColor: "text-[#8ac45c]",
      },
    },
  ];
  return (
    <section className="flex w-full items-stretch gap-3">
      {statsData.map((stat, index) => (
        <Card
          key={index}
          className="flex-1 flex flex-col bg-[#101012] rounded-2xl border-0"
        >
          <CardContent className="flex flex-col items-start gap-4 px-3.5 py-4 flex-1">
            <div className="relative self-stretch -mt-px font-['Inter',Helvetica] font-normal text-gray-400 text-base tracking-[0] leading-[17.6px]">
              {stat.title}
            </div>
            <div className="relative self-stretch font-['Inter',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[38.4px]">
              ${stat.value}
            </div>
            <div
              className={`inline-flex items-center justify-center gap-2.5 px-3 py-2 relative flex-[0_0_auto] ${stat.badge.bgColor} rounded-md`}
            >
              <div
                className={`relative w-fit -mt-px font-['Inter',Helvetica] font-light ${stat.badge.textColor} text-sm tracking-[0] leading-[15.4px] whitespace-nowrap`}
              >
                {stat.badge.text}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default FinanceAndPaymentStats;
