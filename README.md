# @umamichi-ui/giscus-theme

[![npm version](https://img.shields.io/npm/v/@umamichi-ui/giscus-theme)](https://www.npmjs.com/package/@umamichi-ui/giscus-theme)
[![license: LGPL-3.0-or-later + MIT](https://img.shields.io/badge/license-LGPL--3.0--or--later%20%2B%20MIT-blue.svg)](./LICENSE)
[![CSS](https://img.shields.io/badge/CSS-Giscus%20themes-1572B6?logo=css3)](https://giscus.app/)

> 以下说明性正文由对话中的语言模型生成，未经过人工逐字核对；许可证与第三方归属以 `LICENSE`、`THIRD_PARTY_NOTICES.md` 及上游仓库为准。

面向 Umamichi UI 站点的 [giscus](https://giscus.app/) 评论组件主题包：在 [giscus 上游](https://github.com/giscus/giscus/tree/main/styles/themes) 主题基础上，叠加 **默认 Aqua 色板**（与 [`@umamichi-ui/common-css`](https://www.npmjs.com/package/@umamichi-ui/common-css) 对齐的灰阶与水色 accent）。

## 安装

```bash
npm install @umamichi-ui/giscus-theme
```

`@umamichi-ui/common-css` 为 **peerDependency**（`>=0.12.0`），用于版本对齐；发布的 CSS 为构建期内联的单文件，**不含**运行时 `@import`。

## 构建（维护者）

```bash
npm run build
```

从 `styles/src/` 合并上游 base 与 `_umamichi-aqua-*.css` 覆盖层，输出到 `styles/themes/light.css` 与 `dark.css`。

## 在站点中使用

giscus 的 `theme` 须为 **绝对 URL**。推荐将主题复制到站点 `public/giscus/` 并配置 `/giscus/*` 的 CORS（giscus iframe 跨域加载）。

```bash
# 示例：从 node_modules 同步到 public/giscus/
cp node_modules/@umamichi-ui/giscus-theme/styles/themes/*.css public/giscus/
```

```tsx
const giscusThemeUrls = {
  light: "/giscus/light.css",
  dark: "/giscus/dark.css",
} as const

// new URL(path, window.location.origin).href → 传给 <Giscus theme={...} />
```

## 导出

| 子路径 | 说明 |
|--------|------|
| `@umamichi-ui/giscus-theme/light.css` | 浅色 + 默认 Aqua |
| `@umamichi-ui/giscus-theme/dark.css` | 深色 + 默认 Aqua |

## 许可证与归属

见 `LICENSE`、`THIRD_PARTY_NOTICES.md` 与 `vendor/giscus/LICENSE`。

## 发布

1. `npm publish --access public`
2. 消费方升级依赖并重新同步 `public/giscus/`
3. 未发布前联调：`npm install @umamichi-ui/giscus-theme@file:../umamichi-ui-giscus-theme`
