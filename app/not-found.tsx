import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm text-muted">404</p>
      <h1 className="text-4xl font-medium tracking-tight text-ink">This page doesn&apos;t exist.</h1>
      <Link href="/" className="text-muted underline-offset-4 hover:text-ink hover:underline">Back home</Link>
    </main>
  );
}
