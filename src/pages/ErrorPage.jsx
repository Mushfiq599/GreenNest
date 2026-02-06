import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="mt-2 text-gray-600">Page not found.</p>
            <Link to="/" className="btn btn-primary mt-6">Go Home</Link>
        </div>
    );
}
