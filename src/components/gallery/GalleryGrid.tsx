'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn, eventMediaClass } from '@/lib/utils/cn';
import type { GalleryItemDTO } from '@/types';

interface GalleryGridProps {
  tiles: GalleryItemDTO[];
}

export default function GalleryGrid({ tiles }: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = () => setLightbox(null);
  const goPrev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + tiles.length) % tiles.length);
  }, [lightbox, tiles.length]);
  const goNext = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % tiles.length);
  }, [lightbox, tiles.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightbox, goPrev, goNext]);

  const current = lightbox !== null ? tiles[lightbox] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-[18px]">
        {tiles.map((tile, i) => (
          <article
            key={tile.id}
            onClick={() => setLightbox(i)}
            className={cn(
              'group cursor-pointer overflow-hidden rounded-[20px] border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(31,25,21,.12)]',
              (i === 0 || i === 5) && 'sm:row-span-2',
            )}
          >
            <div className={cn('relative aspect-square overflow-hidden', (i === 0 || i === 5) && 'sm:aspect-[1/1.6]', eventMediaClass[tile.media])}>
              {tile.img && (
                <img src={tile.img} alt={tile.t} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              )}
              <div className="absolute inset-0 grid place-items-center bg-black/0 transition group-hover:bg-black/35">
                <svg className="scale-75 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
              <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm">
                {tile.m}
              </span>
            </div>
            <div className="px-4 py-4">
              <h3 className="text-base leading-snug">{tile.t}</h3>
            </div>
          </article>
        ))}
      </div>

      {lightbox !== null && current && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md" onClick={close}>
          <div className="relative flex h-full max-h-[calc(100vh-32px)] w-full max-w-[960px] flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Close" className="absolute right-0 top-0 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white" onClick={close}>
              ×
            </button>
            <div className="absolute left-0 top-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/50">
              {lightbox + 1} / {tiles.length}
            </div>
            <button type="button" aria-label="Previous" className="absolute left-0 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/40 text-white md:-left-14" onClick={goPrev}>
              ‹
            </button>
            <div className="flex min-h-0 w-full flex-1 items-center justify-center pt-11">
              <img key={lightbox} src={current.img} alt={current.t} className="max-h-full max-w-full rounded-xl object-contain shadow-2xl" />
            </div>
            <button type="button" aria-label="Next" className="absolute right-0 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/40 text-white md:-right-14" onClick={goNext}>
              ›
            </button>
            <div className="w-full px-1">
              <h3 className="font-head text-lg text-white">{current.t}</h3>
              <span className="text-xs text-white/45">{current.m}</span>
            </div>
            <div className="flex w-full gap-1.5 overflow-x-auto pb-1">
              {tiles.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={cn(
                    'h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 opacity-40 transition',
                    i === lightbox ? 'scale-110 border-white opacity-100' : 'border-transparent',
                  )}
                >
                  <img src={t.img} alt={t.t} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
