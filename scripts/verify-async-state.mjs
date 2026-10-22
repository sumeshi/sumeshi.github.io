import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileModule } from 'svelte/compiler';
import ts from 'typescript';

// Compile the rune module for Node so these checks exercise its request lifecycle
// without a DOM or a fake implementation of $state.
const source = readFileSync(new URL('../src/lib/load-state.svelte.ts', import.meta.url), 'utf8');
const javascript = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
}).outputText;
const compiled = compileModule(javascript, { generate: 'server' }).js.code.replace(
  "'svelte/internal/server'",
  JSON.stringify(import.meta.resolve('svelte/internal/server')),
);
const { createAsyncDataState } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

function deferred() {
  return Promise.withResolvers();
}

const state = createAsyncDataState('initial');
const oldRequest = deferred();
const newRequest = deferred();
const oldLoad = state.load(() => oldRequest.promise, { errorMessage: 'old error' });
const newLoad = state.load(() => newRequest.promise, { errorMessage: 'new error' });
oldRequest.reject(new DOMException('Aborted', 'AbortError'));
await oldLoad;
assert.equal(state.state.loading, true, 'aborting an older request must not finish the newer request');
newRequest.resolve('new');
await newLoad;
assert.equal(state.state.value, 'new');
assert.equal(state.state.loading, false);

const parsing = deferred();
const startedParsing = deferred();
let content = '';
const first = state.load(async () => 'first', {
  errorMessage: 'first error',
  onSuccess: async (_, isCurrent) => {
    startedParsing.resolve();
    await parsing.promise;
    if (isCurrent()) content = 'first';
  },
});
await startedParsing.promise;
await state.load(async () => 'second', {
  errorMessage: 'second error',
  onSuccess: (_, isCurrent) => { if (isCurrent()) content = 'second'; },
});
parsing.resolve();
await first;
assert.equal(content, 'second', 'late parsing must not replace the latest article');
assert.equal(state.state.value, 'second');

const pending = deferred();
const resetting = state.load(() => pending.promise, { errorMessage: 'obsolete error' });
state.reset('replacement');
pending.reject(new Error('late failure'));
await resetting;
assert.equal(state.state.value, 'replacement');
assert.equal(state.state.errorMessage, '');
assert.equal(state.state.loading, true);

const controller = new AbortController();
const uncooperativeRequest = deferred();
const aborted = state.load(() => uncooperativeRequest.promise, { errorMessage: 'aborted' }, controller.signal);
controller.abort();
uncooperativeRequest.resolve('discarded');
await aborted;
assert.equal(state.state.value, 'replacement', 'an aborted response must not commit even if the request resolves');

console.log('Verified overlapping requests, aborted responses, reset invalidation, and late article parsing.');
