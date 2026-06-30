import Container from "./Container";

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Privacy Policy", href: "/#contact" },
  { label: "Terms of Service", href: "/#contact" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-36 bg-white pb-8 pt-6 w-full border-t border-[#bcc9c6]/20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 text-center lg:text-left">
          
          {/* Brand Info */}
          <div className="max-w-md space-y-2">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              NeedMet Digital
            </h2>
            <p className="text-sm leading-relaxed text-text-secondary sm:text-base">
              Helping businesses conquer the digital landscape since 2025.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
            {LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-text-secondary transition hover:text-primary whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Copyright Stamp */}
          <div className="flex items-center justify-center lg:justify-end shrink-0">
            <p className="text-sm text-text-secondary">
              &copy; {date} NeedMet Digital. All rights reserved.
            </p>
          </div>

        </div>
      </Container>
    </footer>
  );
}