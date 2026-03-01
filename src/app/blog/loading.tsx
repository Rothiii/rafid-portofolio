const BlogListingSkeleton = () => {
  return (
    <section className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto">
        {/* Title Skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 w-32 bg-theme-fg/10 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 max-w-full bg-theme-fg/10 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-10 space-y-4">
          <div className="max-w-md mx-auto">
            <div className="h-12 bg-theme-fg/10 rounded-xl animate-pulse" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-16 bg-theme-fg/10 rounded-full animate-pulse" />
            ))}
          </div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-theme-fg/5 rounded-xl p-6 border border-theme-fg/10 animate-pulse"
            >
              <div className="flex gap-2 mb-2">
                <div className="h-4 w-24 bg-theme-fg/10 rounded" />
                <div className="h-4 w-16 bg-theme-fg/10 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-theme-fg/10 rounded mb-3" />
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-theme-fg/10 rounded" />
                <div className="h-4 w-5/6 bg-theme-fg/10 rounded" />
                <div className="h-4 w-2/3 bg-theme-fg/10 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-14 bg-theme-fg/10 rounded-full" />
                <div className="h-6 w-18 bg-theme-fg/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogListingSkeleton;
