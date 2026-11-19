import { LegalLayout, LegalSections } from "@/components/legal";
import { legalUpdated, privacySections } from "@/lib/legal";
import "../legal.css";

export const metadata = {
  title: "Privacy policy",
  description:
    "What information ALOHA collects, where it is kept and who it is shared with.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      slug="privacy-policy"
      lead={"Last updated " + legalUpdated}
      anchors={privacySections}
      notice
    >
      <LegalSections sections={privacySections} />
    </LegalLayout>
  );
}
