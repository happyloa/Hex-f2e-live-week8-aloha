import { destinations, defaultStay, stayQuery, stories } from "@/lib/catalog";
import { Hero, TopChoices } from "@/components/home-carousel";
import { Icon } from "@/components/icon";
import { Photo } from "@/components/photo";
import { SearchBar } from "@/components/search-bar";
import { SiteShell } from "@/components/site-shell";

export default function Home() {
  return (
    <SiteShell subscribe="wide">
      <Hero />
      <SearchBar />
      <div className="site-container home-content">
        <TopChoices />
        <section className="home-section" aria-labelledby="destinations-title">
          <h2 id="destinations-title">Popular Destinations</h2>
          <div className="destination-grid">
            {destinations.map(({ city, country, photo }) => (
              <a
                className="destination"
                key={city}
                href={
                  "/results?" + stayQuery({ ...defaultStay, destination: city })
                }
              >
                <Photo
                  asset={photo}
                  sizes="(min-width: 1024px) 350px, (min-width: 768px) 45vw, 92vw"
                />
                <span>
                  <small>{country}</small>
                  <strong>{city}</strong>
                </span>
                <Icon name="down" />
              </a>
            ))}
          </div>
        </section>
        <section className="home-section" aria-labelledby="inspiration-title">
          <div className="section-heading">
            <h2 id="inspiration-title">Get Inspiration</h2>
            <a
              className="button button-outline button-small"
              href="/info/inspiration"
            >
              More inspiration
            </a>
          </div>
          <div className="story-strip strip">
            {stories.map(({ slug, title, photo, excerpt }) => (
              <article key={slug}>
                <a href={"/info/" + slug}>
                  <Photo
                    asset={photo}
                    sizes="(min-width: 1024px) 350px, 240px"
                  />
                  <h3>{title}</h3>
                </a>
                <p>{excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
