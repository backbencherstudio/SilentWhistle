import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectOption<T extends string> = {
  label: string;
  value: T;
};

interface AppSelectProps<T extends string> {
  value?: T;
  placeholder?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export function AppSelect<T extends string>({
  value,
  placeholder = "Select an item",
  options,
  onChange,
  className,
}: AppSelectProps<T>) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger
        className={
          className ??
          "h-10 min-w-36 bg-neutral-900 border border-zinc-800 rounded-lg text-white text-xs focus:ring-0"
        }
      >
        <SelectValue>
          {options.find((o) => o.value === value)?.label ?? placeholder}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="bg-neutral-900 border border-zinc-800 text-white">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
