# Changelog

本文件记录 [@umamichi-ui/giscus-theme](https://www.npmjs.com/package/@umamichi-ui/giscus-theme) 的版本变更。

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
