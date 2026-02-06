import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { plants } from "../data/plants";
import { FaStar } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

export default function PlantDetails() {
  const { id } = useParams(); // this is plantId in URL
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ find by plantId (number or string)
  const currentIndex = plants.findIndex(
    (p) => String(p.plantId) === String(id)
  );

  if (currentIndex === -1) {
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

  const plant = plants[currentIndex];
  const prevPlant = currentIndex > 0 ? plants[currentIndex - 1] : null;
  const nextPlant = currentIndex < plants.length - 1 ? plants[currentIndex + 1] : null;

  const backTo = location.state?.fromCategory || "/categories";

  const goPrev = () => {
    if (!prevPlant) return;
    navigate(`/plant/${prevPlant.plantId}`, {
      replace: true,
      state: { fromCategory: backTo },
    });
  };

  const goNext = () => {
    if (!nextPlant) return;
    navigate(`/plant/${nextPlant.plantId}`, {
      replace: true,
      state: { fromCategory: backTo },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          to={backTo}
          className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none"
        >
          <IoArrowBack />
          Back
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={!prevPlant}
            className="btn btn-sm btn-outline"
          >
            <GrFormPreviousLink />
            Prev
          </button>

          <div className="text-sm text-gray-600 px-2">
            {currentIndex + 1} / {plants.length}
          </div>

          <button
            onClick={goNext}
            disabled={!nextPlant}
            className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none"
          >
            Next <GrFormNextLink />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={plant.image}
          alt={plant.plantName}
          className="w-full h-80 md:h-full object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-3xl font-bold">{plant.plantName}</h1>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="badge badge-outline inline-flex items-center gap-1">
              <FaStar className="text-yellow-500" /> {plant.rating}
            </span>
            <span className="badge badge-outline">Category: {plant.category}</span>
            <span className="badge badge-outline">Care: {plant.careLevel}</span>
            <span className="badge badge-outline">Stock: {plant.availableStock}</span>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-100">
            <p className="text-gray-700">{plant.description}</p>

            <div className="mt-4 text-sm text-gray-600">
              Provider: <span className="font-medium">{plant.providerName}</span>
            </div>

            <div className="text-gray-700 mt-4">Price</div>
            <div className="text-3xl font-extrabold text-green-700">
              ${plant.price}
            </div>

            <button className="btn w-full mt-4 bg-green-600 hover:bg-green-700 text-white border-none">
              Buy / Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
