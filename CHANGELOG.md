# Changelog

本文件记录 [@umamichi-ui/giscus-theme](https://www.npmjs.com/package/@umamichi-ui/giscus-theme) 的版本变更。

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
