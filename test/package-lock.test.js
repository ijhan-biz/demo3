import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('npm lockfile package tarballs use the public npm registry', async () => {
  const lockfile = JSON.parse(await readFile(new URL('../package-lock.json', import.meta.url), 'utf8'));
  const resolvedPackages = Object.entries(lockfile.packages)
    .filter(([, details]) => details.resolved);

  assert.ok(resolvedPackages.length > 0);
  for (const [name, details] of resolvedPackages) {
    assert.equal(new URL(details.resolved).hostname, 'registry.npmjs.org', name);
  }
});
