import Icon from '@/components/ui/Icons';
import { eventMediaClass } from '@/lib/utils/cn';
import type { GalleryItemDTO } from '@/types';

const TILE_LAYOUT = ['tall', '', '', 'wide', '', '', ''] as const;

interface GalleryPreviewProps {
  items: GalleryItemDTO[];
}

export default function GalleryPreview({ items }: GalleryPreviewProps) {
  const tiles = items.slice(0, 7);

  return (
    <section className="bg-cream-2 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2 className="font-head mt-4 max-w-[18ch] text-[clamp(32px,4vw,52px)] leading-[1.05]">
              Moments,
              <br />
              made together.
            </h2>
          </div>
          <p className="max-w-[46ch] text-base text-ink-2">
            Every face here is a story — a Holi played, a child welcomed, a parivar member supported. These are years of
            memories, captured.
          </p>
        </div>

        <div className="gallery-preview-grid mt-12">
          {tiles.map((tile, i) => {
            const layout = TILE_LAYOUT[i] ?? '';
            return (
              <div
                key={tile.id}
                className={`group relative overflow-hidden rounded-xl border border-line transition hover:scale-[1.02] ${
                  layout === 'tall' ? 'row-span-2' : layout === 'wide' ? 'col-span-2' : ''
                }`}
              >
                <div className={`relative h-full min-h-[180px] ${eventMediaClass[tile.media]}`}>
                  {tile.img && (
                    <img src={tile.img} alt={tile.t} className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-4 font-head text-base text-white opacity-0 transition group-hover:opacity-100">
                  {tile.t}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-9 text-center">
          <a className="btn btn-ghost" href="/gallery">
            View Full Gallery <Icon.ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
