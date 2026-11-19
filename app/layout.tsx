import type { ReactNode } from "react";
import "@fontsource-variable/raleway/wght.css";
import "@fontsource-variable/open-sans/wght.css";
import "@fontsource/roboto/latin-400.css";
import "./globals.css";

export const metadata = {
  title: {
    default: "ALOHA | Discover your ideal hotel",
    template: "%s | ALOHA",
  },
  description:
    "Discover your dream destination and hotel on ALOHA. Browse destinations, compare stays, and explore hotel rooms.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
