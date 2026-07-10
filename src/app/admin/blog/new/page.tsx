import BlogForm from '@/components/admin/BlogForm';
import { AdminPageHeader } from '@/components/admin/admin-ui';

export default function AdminBlogNewPage() {
  return (
    <>
      <AdminPageHeader title="New blog post" desc="Draft a post and publish when ready." />
      <BlogForm />
    </>
  );
}
