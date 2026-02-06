import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import useAuth from "../hooks/useAuth";

const navClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? "text-green-700 bg-green-100 underline" : "text-gray-700 hover:text-green-700"
  }`;

export default function Header() {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-green-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold">
            <img src="/public/logo.png" alt="" />
          </div>
          <span className="font-bold text-2xl tracking-wide text-green-700">
            GreenNest
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/categories" className={navClass}>
            Categories
          </NavLink>

          {/* optional quick test link */}
          <NavLink to="/plant/1" className={navClass}>
            Plant Details
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Desktop Profile */}
        {user && (
          <div className="hidden md:flex items-center gap-2">
            <div className="text-sm text-gray-700 font-medium">
              {user.displayName || user.email}
            </div>
            <div className="w-9 h-9 rounded-full overflow-hidden border">
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/2kR7tW6/user-placeholder.png"
                }
                alt="User"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden btn btn-sm btn-ghost"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            <NavLink to="/" end className={navClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className={navClass}
              onClick={closeMenu}
            >
              Categories
            </NavLink>
            <NavLink to="/plant/1" className={navClass} onClick={closeMenu}>
              Plant Details
            </NavLink>

            {!user ? (
              <>
                <NavLink to="/login" className={navClass} onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={navClass}
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none mt-2"
              >
                Logout
              </button>
            )}

            {/* Mobile Profile */}
            {user && (
              <div className="mt-3 flex items-center gap-2 pt-3 border-t">
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/2kR7tW6/user-placeholder.png"
                    }
                    alt="User"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {user.displayName || "User"}
                  </div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
