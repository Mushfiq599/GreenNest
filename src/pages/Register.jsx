import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";


export default function Register() {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const name = e.target.displayName.value.trim();
    const photoURL = e.target.photoURL.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    const passError = validatePassword(password);
    if (passError) {
      setLoading(false);
      setError(passError);
      toast.error(passError);
      return;
    }

    try {
      await createUser(email, password);
      await updateUserProfile(name, photoURL);
      toast.success("Account created successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      const msg = err?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Signed in with Google!");
      navigate("/", { replace: true });
    } catch (err) {
      const msg = err?.message || "Google signup failed";
      setError(msg);
      toast.error(msg);
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
          name="photoURL"
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

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-12"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>


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
