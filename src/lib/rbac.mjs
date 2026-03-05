const rolePermissions = {
  ADMIN: [
    "dashboard:view", "users:view", "users:create", "users:update", "users:delete",
    "leads:view", "leads:create", "leads:update", "leads:delete",
    "proposals:view", "proposals:create", "proposals:update", "proposals:approve", "proposals:export",
    "bookings:view", "bookings:create", "bookings:update", "bookings:approve",
    "finance:view", "finance:create", "finance:update", "finance:approve", "finance:export",
    "settings:view", "settings:update"
  ],
  GERENTE: ["dashboard:view"],
  AGENTE: ["dashboard:view", "leads:view", "leads:create", "leads:update"],
  FINANCEIRO: ["dashboard:view", "finance:view", "finance:create", "finance:update", "finance:approve", "finance:export"],
  OPERACOES: ["dashboard:view", "bookings:view", "bookings:create", "bookings:update", "bookings:approve"],
  LEITURA: ["dashboard:view", "leads:view", "proposals:view", "bookings:view", "finance:view"]
};

export function can(role, resource, action) {
  return rolePermissions[role].includes(`${resource}:${action}`);
}
