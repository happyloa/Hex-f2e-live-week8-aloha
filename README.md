# ALOHA — 六角學院切版班第八週

依照六角學院的 ALOHA 訂房設計稿實作的前端練習，使用 Vinext App Router、React 和 Tailwind CSS，部署至 Cloudflare Workers。

## 開發

使用 Node.js 24 或更新版本。

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

使用 Wrangler 登入具備 Workers 部署權限的 Cloudflare 帳戶後，可執行 `npm run deploy`。Windows PowerShell 若限制執行 `npm.ps1`，可使用 `npm.cmd`。

## 畫板與路由

| 畫板                 | 路由                       |
| -------------------- | -------------------------- |
| Home                 | `/`                        |
| Result               | `/results`                 |
| Detail               | `/hotel/rachada-hotel`     |
| Reserve              | `/reserve`                 |
| Reserve success      | `/reserve/success`         |
| Login                | `/login`                   |
| Member               | `/member`                  |
| Select room          | 房量大於零時顯示固定選房列 |
| Mobile Result filter | 由搜尋結果的 Filter 開啟   |

各主要頁面包含桌機、平板及手機版型。沒有畫板的連結使用 `/info/[slug]` 佔位頁。搜尋、排序、篩選及房型金額使用本地樣本。登入、訂閱與訂單是前端展示，訂房聯絡資料僅保留在當前瀏覽器分頁的 session storage。沒有付款、帳號驗證或寄信服務。

## Design system

| Token                     | 值／用途                                                |
| ------------------------- | ------------------------------------------------------- |
| `font-display`            | Raleway，標題與大尺寸價格                               |
| `font-sans`               | Open Sans，內文、表單與按鈕                             |
| `font-nav`                | Roboto，導覽與結帳輔助文案                              |
| `brand` / `brand-dark`    | `#6C51E2` / `#5639C4`，主要操作與強調                   |
| `lavender`                | `#F1F0F8`，搜尋、篩選及摘要背景                         |
| `ink` / `text` / `subtle` | `#121212` / `#595959` / `#707070`，標題、內文及次要文字 |

全站 tokens 與按鈕、欄位、導覽和對話框樣式集中於 `app/globals.css`。主要互動位於 `components/`，樣本與金額計算位於 `lib/catalog.ts`。字型自行託管，圖檔使用多尺寸 WebP 與瀏覽器原生延遲載入。

- [六角學院 Adobe XD 設計稿](https://xd.adobe.com/view/0cf6ec93-07a3-492f-58f2-9767ba1cfdfb-7ac7/)
- [六角學院提供的作業素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-booking)
