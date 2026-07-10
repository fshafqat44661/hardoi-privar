'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
}

export default function ImageUpload({
  label = 'Image',
  value,
  onChange,
  folder = 'hardoi-parivar',
  placeholder = 'Upload an image or paste a URL',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file: File) {
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const json = await res.json();
      if (!json.success) {
        setError(json.error ?? 'Upload failed');
        return;
      }
      onChange(json.data.url);
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-2">
      <span className="form-label">{label}</span>

      {value && (
        <div className="relative h-40 w-full max-w-md overflow-hidden rounded-xl border border-line bg-cream">
          <Image src={value} alt="" fill className="object-cover" unoptimized={value.startsWith('http')} />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
        />
        <button
          type="button"
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-cream disabled:opacity-50"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? 'Uploading…' : 'Upload image'}
        </button>
        {value && (
          <button
            type="button"
            className="rounded-full px-4 py-2 text-sm text-ink-2 hover:text-maroon"
            onClick={() => onChange('')}
          >
            Remove
          </button>
        )}
      </div>

      <input
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {error && <p className="text-sm text-primary-deep">{error}</p>}
    </div>
  );
}
