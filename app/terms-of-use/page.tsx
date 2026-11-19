import { LegalLayout, LegalSections } from "@/components/legal";
import { legalUpdated, termsSections } from "@/lib/legal";
import "../legal.css";

export const metadata = {
  title: "Terms of use",
  description:
    "The terms that apply when you search, book or create an account on ALOHA.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      slug="terms-of-use"
      lead={"Last updated " + legalUpdated}
      anchors={termsSections}
      notice
    >
      <LegalSections sections={termsSections} />
    </LegalLayout>
  );
}
