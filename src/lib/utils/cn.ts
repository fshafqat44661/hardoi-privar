export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Event media gradient backgrounds — matches original CSS */
export const eventMediaClass: Record<string, string> = {
  saffron:
    'bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,255,255,.35),transparent_60%),linear-gradient(160deg,#F4B223,#E85D2B_60%,#7A1F2B)]',
  maroon:
    'bg-[radial-gradient(ellipse_at_70%_70%,rgba(255,255,255,.2),transparent_60%),linear-gradient(135deg,#4A121A,#7A1F2B)]',
  cream:
    'bg-[repeating-linear-gradient(45deg,rgba(31,25,21,.04)_0_1px,transparent_1px_12px),linear-gradient(180deg,#F0E4CC,#E6D5B3)]',
  sky: 'bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,.35),transparent_50%),linear-gradient(160deg,#3DA4D9,#1F5D82)]',
  marigold: 'bg-[linear-gradient(135deg,#FDED96,#F4B223_55%,#D48D00)]',
};

export function cardIconTone(tone: string) {
  switch (tone) {
    case 'maroon':
      return 'bg-maroon/10 text-maroon';
    case 'marigold':
      return 'bg-marigold/20 text-[#9B6C00]';
    case 'sky':
      return 'bg-sky/15 text-[#1F5D82]';
    default:
      return 'bg-primary/15 text-primary';
  }
}
