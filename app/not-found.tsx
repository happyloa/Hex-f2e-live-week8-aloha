import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="site-container placeholder">
        <h1>Page unavailable</h1>
        <p>The page you requested could not be found.</p>
        <a className="button" href="/">
          Back to homepage
        </a>
      </section>
    </SiteShell>
  );
}
