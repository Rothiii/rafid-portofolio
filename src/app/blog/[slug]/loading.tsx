const BlogDetailSkeleton = () => {
  return (
    <section className="min-h-screen py-12 xl:py-24">
      <div className="container mx-auto max-w-3xl animate-pulse">
        {/* Back link */}
        <div className="h-5 w-28 bg-theme-fg/10 rounded mb-8" />

        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            <div className="h-4 w-24 bg-theme-fg/10 rounded" />
            <div className="h-4 w-20 bg-theme-fg/10 rounded" />
          </div>
          <div className="h-10 w-3/4 bg-theme-fg/10 rounded-lg mb-4" />
          <div className="flex gap-2 mb-6">
            <div className="h-7 w-16 bg-theme-fg/10 rounded-full" />
            <div className="h-7 w-20 bg-theme-fg/10 rounded-full" />
            <div className="h-7 w-14 bg-theme-fg/10 rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="h-6 w-1/2 bg-theme-fg/10 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-theme-fg/10 rounded" />
            <div className="h-4 w-full bg-theme-fg/10 rounded" />
            <div className="h-4 w-5/6 bg-theme-fg/10 rounded" />
          </div>
          <div className="h-48 w-full bg-theme-fg/10 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-theme-fg/10 rounded" />
            <div className="h-4 w-full bg-theme-fg/10 rounded" />
            <div className="h-4 w-4/5 bg-theme-fg/10 rounded" />
            <div className="h-4 w-full bg-theme-fg/10 rounded" />
            <div className="h-4 w-2/3 bg-theme-fg/10 rounded" />
          </div>
          <div className="h-6 w-2/5 bg-theme-fg/10 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-theme-fg/10 rounded" />
            <div className="h-4 w-full bg-theme-fg/10 rounded" />
            <div className="h-4 w-3/4 bg-theme-fg/10 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailSkeleton;
