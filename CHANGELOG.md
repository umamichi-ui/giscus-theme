# Changelog

本文件记录 [@umamichi-ui/giscus-theme](https://www.npmjs.com/package/@umamichi-ui/giscus-theme) 的版本变更。

## 0.5.0 - 2026-06-24

### Changed

- 圆角与控件尺寸 token 改为 `rem`，随 iframe 根字号（`1rem` / `1.125rem`）缩放。
- 覆盖 giscus 反应胶囊、编辑区最小高度、时间线等内置固定 `px` 尺寸。

## 0.4.9 - 2026-06-24

### Fixed

- 评论卡片与编辑外壳显式使用 `--site-bg`，去掉 `color-bg-secondary` 带来的灰底；Markdown 代码块仍保留 `--site-surface-muted`。

## 0.4.8 - 2026-06-24

### Fixed

- 深色主题构建同时内联 `tokens.css`，补齐 `--radius-sm`、`--control-height`、`--transition-fast` 等基础 token，修复暗黑模式下圆角与控件尺寸失效。

## 0.4.7 - 2026-06-24

### Fixed

- 恢复 `--color-canvas-subtle` / `--color-canvas-inset` 为 `--site-surface-muted`，评论内代码块等 inset 区域恢复灰底；输入框仍由 `_umamichi-chrome.css` 显式使用 `--site-bg`。

## 0.4.6 - 2026-06-24

### Fixed

- 去掉 `.gsc-comment-box-write` 外层灰框与 `padding`，仅保留 `::after` 圆角矩形；整表 `.gsc-comment-box`（含 tab、提交区）外轮廓强制直角，覆盖 giscus `rounded-md` 小圆角。

## 0.4.5 - 2026-06-24

### Fixed

- 回退 0.4.4 双层边框方案，恢复 0.4.3 单层编辑壳；外框 `.gsc-comment-box-write` 为直角灰线，`::after` 伪元素绘制内嵌圆角矩形，`:focus-within` 光晕仅作用于内层圆角框。

## 0.4.4 - 2026-06-24

### Fixed

- 编辑矩形外框（`.gsc-comment-box-write` / preview）改为直角灰线；内层 `textarea` + Markdown 工具条以独立边框拼成圆角矩形（中间直线分隔）。

## 0.4.3 - 2026-06-24

### Fixed

- 撤销对 `.gsc-comment-box`（整表 form）的输入框边框与 `:focus-within`；编辑矩形边框仅挂在 `.gsc-comment-box-write` / `.gsc-comment-box-preview`，tab 与「评论」按钮不再被包进文本框样式。
- 去除 giscus `form-control` 在 textarea-extras 上的多余边框；折叠「写回复」选择器改为 `.gsc-reply-box > button`。

## 0.4.2 - 2026-06-24

### Fixed

- 主评论框：外层统一 `border-radius: --radius-sm`，文本区上方两角圆角；聚焦光晕挂在整框 `:focus-within`。
- 折叠态「写回复」按钮：样式对齐 common-css `.text-input`（含 `--site-focus-ring`）。
- 评论 / 回复 / 取消 / 登录按钮：覆盖 giscus `.btn` / `.rounded-md`，使用 `--radius-sm`（10px）。

## 0.4.1 - 2026-06-24

### Fixed

- 评论编辑器：Write/Preview 选项卡仅上方两角圆角；文本区与 Markdown 工具条分段（直线分隔），合起来仅下方两角圆角。
- 操作按钮（评论 / 回复 / 取消 / 登录 GitHub）圆角与尺寸对齐 common-css 按钮；取消按钮使用 secondary 填充。
- 聚焦光晕仅由 `--site-focus-ring` 绘制，去除 textarea 上 Primer/Tailwind 额外 box-shadow。

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
