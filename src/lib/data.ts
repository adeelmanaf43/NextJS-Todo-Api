import { unstable_noStore as noStore } from "next/cache";
export const getData = async () => {
  noStore();
  const res = await fetch("http:127.0.0.1:3000/api/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const results = await res.json();
  return results;
};
