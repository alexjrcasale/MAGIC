import type { Action, Permission, Resource, RoleCode } from "@/types/rbac";

const rolePermissions: Record<RoleCode, Permission[]> = {
  ADMIN: [
    "dashboard:view", "users:view", "users:create", "users:update", "users:delete",
    "leads:view", "leads:create", "leads:update", "leads:delete",
    "proposals:view", "proposals:create", "proposals:update", "proposals:approve", "proposals:export",
    "bookings:view", "bookings:create", "bookings:update", "bookings:approve",
    "finance:view", "finance:create", "finance:update", "finance:approve", "finance:export",
    "settings:view", "settings:update"
  ],
  GERENTE: [
    "dashboard:view", "users:view", "leads:view", "leads:create", "leads:update",
    "proposals:view", "proposals:create", "proposals:update", "proposals:approve", "proposals:export",
    "bookings:view", "bookings:create", "bookings:update", "bookings:approve",
    "finance:view", "finance:export"
  ],
  AGENTE: [
    "dashboard:view", "leads:view", "leads:create", "leads:update",
    "proposals:view", "proposals:create", "proposals:update", "proposals:export",
    "bookings:view"
  ],
  FINANCEIRO: [
    "dashboard:view", "finance:view", "finance:create", "finance:update", "finance:approve", "finance:export",
    "proposals:view", "bookings:view"
  ],
  OPERACOES: [
    "dashboard:view", "bookings:view", "bookings:create", "bookings:update", "bookings:approve",
    "proposals:view", "leads:view"
  ],
  LEITURA: [
    "dashboard:view", "leads:view", "proposals:view", "bookings:view", "finance:view"
  ]
};

export function can(role: RoleCode, resource: Resource, action: Action): boolean {
  return rolePermissions[role].includes(`${resource}:${action}`);
}

export function assertCan(role: RoleCode, resource: Resource, action: Action): void {
  if (!can(role, resource, action)) {
    throw new Error(`Forbidden: role=${role} cannot ${action} ${resource}`);
  }
}
