import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
const dest = process.argv[3];

if (!src || !dest) {
  console.error('Usage: node jsonl-to-transcript.mjs <input.jsonl> <output.md>');
  process.exit(1);
}

mkdirSync(path.dirname(dest), { recursive: true });

const lines = readFileSync(src, 'utf8').trim().split('\n');
let out = '# @umamichi-ui/giscus-theme 0.4.0~0.5.0：Vibe Coding 对话转录\n\n';
out += '> 来源：Cursor Agent 会话 `0bb96bb2-d78c-41e4-9bda-bd157d262f58`（umamichi.moe / giscus-theme 编辑器与主题对齐）\n\n';
out += '---\n\n';

let n = 0;
for (const line of lines) {
  let row;
  try {
    row = JSON.parse(line);
  } catch {
    continue;
  }
  const role = row.role;
  const parts = row.message?.content || [];
  const texts = parts
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join('\n\n');
  if (!texts.trim()) continue;

  let body = texts
    .replace(/<user_query>\n?/g, '')
    .replace(/\n?<\/user_query>/g, '')
    .replace(/\[REDACTED\]\n?/g, '')
    .trim();
  if (!body) continue;

  n++;
  const heading = role === 'user' ? '用户' : '助手';
  out += `## ${heading} (${n})\n\n${body}\n\n---\n\n`;
}

out += '\n*转录结束。工具调用与中间步骤已省略。*\n';
writeFileSync(dest, out);
console.log(`Wrote ${n} messages, ${out.length} chars -> ${dest}`);
