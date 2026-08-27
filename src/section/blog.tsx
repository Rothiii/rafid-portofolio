import { fetchBlogPosts } from "@/lib/blog";
import { calculateReadingTime } from "@/lib/blog";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const BlogSection = async () => {
  const posts = await fetchBlogPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="py-12 xl:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="blog"
          description="Recent thoughts and learnings from my journey as a software engineer."
        />

        {latestPosts.length === 0 ? (
          <p className="text-theme-fg/60">No posts yet. Check back soon!</p>
        ) : (
          <>
            <div className="max-w-3xl divide-y divide-theme-fg/10 border-t border-theme-fg/10">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block py-6 group"
                >
                  <div className="flex items-center gap-2 mb-2 font-primary text-xs text-theme-fg/50">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{calculateReadingTime(post.content)}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-theme-fg/70 text-sm mb-3 line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-primary px-2 py-0.5 border border-theme-fg/15 text-theme-fg/60 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            {posts.length > 3 && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 mt-8 text-accent text-sm font-medium hover:underline"
              >
                View all posts →
              </Link>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
