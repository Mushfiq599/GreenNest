import { Link, useParams } from "react-router-dom";
import { plants } from "../data/plants";

export default function PlantDetails() {
  const { id } = useParams();
  const plant = plants.find((p) => p.id === id);

  if (!plant) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold">Plant Not Found</h1>
        <p className="mt-2 text-gray-600">This plant does not exist.</p>
        <Link to="/categories" className="btn btn-primary mt-6">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link to={`/category/${plant.categoryId}`} className="btn btn-sm btn-outline">
        ← Back
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-80 md:h-full object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-3xl font-bold">{plant.name}</h1>
          <p className="mt-2 text-gray-600">{plant.description}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="badge badge-outline">⭐ {plant.rating}</span>
            <span className="badge badge-outline">Care: {plant.careLevel}</span>
            <span className="badge badge-outline">☀ {plant.light}</span>
            <span className="badge badge-outline">💧 {plant.water}</span>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-100">
            <div className="text-gray-700">Price</div>
            <div className="text-3xl font-extrabold text-green-700">
              ${plant.price}
            </div>
            <button className="btn bg-green-600 hover:bg-green-700 text-white border-none w-full mt-4">
              Add to Cart (Optional)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
