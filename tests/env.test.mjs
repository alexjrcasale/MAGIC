import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnv } from '../src/lib/env.mjs';

test('validateEnv throws when missing vars', () => {
  assert.throws(() => validateEnv({}), /Missing required env vars/);
});

test('validateEnv passes with required vars', () => {
  assert.doesNotThrow(() => validateEnv({ DATABASE_URL: 'x', NEXTAUTH_SECRET: 'y' }));
});
