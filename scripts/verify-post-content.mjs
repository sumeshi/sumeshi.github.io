import assert from 'node:assert/strict';
import { parsePostContentForBuild } from '../src/lib/post-content-build.ts';

const blocks = parsePostContentForBuild([
  '<p>Before</p>',
  '<pre><code class="language-mermaid">graph TD\n  A[&quot;A &amp; B&quot;] --&gt; B\n</code></pre>',
  '<pre><code class="language-javascript">const value = &quot;&lt;script&gt;&quot;;</code></pre>',
  '<pre><code class="language-mermaid">sequenceDiagram\n  Alice-&gt;&gt;Bob: Hello</code></pre>',
  '<p>After<script>alert(1)</script></p>',
].join(''));

assert.deepEqual(blocks.map(({ type }) => type), ['text', 'mermaid', 'code', 'mermaid', 'text']);
assert.equal(blocks[1].content, 'graph TD\n  A["A & B"] --> B');
assert.match(blocks[2].content, /hljs-keyword/);
assert.ok(!blocks[2].content.includes('<script>'));
assert.equal(blocks[3].content, 'sequenceDiagram\n  Alice->>Bob: Hello');
assert.equal(blocks[4].content, '<p>After</p>');
assert.deepEqual(parsePostContentForBuild('<pre><code> \n </code></pre>'), []);

console.log('Verified post code blocks, Mermaid sources, and sanitization.');
