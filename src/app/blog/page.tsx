import { fetchBlogPosts, calculateReadingTime } from "@/lib/blog";
import type { Metadata } from "next";
import BlogListClient from "@/components/BlogListClient";

export const metadata: Metadata = {
  title: "Blog - Rafid Al Khairy",
  description:
    "Thoughts, learnings, and findings from my journey as a software engineer.",
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();
  const postsWithReadingTime = posts.map((post) => ({
    ...post,
    readingTime: calculateReadingTime(post.content),
  }));

  return (
    <section className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Blog</h2>
          <p className="text-theme-fg/80 text-lg max-w-2xl mx-auto">
            Documenting my learnings, findings, and thoughts on software
            engineering.
          </p>
        </div>

        <BlogListClient posts={postsWithReadingTime} />
      </div>
    </section>
  );
}
