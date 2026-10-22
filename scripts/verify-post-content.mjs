import assert from 'node:assert/strict';
import { parsePostContentForBuild } from '../src/lib/post-content-build.ts';
import {
  extractGitHubRepoLinkCard,
  extractInternalPostLinkCard,
} from '../src/lib/post-content.ts';
import { buildArticle, buildPostStructuredData } from '../src/lib/post-article.ts';

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

const structuralHtml = [
  '<blockquote><p>Quoted text</p><pre><code class="language-js">const quoted = true;</code></pre></blockquote>',
  '<ul><li><p>List text</p><pre><code class="language-js">const listed = true;</code></pre></li></ul>',
  '<hr>',
].join('');
const structuralBlocks = parsePostContentForBuild(structuralHtml);
assert.deepEqual(structuralBlocks.map(({ type }) => type), ['text']);
assert.match(structuralBlocks[0].content, /<blockquote><p>Quoted text<\/p><pre><code/);
assert.match(structuralBlocks[0].content, /<ul><li><p>List text<\/p><pre><code/);
assert.match(structuralBlocks[0].content, /<hr\s*\/?\s*>/);

assert.equal(
  extractInternalPostLinkCard('<p><a href="/posts/dfir/one">One</a> and <a href="/posts/dfir/two">Two</a></p>'),
  null,
);
assert.equal(
  extractInternalPostLinkCard('<p><a href="/posts/dfir/one">One</a> and more text</p>'),
  null,
);
assert.equal(
  extractInternalPostLinkCard('<p><a href="https://sumeshi.github.io/posts/dfir/one?q=a&amp;lang=ja#details">One</a></p>')?.path,
  '/posts/dfir/one?q=a&lang=ja#details',
);
assert.equal(
  extractGitHubRepoLinkCard('<p><a href="https://github.com/owner/one">One</a> and <a href="https://github.com/owner/two">Two</a></p>'),
  null,
);
assert.equal(
  extractGitHubRepoLinkCard('<p><a href="https://github.com/owner/one">One</a> and more text</p>'),
  null,
);

const linkTextBlocks = parsePostContentForBuild([
  '<p><a href="/posts/dfir/one">One</a> and <a href="/posts/dfir/two">Two</a></p>',
  '<p><a href="/posts/dfir/one?source=related&amp;lang=ja#details">One</a></p>',
].join(''));
assert.deepEqual(linkTextBlocks.map(({ type }) => type), ['text', 'link-card']);
assert.match(linkTextBlocks[0].content, / and /);
assert.equal(linkTextBlocks[1].content, '/posts/dfir/one?source=related&lang=ja#details');

const article = buildArticle([{
  type: 'text',
  content: '<h1>Markdown title</h1><p>Intro</p><h2>Forensics &amp; IR</h2><h2>Forensics &amp; IR</h2>',
}]);
assert.equal(article.contents[0].content.includes('<h1'), false);
assert.deepEqual(article.tableOfContents.map(({ id, label }) => ({ id, label })), [
  { id: 'forensics-ir', label: 'Forensics & IR' },
  { id: 'forensics-ir-2', label: 'Forensics & IR' },
]);

const structuredData = buildPostStructuredData({
  canonicalUrl: 'https://sumeshi.github.io/posts/dfir/example',
  categoryName: 'dfir',
  description: 'An example post.',
  language: 'en',
  post: { title: 'Example', path: 'dfir/example', description: 'An example post.', published_at: '2026-10-22', heading: 'Example' },
  title: 'Example',
  site: {
    author: 'S.Nakano',
    blogId: 'https://sumeshi.github.io/posts#blog',
    name: 'SIPDEP',
    ogImageUrl: 'https://sumeshi.github.io/img/og-card.png',
    personId: 'https://sumeshi.github.io/#person',
    url: 'https://sumeshi.github.io',
  },
});
assert.equal(structuredData['@graph'][0].headline, 'Example');
assert.equal(structuredData['@graph'][1].itemListElement[2].name, 'dfir');

console.log('Verified code blocks, structure, article metadata, link cards, URL suffix retention, and sanitization.');
