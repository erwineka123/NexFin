const shortDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});

const longDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

export function formatShortDate(input: string) {
  return shortDateFormatter.format(new Date(input));
}

export function formatLongDate(input: string) {
  return longDateFormatter.format(new Date(input));
}

export function formatMonthLabel(input: string) {
  return new Intl.DateTimeFormat("id-ID", {
    month: "short",
    year: "2-digit"
  }).format(new Date(input));
}

export function daysUntil(input: string) {
  const today = new Date();
  const target = new Date(input);
  const diff = target.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

