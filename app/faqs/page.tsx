import { FaqList, LegalLayout } from "@/components/legal";
import { faqGroups } from "@/lib/legal";
import "../legal.css";

export const metadata = {
  title: "FAQs",
  description:
    "Answers about booking a room, prices, changes, cancellations and your ALOHA account.",
};

export default function FaqsPage() {
  return (
    <LegalLayout
      slug="faqs"
      lead="Answers about booking, prices, changes and your account."
      anchors={faqGroups.map(({ id, title }) => ({ id, title }))}
    >
      <FaqList />
    </LegalLayout>
  );
}
