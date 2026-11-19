# ALOHA 旅館訂房

六角學院切版班第八週作業。使用 Vinext 1.4.6、React 19 與 Tailwind CSS 4.3.5，部署於 Cloudflare Workers。

[線上網站](https://hex-f2e-live-week8-aloha.piafyoyo06.workers.dev) · [設計稿](https://xd.adobe.com/view/0cf6ec93-07a3-492f-58f2-9767ba1cfdfb-7ac7/) · [原始素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-booking)

## 功能

- 首頁、搜尋結果、飯店詳情、訂房、訂房完成、登入與會員中心皆支援桌機、平板及手機。
- 可選擇入住與退房區間、搜尋目的地、調整旅客與房間數，並篩選、排序與選房。
- 首頁橫幅支援自動播放與暫停。卡片與相簿可切換，捲動進場會尊重系統的減少動態設定。
- 設計稿以外補做的頁面沿用同一套設計 tokens：
  - `/hotel/[slug]`：每間飯店都有詳情頁，Rachada Hotel 以外的房型與價格由列表資料產生。
  - `/results?destination=…`：熱門目的地與 Top Choices 的城市都有各自的飯店列表。
  - `/inspiration` 與 `/inspiration/[slug]`：Get Inspiration 的文章列表與單篇文章。
  - 頁尾的 FAQs、Terms of use 與 Privacy policy。
- 訂房、登入與訂閱使用示範資料。設計稿只有連結的其他項目使用佔位頁。素材包的房間照片不多，部分照片會在不同城市的飯店重複使用。

## 本機開發

需要 Node.js 24 以上。

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

登入 Wrangler 後，以 `npm run deploy` 部署。

## 程式結構

- `app/` 管理頁面與樣式，`components/` 放共用元件，`lib/catalog.ts` 管理目的地與飯店列表，`lib/hotels.ts` 管理飯店詳情、房型與房價計算，`lib/articles.ts` 和 `lib/legal.ts` 存放文章與條款頁的文案。
- `app/globals.css` 定義設計 tokens。標題使用 Raleway，內文使用 Open Sans，導覽使用 Roboto，品牌色為 `#6C51E2`。
