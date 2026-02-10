import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function getRelativeTime(date?: dayjs.ConfigType) {
  return dayjs(date).fromNow();
}

export function formatCount(count: number, locale: string = "en") {
  if (!Number.isFinite(count)) return "0";

  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: count < 10_000 ? 1 : 0,
  }).format(count);
}

export function formatCurrencyCompact(
  amount: number,
  currency: "USD" | "EUR" | "GBP" = "USD",
  locale = "en-US",
) {
  if (!Number.isFinite(amount)) return "$0";

  const abs = Math.abs(amount);

  // Use compact only for 1K+
  if (abs < 1000) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Compact currency
  const compact = new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(amount);

  // Force currency symbol in front (social-style)
  const symbol =
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    })
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? "$";

  return `${symbol}${compact}`;
}
