import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-6">
      <p className="font-body text-sm tracking-widest uppercase opacity-50">
        Lost in the archive
      </p>
      <h1 className="font-display text-3xl">
        This page has moved on
      </h1>
      <p className="max-w-sm opacity-70 text-sm leading-relaxed">
        {"The work or writing you're looking for may have shifted or no longer exists."}
      </p>
      <Link
        href="/"
        className="text-sm underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
      >
        Return home
      </Link>
    </div>
  )
}