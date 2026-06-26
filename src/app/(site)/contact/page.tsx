import ContactForm from '@/components/forms/ContactForm';
import PageHeader from '@/components/layout/PageHeader';
import { CONTACT_ICONS } from '@/components/ui/Icons';
import { getContactInfo } from '@/lib/services/content.service';

export const metadata = { title: 'Contact' };

export default async function ContactPage() {
  const contacts = await getContactInfo();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            We&apos;d love to <i>hear from you.</i>
          </>
        }
        hindi="संपर्क करें — हम यहीं हैं।"
        sub="Questions, event ideas, partnership requests, or simply saying hello — write to us and a parivar volunteer will get back within a working day."
        bannerImg="/assets/IMG-20260409-WA0000.jpg.jpeg"
        bannerColor="sky"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <section className="py-8 md:pb-24">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5">
            {contacts.map((c) => (
              <div key={c.id} className="flex gap-4 rounded-[14px] border border-line bg-white p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-primary/10 text-primary">
                  {CONTACT_ICONS[c.icon]}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-2">{c.l}</div>
                  <div className="font-head mt-1 text-xl">{c.v}</div>
                  <div className="mt-0.5 text-[13px] text-ink-2">{c.s}</div>
                </div>
              </div>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
