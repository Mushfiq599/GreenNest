import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { plants } from "../data/plants";
import { FaStar, FaSun } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";

export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // supports both "p1" and "1" style URLs
  const currentIndex = plants.findIndex(
    (p) => p.id === id || p.id === `p${id}`
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
  const nextPlant =
    currentIndex < plants.length - 1 ? plants[currentIndex + 1] : null;

  // Where to go back (if user came from category page)
  const backTo =
    location.state?.fromCategory ||
    (plant.categoryId ? `/category/${plant.categoryId}` : "/categories");

  const goPrev = () => {
    if (!prevPlant) return;
    navigate(`/plant/${prevPlant.id}`, {
      replace: true,
      state: { fromCategory: backTo },
    });
  };

  const goNext = () => {
    if (!nextPlant) return;
    navigate(`/plant/${nextPlant.id}`, {
      replace: true,
      state: { fromCategory: backTo },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link to={backTo} className="btn btn-sm btn-outline bg-green-600 hover:bg-green-700 text-white">
        <IoArrowBack />
            Back
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={!prevPlant}
            className="btn btn-sm btn-outline"
          >
            <IoArrowBack />
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

      {/* Details content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-80 md:h-full object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-3xl font-bold">{plant.name}</h1>
          

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="badge badge-outline"><FaStar className="text-yellow-500" /> {plant.rating}</span>
            <span className="badge badge-outline">Care: {plant.careLevel}</span>
            <span className="badge badge-outline"><FaSun className="text-yellow-500" /> {plant.light}</span>
            <span className="badge badge-outline"><IoIosWater className="text-blue-600" /> {plant.water}</span>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-100">
            <p className="mt-2 text-gray-600">{plant.description}</p>
            <div className="text-gray-700 mt-4">Price</div>
            <div className="text-3xl font-extrabold text-green-700">
              ${plant.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
