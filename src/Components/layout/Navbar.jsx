import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Container from "./Container";
import { scrollToSection } from "../../utils/scrollTo";
import useAuth from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const goToSection = (sectionId) => {
        if (location.pathname !== "/") {
            navigate(`/#${sectionId}`);
            return;
        }
        scrollToSection(sectionId);
    };

    const handleLoginRedirect = () => {
        navigate("/login", { state: { from: location.pathname } });
    };

    const handleLogout = async () => {
        setDropdownOpen(false);
        await signOut(auth);
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 h-16 sm:h-18 lg:h-20 border-b border-border/20 bg-background-secondary/80 backdrop-blur-md">
            <Container className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    className="truncate text-2xl font-bold text-primary sm:text-2xl lg:text-4xl"
                >
                    NeedMet Digital
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                    {currentUser ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Profile Avatar — toggle dropdown */}
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-sm font-semibold hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                                aria-label="Open profile menu"
                            >
                                {currentUser.phoneNumber?.slice(-2) || "U"}
                            </button>

                            {/* Dropdown Panel */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-border/30 bg-white shadow-xl p-4 space-y-4">
                                    {/* User Info */}
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                                            Logged in as
                                        </p>
                                        {currentUser.displayName && (
                                            <p className="text-sm font-semibold text-text truncate">
                                                {currentUser.displayName}
                                            </p>
                                        )}
                                        <p className="text-sm text-text-secondary truncate">
                                            {currentUser.phoneNumber || currentUser.email || "—"}
                                        </p>
                                    </div>

                                    <div className="border-t border-border/30" />

                                    {/* Logout */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-base">logout</span>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            onClick={handleLoginRedirect}
                            className="bg-gradient-to-r from-[#0f5c3e] to-[#1a8a5a] hover:opacity-95 text-white font-bold px-5 py-2 sm:h-10 sm:px-5 sm:text-sm lg:h-11 lg:px-6 lg:text-base rounded-xl transition-all border-0 shadow-sm uppercase tracking-wider"
                        >
                            Login
                        </Button>
                    )}
                </div>

            </Container>
        </header>
    );
}

