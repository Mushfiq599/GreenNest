import { Link, NavLink } from "react-router-dom";

const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? "text-green-700 bg-green-50" : "text-gray-700 hover:text-green-700"
    }`;

export default function Header() {
    return (
        <header className="bg-white border-b">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        G
                    </div>
                    <span className="font-semibold tracking-wide text-gray-900">
                        GreenNest
                    </span>
                </Link>

                <nav className="flex items-center gap-2">
                    <NavLink to="/" end className={navClass}>Home</NavLink>
                    <NavLink to="/categories" className={navClass}>Categories</NavLink>
                    <NavLink to="/login" className={navClass}>Login</NavLink>
                    <NavLink to="/register" className={navClass}>Register</NavLink>
                </nav>
            </div>
        </header>
    );
}
