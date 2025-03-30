import Link from "next/link";

const NotFound = () => {
  return (
    <section className="h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
