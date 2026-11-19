import { Gallery } from "@/components/gallery";
import { Stars } from "@/components/icon";
import { Rooms } from "@/components/rooms";
import { SearchBar } from "@/components/search-bar";
import { ScrollMotion } from "@/components/scroll-motion";
import { SiteShell } from "@/components/site-shell";
import { readStay, type Query } from "@/lib/catalog";
import "../../detail.css";

export const metadata = { title: "Rachada Hotel" };

export default async function HotelPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const stay = readStay(await searchParams);
  return (
    <SiteShell subscribe="inline">
      <SearchBar stay={stay} detail />
      <ScrollMotion />
      <div className="site-container detail-layout">
        <Gallery />
        <section
          className="hotel-description"
          aria-labelledby="hotel-name"
          data-reveal
        >
          <div className="detail-heading">
            <h1 id="hotel-name">Rachada Hotel</h1>
            <p>
              <Stars rating={4} /> 4.0 (283)
            </p>
          </div>
          <p className="address">
            318 Phaya Thai Road, Ratchathewi, Phaya Thai, 10400 Bangkok,
            Thailand
          </p>
          <p className="description">
            The Rachada Hotel is an establishment that provides paid lodging on
            a short-term basis. Facilities provided may range from a
            modest-quality mattress in a small room to large suites with bigger,
            higher-quality beds, a dresser, a refrigerator and other kitchen
            facilities, upholstered chairs, a flat screen television, and
            en-suite bathrooms.
          </p>
        </section>
        <Rooms stay={stay} />
      </div>
    </SiteShell>
  );
}
