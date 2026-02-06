import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const name = e.target.name.value.trim();
    const photo = e.target.photo.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (password.length < 6) {
      setLoading(false);
      return setError("Password must be at least 6 characters.");
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await googleSignIn();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Register</h1>
      <p className="text-gray-600 mt-2">
        Create your GreenNest account in seconds.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          name="displayName"
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />

        <input
          name="photo"
          type="url"
          placeholder="Photo URL"
          className="input input-bordered w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          required
        />

        {error && (
          <div className="alert alert-error">
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          className="btn bg-green-600 hover:bg-green-700 text-white border-none w-full"
          disabled={loading}
          type="submit"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="btn btn-outline w-full"
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="text-green-700 font-medium" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
