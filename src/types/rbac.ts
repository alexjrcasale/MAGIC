export type RoleCode = "ADMIN" | "GERENTE" | "AGENTE" | "FINANCEIRO" | "OPERACOES" | "LEITURA";

export type Resource =
  | "dashboard"
  | "users"
  | "leads"
  | "proposals"
  | "bookings"
  | "finance"
  | "settings";

export type Action = "view" | "create" | "update" | "delete" | "approve" | "export";

export type Permission = `${Resource}:${Action}`;
