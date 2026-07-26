import { Container, SectionIntro } from "../ui/Section";
import { PartnerLogoMarquee } from "../ui/PartnerLogoMarquee";

export function PartnerBanksSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionIntro eyebrow="Our Network" title="25+ Partner Banks & Financial Institutions" subtitle="Placeholder names shown below — swap in real partner logos once agreements are signed." />
      </Container>
      <PartnerLogoMarquee />
    </section>
  );
}
