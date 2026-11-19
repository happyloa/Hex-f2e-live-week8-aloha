# ALOHA 旅館訂房

六角學院切版班第八週作業，Vinext 1.4.6 + React 19 + Tailwind CSS 4.3.5，部署在 Cloudflare Workers。

[線上網站](https://hex-f2e-live-week8-aloha.piafyoyo06.workers.dev) · [設計稿](https://xd.adobe.com/view/0cf6ec93-07a3-492f-58f2-9767ba1cfdfb-7ac7/) · [素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-booking)

## 頁面

| 路由                                        | 內容                       |
| ------------------------------------------- | -------------------------- |
| `/`                                         | 首頁                       |
| `/results?destination=…`                    | 搜尋結果，每個城市各有列表 |
| `/hotel/[slug]`                             | 飯店詳情與選房             |
| `/reserve`、`/reserve/success`              | 訂房、訂房完成             |
| `/login`、`/member`                         | 登入、會員中心             |
| `/inspiration`、`/inspiration/[slug]`       | 靈感文章（設計稿外補做）   |
| `/faqs`、`/terms-of-use`、`/privacy-policy` | 條款頁（設計稿外補做）     |

全部支援桌機、平板、手機。資料都是前端示範，不會真的訂房、登入或付款。設計稿只有連結的項目放在 `/info/[slug]` 佔位頁。

## 開發

需要 Node.js 24 以上。

```sh
npm ci
npm run dev
npm run check
npm run build
```

推上 `main` 會由 Cloudflare Workers Builds 自動部署，要手動部署就執行 `npm run deploy`。

## 結構

- `app/globals.css`：設計 tokens（Raleway、Open Sans、Roboto，主色 `#6C51E2`）
- `lib/catalog.ts`：目的地與飯店列表
- `lib/hotels.ts`：飯店詳情、房型與房價計算
- `lib/articles.ts`、`lib/legal.ts`：文章與條款頁文案
