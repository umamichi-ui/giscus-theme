import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'styles', 'src');
const outDir = path.join(root, 'styles', 'themes');
const themes = ['light', 'dark'];

await mkdir(outDir, { recursive: true });

for (const theme of themes) {
	const entryPath = path.join(srcDir, `${theme}.entry.css`);
	const input = await readFile(entryPath, 'utf8');
	const result = await postcss([postcssImport()]).process(input, { from: entryPath });

	await writeFile(path.join(outDir, `${theme}.css`), result.css);
}

console.log(`Built ${themes.length} giscus theme file(s) to styles/themes/`);
