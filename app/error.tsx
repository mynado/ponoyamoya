'use client'

export default function Error({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-6">
      <p className="font-body text-sm tracking-widest uppercase opacity-50">
        Something stirred unexpectedly
      </p>
      <h1 className="font-display text-3xl">
        The page couldn`t be reached
      </h1>
      <p className="max-w-sm opacity-70 text-sm leading-relaxed">
        Something went quiet on our end. Please try again in a moment.
      </p>
      <button
        onClick={reset}
        className="text-sm underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
      >
        Try again
      </button>
    </div>
  )
}