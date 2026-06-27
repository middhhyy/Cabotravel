import { createServerFn } from "@tanstack/react-start";
import { getLeads } from "../database";

export const fetchLeadsServerFn = createServerFn({ method: "GET" }).handler(async () => {
  return getLeads();
});
