import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { plants } from "../data/plants";
import { FaStar } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useState } from "react";
import { toast } from "react-toastify";


export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in name and email.");
      return;
    }
    toast.success("Consultation booked successfully!");
    setForm({ name: "", email: "" });
  };
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
            <div className="mt-6 p-5 rounded-2xl bg-base-100 shadow">
              <h2 className="text-xl font-bold">Book Consultation</h2>
              <p className="text-sm text-gray-600 mt-1">
                Get personalized plant care guidance from our experts.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white border-none w-full">
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
