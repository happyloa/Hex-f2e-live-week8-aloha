import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { hotels, stories } from "@/lib/catalog";

const pages = new Map([
  ["sign-up", "Sign up"],
  ["language", "Language"],
  ["currency", "Currency"],
  ["inspiration", "Get Inspiration"],
  ["result-page", "More results"],
  ["hotel-aqua", "Hotel Aqua"],
  ["mr-kawasaki-inn", "Mr. Kawasaki Inn"],
  ["weekly-paradise", "Weekly Paradise"],
  ["beast-hotel", "Beast Hotel"],
  ["edit-profile", "Edit profile"],
  ["add-payment", "Add payment method"],
  ["wow-life-booking", "WOW Life Hotel reservation"],
  ...hotels
    .filter(({ slug }) => slug !== "rachada-hotel")
    .map(({ slug, name }) => [slug, name] as const),
  ...stories.map(({ slug, title }) => [slug, title] as const),
]);

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return {
    title: pages.get((await params).slug) ?? "Page unavailable",
    robots: { index: false, follow: true },
  };
}

export default async function PlaceholderPage({ params }: Props) {
  const slug = (await params).slug;
  const title = pages.get(slug);
  if (!title) notFound();
  const back = ["edit-profile", "add-payment", "wow-life-booking"].includes(
    slug,
  )
    ? "/member"
    : slug === "result-page" || hotels.some((hotel) => hotel.slug === slug)
      ? "/results"
      : "/";
  return (
    <SiteShell>
      <section className="site-container placeholder">
        <h1>{title}</h1>
        <p>This page is a placeholder for the booking demo.</p>
        <a className="button" href={back}>
          {back === "/"
            ? "Back to homepage"
            : back === "/member"
              ? "Back to my bookings"
              : "Back to results"}
        </a>
      </section>
    </SiteShell>
  );
}
