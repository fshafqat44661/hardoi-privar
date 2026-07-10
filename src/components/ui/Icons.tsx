import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const Icon = {
  Menu: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  ArrowRight: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  Check: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  Heart: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z" />
    </svg>
  ),
  Diya: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3c1.5 2 1.5 3.5 0 5-1.5-1.5-1.5-3 0-5z" fill="currentColor" />
      <path d="M4 14c2 3 5 4 8 4s6-1 8-4M4 14h16" />
    </svg>
  ),
  Network: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" />
      <path d="M8 7.5l3 9M16 7.5l-3 9M8 6h8" />
    </svg>
  ),
  Hand: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 11V5a1.5 1.5 0 0 1 3 0v5M11 10V4a1.5 1.5 0 0 1 3 0v6M14 10.5V6a1.5 1.5 0 0 1 3 0v8M17 9a1.5 1.5 0 0 1 3 0v5a7 7 0 0 1-7 7h-1a6 6 0 0 1-6-6v-2l-1.5-2a1.5 1.5 0 0 1 2.5-1.6L8 11" />
    </svg>
  ),
  Tree: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="12" r="2.5" />
      <circle cx="9" cy="19" r="2.5" /><circle cx="15" cy="19" r="2.5" />
      <path d="M12 7.5v2M10.5 11L8 12M13.5 11l2.5 1M7.5 14l1 3M16.5 14l-1 3" />
    </svg>
  ),
  Instagram: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  Facebook: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.2H7.9V14h2.7v8h2.9z" />
    </svg>
  ),
  Youtube: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
      <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5 3z" />
    </svg>
  ),
  Whatsapp: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
      <path d="M20 4A10 10 0 0 0 4.1 16.1L3 21l5-1.3A10 10 0 1 0 20 4zm-8 18a8.3 8.3 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 22zm4.6-6.2c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1.1-.3.1-.5 0a6.8 6.8 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5a2 2 0 0 0 .3-.4.4.4 0 0 0 0-.4l-.8-2c-.2-.5-.4-.4-.6-.4H8a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.1 5 5 0 0 0 1 2.6c.1.2 1.4 2.2 3.5 3.1a11.8 11.8 0 0 0 1.2.4 2.8 2.8 0 0 0 1.3.1c.4-.1 1.3-.5 1.4-1s.2-.9.1-1z" />
    </svg>
  ),
  Phone: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5 12.7a20 20 0 0 1-3.1-8.6A2 2 0 0 1 3.9 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.2-.5c.9.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  Mail: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" />
    </svg>
  ),
  Pin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s8-7 8-13a8 8 0 0 0-16 0c0 6 8 13 8 13z" /><circle cx="12" cy="9" r="3" />
    </svg>
  ),
  Eye: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-8-10-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M1 1l22 22" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  ),
};

export const StarSvg = ({ color = '#E85D2B' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className="h-full w-full">
    <path d="M12 2l2.6 6.5L22 9.2l-5.5 5L18.2 22 12 18.3 5.8 22l1.7-7.8L2 9.2l7.4-.7z" />
  </svg>
);

export default Icon;

export type PurposeIconName = 'Hand' | 'Diya' | 'Network' | 'Heart' | 'Tree';

export const PURPOSE_ICONS: Record<PurposeIconName, ReactNode> = {
  Hand: <Icon.Hand />,
  Diya: <Icon.Diya />,
  Network: <Icon.Network />,
  Heart: <Icon.Heart />,
  Tree: <Icon.Tree />,
};

export const CONTACT_ICONS = {
  Phone: <Icon.Phone />,
  Whatsapp: <Icon.Whatsapp />,
  Mail: <Icon.Mail />,
  Pin: <Icon.Pin />,
} as const;
