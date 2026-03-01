import { fetchBlogPosts } from "@/lib/blog";
import { calculateReadingTime } from "@/lib/blog";
import Link from "next/link";

const BlogSection = async () => {
  const posts = await fetchBlogPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="py-12 xl:py-24 bg-gradient-to-t from-theme-fg/[0.04] via-transparent to-transparent"
    >
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Blog</h2>
          <p className="text-theme-fg/80 text-lg max-w-2xl mx-auto">
            Recent thoughts and learnings from my journey as a software
            engineer.
          </p>
        </div>

        {/* Posts Grid */}
        {latestPosts.length === 0 ? (
          <div className="text-center">
            <p className="text-theme-fg/60 text-lg">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="bg-theme-fg/5 backdrop-blur-sm rounded-xl p-6 border border-theme-fg/10 hover:border-accent/50 hover:scale-[1.02] transition-all duration-300 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-accent text-sm">{post.date}</p>
                      <span className="text-theme-fg/40">·</span>
                      <p className="text-theme-fg/60 text-sm">{calculateReadingTime(post.content)}</p>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {post.title}
                    </h3>
                    <p className="text-theme-fg/70 text-sm mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {posts.length > 3 && (
              <div className="text-center mt-8 md:mt-12">
                <Link href="/blog">
                  <button className="px-6 md:px-8 py-3 bg-accent text-primary font-medium rounded-full hover:bg-accent/90 transition-colors duration-200">
                    View All Posts
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
