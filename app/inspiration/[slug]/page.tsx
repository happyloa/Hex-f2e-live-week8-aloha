import { notFound } from "next/navigation";
import { ArticleBody, ArticleGrid } from "@/components/articles";
import { ScrollMotion } from "@/components/scroll-motion";
import { SiteShell } from "@/components/site-shell";
import { articleBySlug, articles } from "@/lib/articles";
import "../../inspiration.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const article = articleBySlug((await params).slug);
  return article
    ? { title: article.title, description: article.excerpt }
    : { title: "Story not found" };
}

export default async function ArticlePage({ params }: Props) {
  const article = articleBySlug((await params).slug);
  if (!article) notFound();
  return (
    <SiteShell subscribe="wide">
      <ScrollMotion />
      <article>
        <ArticleBody article={article} />
      </article>
      <section
        className="site-container article-more"
        aria-labelledby="more-title"
      >
        <h2 id="more-title">More inspiration</h2>
        <ArticleGrid
          articles={articles.filter(({ slug }) => slug !== article.slug)}
          headingLevel={3}
        />
      </section>
    </SiteShell>
  );
}
