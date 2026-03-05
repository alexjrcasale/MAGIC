import test from 'node:test';
import assert from 'node:assert/strict';
import { can } from '../src/lib/rbac.mjs';

test('ADMIN can approve finance', () => {
  assert.equal(can('ADMIN', 'finance', 'approve'), true);
});

test('LEITURA cannot update leads', () => {
  assert.equal(can('LEITURA', 'leads', 'update'), false);
});
