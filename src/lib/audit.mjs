export function toAuditLogMessage(input) {
  return JSON.stringify({ type: "audit", ...input, createdAt: new Date().toISOString() });
}
