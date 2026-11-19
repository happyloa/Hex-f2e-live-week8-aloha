import { Results } from "@/components/results";
import { SearchBar } from "@/components/search-bar";
import { SiteShell } from "@/components/site-shell";
import { readStay, type Query } from "@/lib/catalog";
import "../results.css";

export const metadata = { title: "Hotel search results" };

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const stay = readStay(await searchParams);
  return (
    <SiteShell subscribe="inline">
      <SearchBar stay={stay} />
      <Results stay={stay} />
    </SiteShell>
  );
}
