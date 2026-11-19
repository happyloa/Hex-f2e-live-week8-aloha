import { Checkout } from "@/components/checkout";
import { SiteShell } from "@/components/site-shell";
import { readStay, reservation, type Query } from "@/lib/catalog";
import "../account.css";

export const metadata = { title: "Reservation details" };

export default async function ReservePage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const stay = readStay(query);
  return (
    <SiteShell compact>
      <Checkout
        stay={stay}
        booking={reservation(stay, query)}
        edit={query.edit === "1"}
      />
    </SiteShell>
  );
}
