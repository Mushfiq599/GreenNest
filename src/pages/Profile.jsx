import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth"; // adjust if your hook path is different

export default function Profile() {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-2 text-gray-600">Please login to view your profile.</p>
      </div>
    );
  }

  const handleUpdate = async () => {
    if (!displayName.trim() && !photoURL.trim()) {
      toast.error("Please enter a name or photo URL to update.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile(user, {
        displayName: displayName.trim() || user.displayName,
        photoURL: photoURL.trim() || user.photoURL,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="mt-2 text-gray-600">Manage your account information.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left card: user info */}
        <div className="card bg-base-100 shadow">
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/2kR2z8S/user-placeholder.png"
                  }
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <h2 className="mt-3 text-xl font-bold">
              {user.displayName || "No Name"}
            </h2>
            <p className="text-gray-600">{user.email}</p>

            <div className="mt-3">
              <span className="badge badge-outline">Logged In</span>
            </div>
          </div>
        </div>

        {/* Right card: update form */}
        <div className="card bg-base-100 shadow md:col-span-2">
          <div className="card-body">
            <h3 className="text-xl font-bold">Update Profile</h3>
            <p className="text-sm text-gray-600">
              Update your display name and photo URL.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered w-full"
                  placeholder="https://..."
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={loading}
                className="btn bg-green-600 hover:bg-green-700 text-white border-none w-full"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
