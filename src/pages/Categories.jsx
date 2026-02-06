import { Link } from "react-router-dom";
import { categories } from "../data/categories";

export default function Categories() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Plant Categories</h1>
        <p className="mt-2 text-gray-600">
          Explore indoor plant categories and find the perfect match for your space.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/category/${c.id}`}
            className="card bg-base-100 shadow hover:shadow-md transition"
          >
            <figure className="h-44">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{c.name}</h2>
              <p className="text-sm text-gray-600">{c.description}</p>
              <div className="card-actions justify-end">
                <span className="btn btn-sm btn-outline">View Plants</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
