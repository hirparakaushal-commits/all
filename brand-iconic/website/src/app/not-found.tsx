import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-8xl font-bold text-accent">404</h1>
      <h2 className="mt-4 font-heading text-2xl font-bold text-text-primary">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-accent px-6 py-3 font-semibold text-bg-primary transition-all hover:bg-accent-light"
      >
        Go Home
      </Link>
    </div>
  );
}
