import type { ReactNode } from "react";
import { Icon } from "./icon";
import { Photo } from "./photo";
import { Subscribe } from "./subscribe";

const legalLinks = [
  ["FAQS", "FAQs"],
  ["terms-of-use", "Terms of use"],
  ["privacy-policy", "Privacy policy"],
];

export function Header({
  member = false,
  login = false,
}: {
  member?: boolean;
  login?: boolean;
}) {
  return (
    <header className={"site-header" + (login ? " login-header" : "")}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-container header-row">
        {!login && (
          <details className="header-menu">
            <summary aria-label="Open navigation">
              <Icon name="menu" />
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="/">Homepage</a>
              <a href="/results">Find hotels</a>
              {member ? (
                <a href="/member">My Bookings</a>
              ) : (
                <a href="/info/sign-up">Sign up</a>
              )}
              <a href="/info/language">English</a>
            </nav>
          </details>
        )}
        <a className="logo" href="/" aria-label="ALOHA homepage">
          <img src="/img/logo-aloha.svg" alt="ALOHA" width="96" height="28" />
        </a>
        {login ? (
          <a className="login-close" href="/" aria-label="Close login">
            <Icon name="close" />
          </a>
        ) : (
          <nav className="header-links" aria-label="Main navigation">
            <a
              className="header-desktop inline-flex items-center gap-0.5"
              href="/info/language"
              aria-label="Language"
            >
              <Icon name="globe" />
              <Icon name="caret" size={16} />
            </a>
            {member ? (
              <a
                className="member-nav"
                href="/member"
                aria-label="David Lin account"
              >
                <Photo asset="profile" alt="" sizes="32px" />
                <span className="header-desktop">David Lin</span>
                <span className="header-desktop">
                  <Icon name="caret" size={16} />
                </span>
              </a>
            ) : (
              <>
                <a className="header-desktop" href="/info/sign-up">
                  Sign up
                </a>
                <a href="/login">Login</a>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className={"site-footer" + (compact ? " footer-compact" : "")}>
      <div
        className={
          compact ? "checkout-container footer-row" : "site-container footer-row"
        }
      >
        <p>© 2020 ALOHA, Inc. All rights reserved.</p>
        <nav className="legal-links" aria-label="Help and policies">
          {legalLinks.map(([slug, title]) => (
            <a key={slug} href={"/info/" + slug.toLowerCase()}>
              {title}
            </a>
          ))}
        </nav>
        {!compact && (
          <nav className="footer-preferences" aria-label="Preferences">
            <a href="/info/language">
              <Icon name="globe" size={20} /> English{" "}
              <Icon name="caret" size={14} />
            </a>
            <a href="/info/currency">
              <Icon name="dollar" size={20} /> TWD{" "}
              <Icon name="caret" size={14} />
            </a>
          </nav>
        )}
      </div>
    </footer>
  );
}

export function SiteShell({
  children,
  subscribe,
  compact,
  member,
}: {
  children: ReactNode;
  subscribe?: "wide" | "inline";
  compact?: boolean;
  member?: boolean;
}) {
  return (
    <>
      <Header member={member} />
      <main id="main" className="flex-1">
        {children}
      </main>
      {subscribe && <Subscribe wide={subscribe === "wide"} />}
      <Footer compact={compact} />
    </>
  );
}
