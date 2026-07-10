'use client';

import { useEffect, useId, useRef, useState } from 'react';

interface FormSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | string[];
  placeholder?: string;
  id?: string;
}

export default function FormSelect({ value, onChange, options, placeholder = 'Select…', id }: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const triggerId = id ?? `form-select-${listId}`;

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        id={triggerId}
        type="button"
        className={`form-input form-select-trigger flex w-full items-center justify-between gap-3 text-left ${
          open ? 'border-primary bg-white' : ''
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
      >
        <span className={value ? 'text-ink' : 'text-ink-2'}>{value || placeholder}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-ink-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={triggerId}
          className="absolute z-30 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-line bg-white py-1.5 shadow-card"
        >
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <li key={opt} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[15px] transition ${
                    selected
                      ? 'bg-primary/10 font-semibold text-primary-deep'
                      : 'text-ink hover:bg-cream'
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                  {selected && (
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
