import type { ReactNode } from "react";
import { Icon } from "./icon";
import { SiteShell } from "./site-shell";
import {
  faqGroups,
  legalPages,
  supportEmail,
  type LegalSection,
  type LegalSlug,
} from "@/lib/legal";

type Anchor = { id: string; title: string };

export function LegalLayout({
  slug,
  lead,
  anchors,
  notice = false,
  children,
}: {
  slug: LegalSlug;
  lead: ReactNode;
  anchors: Anchor[];
  notice?: boolean;
  children: ReactNode;
}) {
  const title = legalPages.find((page) => page.slug === slug)!.title;
  return (
    <SiteShell>
      <header className="legal-hero">
        <div className="site-container">
          <p className="legal-eyebrow">Help &amp; policies</p>
          <h1>{title}</h1>
          <p className="legal-lead">{lead}</p>
        </div>
      </header>
      <div className="site-container legal-layout">
        <aside className="legal-aside">
          <nav className="legal-nav" aria-label="Policy pages">
            {legalPages.map((page) => (
              <a
                key={page.slug}
                href={"/" + page.slug}
                aria-current={page.slug === slug ? "page" : undefined}
              >
                {page.title}
              </a>
            ))}
          </nav>
          <nav className="legal-toc" aria-labelledby="legal-toc-title">
            <p id="legal-toc-title">On this page</p>
            <ol>
              {anchors.map((anchor) => (
                <li key={anchor.id}>
                  <a href={"#" + anchor.id}>{anchor.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className="legal-content">
          {notice && (
            <p className="legal-notice">
              ALOHA is a front-end practice project. No real bookings, payments
              or accounts are made on this site.
            </p>
          )}
          {children}
          <section className="legal-help" aria-labelledby="legal-help-title">
            <div>
              <h2 id="legal-help-title">Still have questions?</h2>
              <p>Write to us at {supportEmail}.</p>
            </div>
            <a
              className="button button-outline button-small"
              href={"mailto:" + supportEmail}
            >
              Email support
            </a>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="legal-sections">
      {sections.map((section, index) => (
        <li key={section.id} id={section.id}>
          <h2>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {section.title}
          </h2>
          {section.body.map((block, blockIndex) =>
            typeof block === "string" ? (
              <p key={blockIndex}>{block}</p>
            ) : (
              <ul key={blockIndex}>
                {block.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          )}
        </li>
      ))}
    </ol>
  );
}

export function FaqList() {
  return (
    <div className="faq-groups">
      {faqGroups.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="faq-group"
          aria-labelledby={group.id + "-title"}
        >
          <h2 id={group.id + "-title"}>{group.title}</h2>
          {group.items.map((item, index) => (
            <details
              key={item.q}
              className="faq-item"
              open={group.id === "booking" && index === 0}
            >
              <summary>
                {item.q}
                <Icon name="down" />
              </summary>
              {item.a.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </details>
          ))}
        </section>
      ))}
    </div>
  );
}
