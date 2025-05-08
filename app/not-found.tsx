import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NotFound() {
  // This part won't be rendered due to the redirect, but we keep it for type safety
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href={`/login`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
