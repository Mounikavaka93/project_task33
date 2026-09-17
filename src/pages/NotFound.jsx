import { Link } from 'react-router-dom'
import { FaApple } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center text-center">
      <div className="page-shell flex flex-col items-center">
        <FaApple size={36} />
        <h1 className="mt-6 text-[clamp(1.75rem,6vw,2.25rem)] font-semibold sm:text-4xl">Page not found.</h1>
        <p className="mt-3 max-w-md text-apple-muted">
          The page you requested does not exist. Head back to the store and keep exploring.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Go to Store
        </Link>
      </div>
    </div>
  )
}
