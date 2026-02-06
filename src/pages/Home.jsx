import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { plants } from "../data/plants";

export default function Home() {
    const [query, setQuery] = useState("");

    const filteredPlants = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return plants;
        return plants.filter((p) => p.name.toLowerCase().includes(q));
    }, [query]);

    const featuredCategories = categories.slice(0, 6);
    const topPlants = filteredPlants.slice(0, 6);

    return (
        <div className="w-full">
            {/* HERO */}
            <section className="bg-gradient-to-b from-green-50 to-white border-b">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                                GreenNest
                                <span className="block text-green-700">
                                    Indoor Plant Care & Store
                                </span>
                            </h1>

                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Explore plant categories, discover the perfect indoor plant, and
                                learn easy care tips. Sign in to view full plant details.
                            </p>

                            {/* Search */}
                            <div className="mt-6">
                                <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
                                    <span className="text-gray-400">🔎</span>
                                    <input
                                        type="text"
                                        className="grow"
                                        placeholder="Search plants (e.g., Snake Plant)"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </label>

                                {query && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        Showing results for: <span className="font-medium">{query}</span>
                                    </p>
                                )}
                            </div>

                            {/* CTA buttons */}
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/categories"
                                    className="btn bg-green-600 hover:bg-green-700 text-white border-none"
                                >
                                    Browse Categories
                                </Link>
                                <Link to="/login" className="btn btn-outline">
                                    Login to View Details
                                </Link>
                            </div>

                            {/* Quick stats */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <div className="badge badge-outline py-3 px-4">
                                    🌿 {categories.length} Categories
                                </div>
                                <div className="badge badge-outline py-3 px-4">
                                    🪴 {plants.length} Plants
                                </div>
                                <div className="badge badge-outline py-3 px-4">
                                    🔒 Private Details Page
                                </div>
                            </div>
                        </div>

                        {/* Right side “promo card” */}
                        <div className="bg-white rounded-2xl shadow p-6 border">
                            <h2 className="text-xl font-bold text-gray-900">
                                Today’s Care Tip
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Overwatering is the #1 indoor plant killer. Always check soil
                                moisture before watering!
                            </p>

                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                    <div className="text-sm text-gray-600">Light</div>
                                    <div className="text-lg font-bold text-gray-900">
                                        Bright Indirect
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                    <div className="text-sm text-gray-600">Water</div>
                                    <div className="text-lg font-bold text-gray-900">Weekly</div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    to="/categories"
                                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none"
                                >
                                    Explore Plants →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED CATEGORIES */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Featured Categories
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Choose a category to browse plants tailored to your space.
                        </p>
                    </div>
                    <Link to="/categories" className="btn btn-outline btn-sm">
                        View All
                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {featuredCategories.map((c) => (
                        <Link
                            key={c.id}
                            to={`/category/${c.id}`}
                            className="card bg-base-100 shadow hover:shadow-md transition"
                        >
                            <figure className="h-40">
                                <img
                                    src={c.image}
                                    alt={c.name}
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title">{c.name}</h3>
                                <p className="text-sm text-gray-600">{c.description}</p>
                                <div className="card-actions justify-end">
                                    <span className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none">
                                        Browse
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* TOP PLANTS */}
            <section className="bg-white border-t">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Popular Plants
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Click any plant to view details (requires login).
                            </p>
                        </div>
                        <Link to="/categories" className="btn btn-outline btn-sm">
                            Browse More
                        </Link>
                    </div>

                    {query && filteredPlants.length === 0 ? (
                        <div className="mt-10 text-center">
                            <h3 className="text-xl font-bold text-gray-900">No plants found</h3>
                            <p className="text-gray-600 mt-2">
                                Try searching with a different keyword.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {topPlants.map((p) => (
                                <Link
                                    key={p.id}
                                    to={`/plant/${p.id}`}
                                    className="card bg-base-100 shadow hover:shadow-md transition"
                                >
                                    <figure className="h-44">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h3 className="card-title">{p.name}</h3>

                                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                            <span className="badge badge-outline">⭐ {p.rating}</span>
                                            <span className="badge badge-outline">💧 {p.water}</span>
                                            <span className="badge badge-outline">☀ {p.light}</span>
                                            <span className="badge badge-outline">
                                                Care: {p.careLevel}
                                            </span>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="font-semibold text-green-700">
                                                ${p.price}
                                            </span>
                                            <span className="btn btn-sm btn-outline">
                                                Details
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
