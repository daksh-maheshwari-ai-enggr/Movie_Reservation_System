const API = import.meta.env.VITE_API_URL || "/api";

export const call = async (path, { token, ...opts } = {}) => {
  const response = await fetch(API + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...opts,
  });

  const data = await (response.headers.get("content-type")?.includes("json")
    ? response.json()
    : null);

  if (!response.ok) throw Error(data?.message || "Request failed");
  return data;
};
