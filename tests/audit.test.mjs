import test from 'node:test';
import assert from 'node:assert/strict';
import { toAuditLogMessage } from '../src/lib/audit.mjs';

test('audit log output contains entity/action', () => {
  const message = toAuditLogMessage({
    organizationId: 'org_1',
    userId: 'usr_1',
    entity: 'Lead',
    entityId: 'lead_1',
    action: 'UPDATE'
  });

  assert.equal(message.includes('Lead'), true);
  assert.equal(message.includes('UPDATE'), true);
});
