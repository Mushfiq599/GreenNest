import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-green-50 mt-2">
            <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div>
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold">
                            <img src="/public/logo.png" alt="" />
                        </div>
                        <span className="text-xl font-bold text-green-700">GreenNest</span>
                    </Link>
                    <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                        Discover indoor plants, learn care tips, and build your own green
                        corner with GreenNest. Easy browsing by category and protected plant
                        details.
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-green-50 transition"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-green-50 transition"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-green-50 transition"
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-3">Company</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            <Link className="hover:text-green-700" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-green-700" to="/categories">
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-green-700" to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-green-700" to="/register">
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-3">Useful Link</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>
                            <a className="hover:text-green-700" href="#">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-green-700" href="#">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-green-700" href="#">
                                Support
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-green-700" href="#">
                                About Us
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-3">Useful Link</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <MdEmail className="text-gray-700" />
                            <span>info@greennest.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiPhoneCall className="text-gray-700" />
                            <span>+880 1XXX-XXXXXX</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-4">
                <div className="border-t" />
            </div>
            <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
                © {new Date().getFullYear()} GreenNest. All Rights Reserved.
            </div>
        </footer>
    );
}
