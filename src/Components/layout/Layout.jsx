import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
    return (
        <div className="min-h-screen max-w-full mx-auto bg-background-secondary">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
