import ContactHero from "@/components/contact/contact-hero";
import ContactInfo from "@/components/contact/contact-info";
import ContactForm from "@/components/contact/contact-form";
import ContactMap from "@/components/contact/contact-map";
import ContactCTA from "@/components/contact/contact-cta";

export default function ContactsPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactInfo />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ContactForm />
        <ContactMap />
      </div>
      <ContactCTA />
    </div>
  );
}
