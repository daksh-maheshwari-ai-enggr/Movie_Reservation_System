export const fmt = (dateString) =>
  new Date(dateString).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const money = (value) => `$${Number(value || 0).toFixed(2)}`;

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;
