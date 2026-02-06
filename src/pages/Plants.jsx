import { Link, useParams } from "react-router-dom";
import { categories } from "../data/categories";
import { plants } from "../data/plants";

export default function Plants() {
  const { id } = useParams();

  const category = categories.find((c) => c.id === id);
  const list = plants.filter((p) => p.categoryId === id);

  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <p className="mt-2 text-gray-600">Please choose a valid category.</p>
        <Link to="/categories" className="btn btn-primary mt-6">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="mt-2 text-gray-600">{category.description}</p>
        </div>
        <Link to="/categories" className="btn btn-outline">
          All Categories
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="mt-12 text-center text-gray-600">
          No plants found for this category.
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => (
            <Link
              key={p.id}
              to={`/plant/${p.id}`}
              className="card bg-base-100 shadow hover:shadow-md transition"
            >
              <figure className="h-44">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{p.name}</h2>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <span>⭐ {p.rating}</span>
                  <span>💧 {p.water}</span>
                  <span>☀ {p.light}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-green-700">${p.price}</span>
                  <span className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none">
                    Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
