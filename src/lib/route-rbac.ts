import type { Resource } from "@/types/rbac";

export const routeToResource: Array<{ prefix: string; resource: Resource }> = [
  { prefix: "/dashboard", resource: "dashboard" },
  { prefix: "/leads", resource: "leads" },
  { prefix: "/proposals", resource: "proposals" },
  { prefix: "/bookings", resource: "bookings" },
  { prefix: "/finance", resource: "finance" },
  { prefix: "/settings", resource: "settings" }
];
