import Link from "next/link";

const NotFound = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center px-6">
        <h1 className="h2 mb-4">404</h1>
        <p className="mb-6 text-theme-fg/80">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-primary transition-all duration-500 text-sm font-medium"
        >
          Go back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
