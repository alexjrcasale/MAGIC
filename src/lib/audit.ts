export type AuditEventInput = {
  organizationId: string;
  userId?: string;
  entity: string;
  entityId: string;
  action: string;
  beforeJson?: unknown;
  afterJson?: unknown;
};

export function toAuditLogMessage(input: AuditEventInput): string {
  return JSON.stringify({
    type: "audit",
    ...input,
    createdAt: new Date().toISOString()
  });
}
