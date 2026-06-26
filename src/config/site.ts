export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/purpose', label: 'Purpose' },
  { href: '/events', label: 'Events' },
  { href: '/membership', label: 'Membership' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const;

export const DONATION_PURPOSES = [
  'General Fund',
  'Health Camp — Hardoi',
  'Scholarship Programme',
  'Festival & Cultural Events',
  'Emergency Relief',
] as const;

export const SITE = {
  name: 'Hardoi Parivar NCR',
  tagline: 'Our Roots, Our Pride — A Home Away From Home.',
  email: 'namaste@hardoiparivar.org',
  phone: '+91 11 4000 0000',
} as const;
