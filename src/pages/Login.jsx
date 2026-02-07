import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config"; 

import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const { signIn, googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const [emailValue, setEmailValue] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.message || "Google login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = emailValue.trim();

    if (!email) {
      toast.error("Please type your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
    } catch (err) {
      const msg = err?.message || "Failed to send reset email";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="text-gray-600 mt-2">
        Welcome back to GreenNest. Please login to continue.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          required
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
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
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-green-700 hover:underline"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>

        <button
          className="btn bg-green-600 hover:bg-green-700 text-white border-none w-full"
          disabled={loading}
          type="submit"
        >
          {loading ? "Logging in..." : "Login"}
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
          New here?{" "}
          <Link className="text-green-700 font-medium" to="/register">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
