import { Confirmation } from "@/components/checkout";
import { SiteShell } from "@/components/site-shell";
import { readStay, reservation, type Query } from "@/lib/catalog";
import "../../account.css";

export const metadata = { title: "Reservation received" };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const stay = readStay(query);
  return (
    <SiteShell compact>
      <Confirmation
        stay={stay}
        booking={reservation(stay, query)}
        example={query.example === "1"}
      />
    </SiteShell>
  );
}
