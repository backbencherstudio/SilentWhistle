import { Card, CardContent } from "../ui/card";

const FinanceAndPaymentStats = () => {
  const statsData = [
    {
      title: "Total Payment",
      value: "44.97",
      badge: {
        text: "Paid User: 15",
        bgColor: "bg-[#0a160d]",
        textColor: "text-[#38e07b]",
      },
    },
    {
      title: "Debit / Credit Card",
      value: "14.99",
      badge: {
        text: "5 User",
        bgColor: "bg-[#14151c]",
        textColor: "text-[#7485ff]",
      },
    },
    {
      title: "Internet Banking",
      value: "14.99",
      badge: {
        text: "5 User",
        bgColor: "bg-[#1a1600]",
        textColor: "text-[#8ac45c]",
      },
    },
    {
      title: "USSD",
      value: "14.99",
      badge: {
        text: "5 User",
        bgColor: "bg-[#00141A]",
        textColor: "text-[#00C4FF]",
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
