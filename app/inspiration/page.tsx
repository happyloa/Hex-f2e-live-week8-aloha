import { ArticleGrid } from "@/components/articles";
import { SiteShell } from "@/components/site-shell";
import { articles } from "@/lib/articles";
import "../inspiration.css";

export const metadata = {
  title: "Get Inspiration",
  description: "Travel stories and tips for Italy, Thailand and New Zealand.",
};

export default function InspirationPage() {
  return (
    <SiteShell subscribe="wide">
      <header className="inspiration-hero">
        <div className="site-container">
          <h1>Get Inspiration</h1>
          <p>Travel stories and tips for planning your next trip.</p>
        </div>
      </header>
      <div className="site-container inspiration-list">
        <ArticleGrid articles={articles} />
      </div>
    </SiteShell>
  );
}
