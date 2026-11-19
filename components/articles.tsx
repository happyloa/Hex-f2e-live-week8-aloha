import { defaultStay, stayQuery } from "@/lib/catalog";
import type { Article } from "@/lib/articles";
import { Icon } from "./icon";
import { Photo } from "./photo";

export function ArticleGrid({
  articles,
  headingLevel = 2,
}: {
  articles: Article[];
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="article-grid">
      {articles.map((article) => (
        <article className="article-card" key={article.slug}>
          <a href={"/inspiration/" + article.slug}>
            <Photo
              asset={article.photo}
              sizes="(min-width: 1024px) 350px, (min-width: 768px) 45vw, 92vw"
            />
            <p className="article-meta">
              {article.country}・{article.minutes} min read
            </p>
            <Heading>{article.title}</Heading>
          </a>
          <p>{article.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <>
      <header className="article-hero">
        <Photo
          className="article-hero-image"
          asset={article.photo + "-hero"}
          sizes="100vw"
          priority
        />
        <div className="site-container article-hero-text">
          <a className="article-back" href="/inspiration">
            <Icon name="back" size={20} /> Get Inspiration
          </a>
          <p className="article-meta">
            {article.country}・{article.minutes} min read
          </p>
          <h1>{article.title}</h1>
        </div>
      </header>
      <div className="article-container">
        <p className="article-intro">{article.intro}</p>
        {article.sections.map((section, index) => (
          <section key={section.title} data-reveal>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {index === 0 && article.figure && (
              <figure>
                <Photo
                  asset={article.figure.asset}
                  alt={article.figure.caption}
                  sizes="(min-width: 768px) 730px, 92vw"
                />
                <figcaption>{article.figure.caption}</figcaption>
              </figure>
            )}
          </section>
        ))}
        <aside className="article-stay" aria-labelledby="article-stay-title">
          <div>
            <h2 id="article-stay-title">
              {article.stayIn
                ? "Find a stay in " + article.stayIn
                : "Plan your next trip"}
            </h2>
            <p>Compare prices and book with no prepayment.</p>
          </div>
          <a
            className="button button-small"
            href={
              article.stayIn
                ? "/results?" +
                  stayQuery({ ...defaultStay, destination: article.stayIn })
                : "/#main"
            }
          >
            {article.stayIn ? "See hotels" : "Search hotels"}
          </a>
        </aside>
      </div>
    </>
  );
}
