# @umamichi-ui/giscus-theme

[![npm version](https://img.shields.io/npm/v/@umamichi-ui/giscus-theme)](https://www.npmjs.com/package/@umamichi-ui/giscus-theme)
[![license: LGPL-3.0-or-later + MIT](https://img.shields.io/badge/license-LGPL--3.0--or--later%20%2B%20MIT-blue.svg)](./LICENSE)
[![CSS](https://img.shields.io/badge/CSS-Giscus%20themes-1572B6?logo=css3)](https://giscus.app/)

> 以下说明性正文由对话中的语言模型生成，未经过人工逐字核对；许可证与第三方归属以 `LICENSE`、`THIRD_PARTY_NOTICES.md` 及上游仓库为准。

面向 Umamichi UI 站点的 [giscus](https://giscus.app/) 评论组件主题包：内置从 [giscus 上游](https://github.com/giscus/giscus/tree/main/styles/themes) 同步的 `light` / `dark` 样式（CSS 变量），便于与站点其余样式一同版本化，并在 iframe 中通过绝对 URL 加载。

## 安装

```bash
npm install @umamichi-ui/giscus-theme
```

本包将 [`@umamichi-ui/common-css`](https://www.npmjs.com/package/@umamichi-ui/common-css) 声明为 **依赖**，以便与站点公共 token 层对齐；当前发布的 CSS 文件内容仍与上游 giscus 一致，未额外 `@import` common-css（后续若做主题定制可在此层接入）。

## 在 React / Vite / Astro 中与 `@giscus/react` 使用

giscus 的 `theme` 属性可传入 **样式表的绝对 URL**。使用 Vite 的 `?url` 查询参数得到打包后的资源地址，并按站点明暗切换选择对应文件：

```tsx
import Giscus from "@giscus/react"
import giscusDarkUrl from "@umamichi-ui/giscus-theme/dark.css?url"
import giscusLightUrl from "@umamichi-ui/giscus-theme/light.css?url"

const giscusThemeUrls = { light: giscusLightUrl, dark: giscusDarkUrl } as const

// …根据站点主题解析出 "light" | "dark" 后：
<Giscus /* …其他 props */ theme={giscusThemeUrls[resolved]} />
```

## 导出

| 子路径 | 说明 |
|--------|------|
| `@umamichi-ui/giscus-theme/light.css` | 与 giscus 内置 `light` 对应 |
| `@umamichi-ui/giscus-theme/dark.css` | 与 giscus 内置 `dark` 对应 |

## 许可证与归属

- 本仓库整体：`LGPL-3.0-or-later`（见根目录 `LICENSE`）；`package.json` 的 `license` 字段为 `(LGPL-3.0-or-later AND MIT)`，因 vendored 主题文件适用 MIT。
- 上游主题与 giscus 项目：见 `THIRD_PARTY_NOTICES.md` 与 `vendor/giscus/LICENSE`。

## 维护者：发布到 npm

1. 在包目录执行 `npm publish --access public`（需已登录 npm 且对 `@umamichi-ui` scope 有发布权限）。
2. 消费仓库将依赖设为 `"@umamichi-ui/giscus-theme": "^0.1.0"`（或当前主版本）后执行 `npm install` 以刷新 lockfile。
3. **在包未发布前** 联调可使用：`npm install @umamichi-ui/giscus-theme@file:../umamichi-ui-giscus-theme`（路径按本地布局调整）。
