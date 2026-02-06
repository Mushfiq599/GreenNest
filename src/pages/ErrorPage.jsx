import { Link, useRouteError } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ErrorPage() {
    useRouteError();

    return (
        <div className="min-h-screen flex flex-col bg-white">

            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-xl w-full text-center">
                    <img
                        src="/public/404-plant.jpg"
                        alt="404 plant not found"
                        className="mx-auto w-72 max-w-full"
                    />

                    <h1 className="mt-6 text-4xl font-extrabold text-gray-900">
                        404 — Page Not Found
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Looks like this page took a wrong turn in the greenhouse.
                        Let’s get you back to healthy plants
                    </p>

                    <Link
                        to="/"
                        className="btn bg-green-600 hover:bg-green-700 text-white border-none mt-6 px-10"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
