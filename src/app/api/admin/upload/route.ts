import { NextRequest } from 'next/server';
import { ok, fail } from '@/lib/api/response';
import { requireAuth } from '@/lib/auth/admin-api';
import { getCloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if ('error' in auth && auth.error) return auth.error;

  if (!isCloudinaryConfigured()) {
    return fail('Cloudinary is not configured', 500);
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folder = String(formData.get('folder') ?? 'hardoi-parivar').replace(/[^\w/-]/g, '');

    if (!(file instanceof File)) return fail('No file provided');
    if (!ALLOWED_TYPES.has(file.type)) return fail('Only JPEG, PNG, WebP, and GIF images are allowed');
    if (file.size > MAX_BYTES) return fail('Image must be 5 MB or smaller');

    const buffer = Buffer.from(await file.arrayBuffer());
    const cloudinary = getCloudinary();

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
        },
        (error, uploadResult) => {
          if (error || !uploadResult) reject(error ?? new Error('Upload failed'));
          else resolve(uploadResult as never);
        },
      );
      stream.end(buffer);
    });

    return ok({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    console.error('[upload]', err);
    return fail('Image upload failed', 500);
  }
}
