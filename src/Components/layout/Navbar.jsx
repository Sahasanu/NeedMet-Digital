import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Container from "./Container";
import { scrollToSection } from "../../utils/scrollTo";

export default function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const goToSection = (sectionId) => {
        if (location.pathname !== "/") {
            navigate(`/#${sectionId}`);
            return;
        }
        scrollToSection(sectionId);
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

                    <Button
                        variant="ghost"
                        onClick={() => goToSection("contact")}
                        className="bg-green-300 hover:bg-green-400 px-4 py-1 text-lg text-black sm:h-10 sm:px-4 sm:text-sm lg:h-11 lg:px-6 lg:text-base"
                    >
                        Sign In
                    </Button>

                    <Button
                        onClick={() => goToSection("services")}
                        className="h-9 px-3 text-xs hidden sm:block sm:h-10 sm:px-4 sm:text-sm lg:h-11 lg:px-6 lg:text-base"
                    >
                        Get Started
                    </Button>

                </div>

            </Container>
        </header>
    );
}
