import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";

const pages = new Map([
  ["sign-up", "Sign up"],
  ["language", "Language"],
  ["currency", "Currency"],
  ["result-page", "More results"],
  ["edit-profile", "Edit profile"],
  ["add-payment", "Add payment method"],
  ["wow-life-booking", "WOW Life Hotel reservation"],
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
    : slug === "result-page"
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
