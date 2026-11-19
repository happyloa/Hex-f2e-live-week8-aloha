import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { Stars } from "@/components/icon";
import { Rooms } from "@/components/rooms";
import { SearchBar } from "@/components/search-bar";
import { ScrollMotion } from "@/components/scroll-motion";
import { SiteShell } from "@/components/site-shell";
import { readStay, type Query } from "@/lib/catalog";
import { hotelBySlug } from "@/lib/hotels";
import "../../detail.css";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Query>;
};

export async function generateMetadata({ params }: Props) {
  const hotel = hotelBySlug((await params).slug);
  return hotel
    ? { title: hotel.name, description: hotel.description }
    : { title: "Hotel not found" };
}

export default async function HotelPage({ params, searchParams }: Props) {
  const hotel = hotelBySlug((await params).slug);
  if (!hotel) notFound();
  const stay = { ...readStay(await searchParams), destination: hotel.city };
  return (
    <SiteShell subscribe="inline">
      <SearchBar stay={stay} detail />
      <ScrollMotion />
      <div className="site-container detail-layout">
        <Gallery name={hotel.name} photos={hotel.photos} />
        <section
          className="hotel-description"
          aria-labelledby="hotel-name"
          data-reveal
        >
          <div className="detail-heading">
            <h1 id="hotel-name">{hotel.name}</h1>
            <p>
              <Stars rating={hotel.rating} /> {hotel.rating.toFixed(1)} (
              {hotel.reviews})
            </p>
          </div>
          <p className="address">{hotel.address}</p>
          <p className="description">{hotel.description}</p>
        </section>
        <Rooms
          key={hotel.slug}
          stay={stay}
          hotel={{ slug: hotel.slug, rooms: hotel.rooms }}
        />
      </div>
    </SiteShell>
  );
}
