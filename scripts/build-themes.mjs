import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'styles', 'src');
const outDir = path.join(root, 'styles', 'themes');
const commonCssDistDir = path.dirname(require.resolve('@umamichi-ui/common-css/tokens.css'));

const MODES = ['light', 'dark'];

const SHARED_IMPORTS = (mode) => `@import "./_umamichi-links.css";
@import "./_giscus-base-${mode}.css";
@import "./_umamichi-aqua-${mode}.css";
@import "./_umamichi-fonts.css";
@import "./_umamichi-type.css";
@import "./_umamichi-chrome.css";`;

/** @param {string} css @param {RegExp} selector */
function stripAtRuleBlock(css, selector) {
	const match = selector.exec(css);
	if (!match) return css;

	const braceStart = css.indexOf('{', match.index);
	if (braceStart === -1) return css;

	let depth = 0;
	for (let i = braceStart; i < css.length; i++) {
		if (css[i] === '{') depth++;
		else if (css[i] === '}') {
			depth--;
			if (depth === 0) {
				return css.slice(0, match.index) + css.slice(i + 1);
			}
		}
	}

	return css;
}

/** @param {string} css */
function flattenPaletteSelectors(css) {
	return css.replace(/:root\[data-palette=(['"]?)[^'"]+\1\]/g, ':host, :root');
}

/** @param {string} css */
function adaptTokensDarkForGiscus(css) {
	let adapted = stripAtRuleBlock(css, /@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)/);
	adapted = adapted.replace(/\bhtml\.dark\b/g, ':host, :root');
	return adapted.trim();
}

/** @returns {Promise<string>} */
async function readEmbeddedTokensDarkCss() {
	const tokensDarkPath = path.join(commonCssDistDir, 'tokens-dark.css');
	const raw = await readFile(tokensDarkPath, 'utf8');
	return adaptTokensDarkForGiscus(raw);
}

/** @param {string} paletteId */
async function readFlattenedPaletteCss(paletteId) {
	const palettePath = require.resolve(`@umamichi-ui/common-css/palettes/${paletteId}.css`);
	const raw = await readFile(palettePath, 'utf8');
	return flattenPaletteSelectors(raw);
}

/** @typedef {{ id: string | null, label: string }} PaletteEntry */

/** @returns {Promise<PaletteEntry[]>} */
async function loadPalettes() {
	const manifestPath = require.resolve('@umamichi-ui/common-css/palettes.json');
	const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
	const entries = [
		{
			id: manifest.default?.id ?? null,
			label: manifest.default?.label ?? 'Aqua',
		},
	];

	for (const palette of manifest.palettes ?? []) {
		entries.push({ id: palette.id, label: palette.label });
	}

	return entries;
}

/** @param {'light' | 'dark'} mode @param {PaletteEntry} palette */
async function buildEntryCss(mode, palette) {
	const paletteBlock =
		palette.id === null ? '' : `\n${await readFlattenedPaletteCss(palette.id)}\n`;

	if (mode === 'light') {
		return `@import "@umamichi-ui/common-css/dist/colors.css";
@import "@umamichi-ui/common-css/dist/tokens.css";
${paletteBlock}${SHARED_IMPORTS(mode)}
`;
	}

	const tokensDark = await readEmbeddedTokensDarkCss();
	return `@import "@umamichi-ui/common-css/dist/colors.css";
${paletteBlock}
${tokensDark}
${SHARED_IMPORTS(mode)}
`;
}

/** @param {'light' | 'dark'} mode @param {string | null} paletteId */
function themeFileName(mode, paletteId) {
	return paletteId === null ? `${mode}.css` : `${mode}-${paletteId}.css`;
}

await mkdir(outDir, { recursive: true });

const palettes = await loadPalettes();
const manifestThemes = [];

for (const palette of palettes) {
	for (const mode of MODES) {
		const entryCss = await buildEntryCss(mode, palette);
		const entryPath = path.join(srcDir, `.build-${themeFileName(mode, palette.id)}.entry.css`);
		await writeFile(entryPath, entryCss);

		const result = await postcss([postcssImport()]).process(entryCss, { from: entryPath });
		const outFile = themeFileName(mode, palette.id);
		await writeFile(path.join(outDir, outFile), result.css);

		manifestThemes.push({
			mode,
			palette: palette.id,
			label: palette.label,
			file: outFile,
		});
	}
}

const palettesManifest = {
	defaultPalette: palettes[0]?.id ?? null,
	themes: manifestThemes,
};

await writeFile(
	path.join(outDir, 'palettes.manifest.json'),
	`${JSON.stringify(palettesManifest, null, 2)}\n`,
);

console.log(
	`Built ${manifestThemes.length} giscus theme file(s) (${palettes.length} palette(s) × ${MODES.length} mode(s)) to styles/themes/`,
);
