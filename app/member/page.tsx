import { MyBookings, Profile } from "@/components/member";
import { SiteShell } from "@/components/site-shell";
import "../account.css";

export const metadata = { title: "My bookings and profile" };

export default function MemberPage() {
  return (
    <SiteShell member>
      <div className="site-container member-layout">
        <Profile />
        <MyBookings />
      </div>
    </SiteShell>
  );
}
