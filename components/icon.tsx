const paths = {
  menu: "M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z",
  globe:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3a15.6 15.6 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8zM12 4c.8 1.2 1.5 2.5 1.8 4h-3.6C10.5 6.5 11.2 5.2 12 4zM4.3 14a8 8 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3zm.8 2h3a15.6 15.6 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16zm3-8h-3a8 8 0 0 1 4.4-3.6A15.6 15.6 0 0 0 8.1 8zm3.9 12c-.8-1.2-1.5-2.5-1.8-4h3.6c-.3 1.5-1 2.8-1.8 4zm2.2-6H9.8a14 14 0 0 1 0-4h4.4a14 14 0 0 1 0 4zm.3 5.6a15.6 15.6 0 0 0 1.4-3.6h3a8 8 0 0 1-4.4 3.6zm1.8-5.6a16.5 16.5 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4z",
  pin: "M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  calendar:
    "M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11z",
  person:
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z",
  left: "m15.4 7.4-1.4-1.4-6 6 6 6 1.4-1.4-4.6-4.6z",
  right: "M8.6 16.6 10 18l6-6-6-6-1.4 1.4 4.6 4.6z",
  down: "M7.4 8.6 6 10l6 6 6-6-1.4-1.4-4.6 4.6z",
  caret: "M7 10l5 5 5-5z",
  back: "m20 11-12.2 0 5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20z",
  close:
    "M18.3 5.7 12 12l6.3 6.3-1.4 1.4-6.3-6.3-6.3 6.3-1.4-1.4L9.2 12 2.9 5.7l1.4-1.4 6.3 6.3 6.3-6.3z",
  star: "m12 17.3 6.2 3.7-1.6-7 5.4-4.7-7.2-.6L12 2 9.2 8.7 2 9.3 7.4 14l-1.6 7z",
  dollar:
    "M11 2h2v2.2c2.5.3 4.2 1.8 4.3 4h-2c-.1-1.4-1.2-2.2-3.2-2.2-1.9 0-3 .8-3 2 0 1.3 1.3 1.9 3.6 2.5 2.8.7 5 1.7 5 4.5 0 2.4-1.9 3.8-4.7 4.1V22h-2v-2.8c-2.7-.3-4.7-1.8-4.8-4.2h2c.2 1.6 1.5 2.5 3.8 2.5 2 0 3.5-.8 3.5-2 0-1.5-1.3-2.1-3.9-2.8C9 12 7 11.1 7 8.3 7 6 8.7 4.6 11 4.2z",
  filter: "M3 5h18v2H3zm3 6h12v2H6zm4 6h4v2h-4z",
  sort: "M3 6h18v2H3zm0 5h12v2H3zm0 5h6v2H3z",
  wifi: "m1 9 2 2a14 14 0 0 1 18 0l2-2A17 17 0 0 0 1 9zm4 4 2 2a8 8 0 0 1 10 0l2-2a11 11 0 0 0-14 0zm4 4 3 3 3-3a4.4 4.4 0 0 0-6 0z",
  breakfast:
    "M11 9H9V2H7v7H5V2H3v7a4 4 0 0 0 4 4v9h2v-9a4 4 0 0 0 4-4V2h-2v7zm6-2v7h3v8h2V2c-3 0-5 2.3-5 5z",
  tv: "M21 3H3a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 14H3V5h18z",
  air: "M11 2h2v20h-2zM3 6l1-2 17 14-1 2zm0 12L20 4l1 2L4 20z",
  service: "M1 20h22v2H1zm2-2a9 9 0 0 1 8-9.9V6h2v2.1A9 9 0 0 1 21 18z",
  smokeFree:
    "m3 2 19 19-1.4 1.4L16.2 18H2v-3h11.2L1.6 3.4zM20 15h2v3h-2zm-3-3h2v2h-2zm2-9v2a2 2 0 0 0 0 4c1.7 0 3 1.4 3 3v2h-2v-2a1 1 0 0 0-1-1 4 4 0 0 1 0-8z",
  fridge:
    "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 8h12V4H6zm0 2v8h12v-8zm2-7h2v4H8zm0 8h2v4H8z",
  bar: "M3 3h18v2l-8 9v5h4v2H7v-2h4v-5L3 5zm4.3 5h9.4l2.6-3H4.7z",
  plus: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z",
  minus: "M5 11h14v2H5z",
  bed: "M3 5h2v9h16v-3a2 2 0 0 0-2-2h-7v4H5v-2a3 3 0 0 1 6 0v2h1v1h11v5h-2v-3H5v3H3z",
  check: "m9 16.2-4.2-4.2L3.4 13.4 9 19 21 7l-1.4-1.4z",
  card: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4v-6h16zm0-10H4V6h16z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={paths[name]}
        fillRule={name === "globe" ? "evenodd" : undefined}
      />
    </svg>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars" role="img" aria-label={rating + " out of 5 stars"}>
      {Array.from({ length: rating }, (_, index) => (
        <Icon key={index} name="star" size={16} />
      ))}
    </span>
  );
}
