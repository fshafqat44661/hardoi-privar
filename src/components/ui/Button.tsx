import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import Icon from '@/components/ui/Icons';

type Variant = 'primary' | 'ghost' | 'maroon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md';
  href?: string;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-[0_1px_0_rgba(0,0,0,.04),0_6px_18px_rgba(232,93,43,.28)] hover:bg-primary-deep',
  ghost: 'bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink/[0.03]',
  maroon: 'bg-maroon text-white hover:bg-[#611620]',
};

const sizes = {
  sm: 'px-[18px] py-2.5 text-sm',
  md: 'px-6 py-3.5 text-[15px]',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:translate-y-px whitespace-nowrap',
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function ArrowButton({ children, ...props }: Omit<ButtonProps, 'children'> & { children: React.ReactNode }) {
  return (
    <Button {...props}>
      {children} <Icon.ArrowRight />
    </Button>
  );
}
