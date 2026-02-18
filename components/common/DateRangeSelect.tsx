import { useState } from "react";
import { AppSelect, SelectOption } from "./AppSelect";

interface DateRangeSelectProps {
  placeholder?: string;
  onChange: (range: { startDate: string; endDate: string } | null) => void;
}

export type DateRangeType = "all" | "today" | "week" | "month" | "year";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const getDateRange = (range: DateRangeType) => {
  if (range === "all") return null;

  const today = new Date();
  const start = new Date(today);
  const end = new Date(today);

  switch (range) {
    case "today":
      break;
    case "week":
      start.setDate(today.getDate() - today.getDay());
      break;
    case "month":
      start.setDate(1);
      break;
    case "year":
      start.setMonth(0, 1);
      break;
  }

  return {
    startDate: formatDate(start),
    endDate: formatDate(end),
  };
};

const DATE_OPTIONS: SelectOption<DateRangeType>[] = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export function DateRangeSelect({
  placeholder = "Select date range",
  onChange,
}: DateRangeSelectProps) {
  const [value, setValue] = useState<DateRangeType>("all");

  const handleChange = (value: DateRangeType) => {
    setValue(value);
    const range = getDateRange(value);
    onChange(range);
  };

  return (
    <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto">
      <AppSelect
        value={value}
        placeholder={placeholder}
        options={DATE_OPTIONS}
        onChange={handleChange}
      />
    </div>
  );
}
