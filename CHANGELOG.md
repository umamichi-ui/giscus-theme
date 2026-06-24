# Changelog

本文件记录 [@umamichi-ui/giscus-theme](https://www.npmjs.com/package/@umamichi-ui/giscus-theme) 的版本变更。

## 0.4.0 - 2026-06-24

### Changed

- 评论输入区：圆角、hover 边框与 focus ring 对齐 `@umamichi-ui/common-css` `forms.css`（njmetro `.text-input`）；Primer `--color-canvas-inset` / `--color-canvas-subtle` 改为 `--site-bg`，输入框内不再使用灰色底。
- 主按钮、Write/Preview 选项卡、排序 segmented control 等控件圆角改为 `--radius-sm`，与 common-css 按钮一致；评论卡片等大表面仍为直角。

## 0.3.2 - 2026-06-24

### Fixed

- 深色主题：Primer canvas / 前景 / 边框变量改为引用 `--site-bg`、`--site-surface-muted` 等 common-css token（与浅色 `_umamichi-aqua-light.css` 对称），不再沿用 GitHub 硬编码 `#161b22` 等色；iframe 根 `html` / `body` 设置 `background: var(--site-bg)`，与 umamichi.moe 页面背景一致。

## 0.3.1 - 2026-06-18

### Fixed

- 非默认色板与深色主题的 entry 将 palette / `tokens-dark` 写入可 `@import` 的构建产物，避免夹在 `@import` 之间的普通规则导致后续 giscus 层被 PostCSS 丢弃（非 Aqua 主题文件此前缺少 Primer 映射与 chrome）。

## 0.3.0 - 2026-06-18

### Added

- 构建脚本读取 `@umamichi-ui/common-css` 的 `palettes.json`，为默认 Aqua 与 kyuri / satori / yukari 各生成浅色、深色共 8 个单文件主题（`light.css`、`dark.css`、`light-{id}.css`、`dark-{id}.css`）。
- 输出 `palettes.manifest.json`，供消费方枚举可用主题文件。
- 非默认色板在构建期将 `common-css` palette 中的 `:root[data-palette]` 平铺为 `:host, :root`，以便 giscus iframe 内无需 `data-palette` 属性，且能覆盖 `colors.css` 默认水色阶。

### Changed

- 深色语义 token 改为构建期读取 `common-css` 的 `tokens-dark.css`，将 `html.dark` 改写为 `:host, :root` 并去掉 `prefers-color-scheme` 块；删除 `_umamichi-tokens-*.css` 与构建脚本内的手写 token 常量。

## 0.2.9 - 2026-06-23

### Changed

- 评论排序「最早 / 最新」分段开关：背景改为 common-css 纯灰阶（浅色 `gray-200` / `gray-300`，深色 `gray-800` / `gray-700`）。

## 0.2.8 - 2026-06-23

### Changed

- 评论日期链接与「退出登录」按钮：样式对齐 umamichi.moe 正文链接。

## 0.2.7 - 2026-06-23

### Changed

- 评论区链接（评论数、「giscus」署名、评论/回复正文与预览区 Markdown）：样式对齐 umamichi.moe 正文链接（`--site-link` / `--site-link-hover`，默认无下划线、hover 下划线）。

## 0.2.6 - 2026-06-23

### Fixed

- 评论作者身份标签（如「所有者」）：去除 `rounded-xl` 圆角，改为直角矩形。

## 0.2.5 - 2026-06-23

### Changed

- 构建期内联 `@umamichi-ui/common-css` 的 `colors.css` / `tokens.css`；giscus Primer 变量与选区色改为引用 `--theme-*`、`--site-*` 等 token，不再手写 hex。

## 0.2.4 - 2026-06-23

### Added

- `::selection` 背景色与 umamichi.moe / common-css 默认 Aqua 色板对齐（浅色 `theme-100`、深色 `theme-900`）。

## 0.2.3 - 2026-06-23

### Fixed

- 评论直角：扩展 `_umamichi-chrome.css` 选择器，覆盖 tab 区、focus 父容器、评论卡片内层 `rounded-md`、折叠回复按钮等 giscus/Tailwind 仍保留圆角的节点。

## 0.2.2 - 2026-06-23

### Changed

- 主按钮（Comment / Sign in 等）：填充色与 `@umamichi-ui/common-css` `.primary-button`（`--site-button-accent-*`）对齐；去除边框与阴影相关 Primer 变量。
- 评论输入区与评论卡片：`.gsc-comment-box`、`.gsc-comment` 等使用无圆角矩形（`border-radius: 0`）。

## 0.2.1 - 2026-06-18

### Added

- 根字号与行高：镜像 umamichi.moe 正文 `--site-content-font-size`（默认 `1rem`，`min-width: 48rem` 为 `1.125rem`）及 `line-height: 1.65`；评论正文、输入框等继承 iframe 根字号。

## 0.2.0 - 2026-06-18

### Added

- PostCSS 构建：`npm run build` 将 `styles/src/` 内上游 base（`_giscus-base-*.css`）、默认 Aqua 覆盖层（`_umamichi-aqua-*.css`）与字体（`_umamichi-fonts.css`）内联合并为 `styles/themes/light.css` 与 `dark.css`（无运行时 `@import`，满足 giscus 自定义主题要求）。
- 默认 Aqua 色板：accent、主按钮、浅色画布/边框/文字、反应 hover 等与 `@umamichi-ui/common-css` 默认 `--theme-*` / 灰阶对齐；去除按钮阴影；设置与 common-css 一致的 `--font-family-sans` / `--font-family-monospace`。

### Changed

- `light.css` / `dark.css` 由纯上游 giscus 副本改为 Umamichi UI 定制主题（仍基于 giscus Primer 变量结构）。
- `@umamichi-ui/common-css` 由 `dependencies` 改为 `peerDependencies`（`>=0.12.0`）；构建时使用 devDependency。
- npm `files` 仅发布 `styles/themes/`（不再包含未构建的 `styles/src/`）。
- 更新 `README.md`、`THIRD_PARTY_NOTICES.md` 说明构建与上游归属。

## 0.1.2 - 2026-05-06

### Changed

- npm 元数据与依赖声明调整（`@umamichi-ui/common-css`）。

## 0.1.0 - 2026-05-06

### Added

- 从 [giscus 上游](https://github.com/giscus/giscus/tree/main/styles/themes) vendored `light.css` / `dark.css`。
- 包导出 `@umamichi-ui/giscus-theme/light.css`、`dark.css`，供站点通过绝对 URL 加载 giscus 主题。
