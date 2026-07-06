export default function Footer() {
  return (
    <footer className="w-full bg-[#0f5c3e] text-white/65 font-primary py-[22px] px-[35px] max-md:py-[20px] max-md:px-[20px] max-sm:py-[18px] max-sm:px-[16px]">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex justify-between items-center flex-wrap gap-4 max-md:flex-col max-md:justify-center max-md:text-center">

          <p className="text-[13px] text-white/65 m-0 font-primary">
            © 2026 NeedMet. All rights reserved.
          </p>

          <div className="flex items-center gap-4">

            <a href="https://www.facebook.com/needmet" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white text-base transition-colors duration-200">
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a href="https://www.instagram.com/needmet.digital/" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white text-base transition-colors duration-200">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="https://www.youtube.com/@needmet" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white text-base transition-colors duration-200">
              <i className="fa-brands fa-youtube"></i>
            </a>

            <a href="https://www.linkedin.com/company/needmet" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white text-base transition-colors duration-200">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

          </div>

          <div className="flex items-center gap-[18px] max-sm:gap-3.5 max-sm:justify-center flex-wrap">
            <a href="https://needmet.in/privacy_policy" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/65 hover:text-white transition-colors duration-200">Privacy</a>
            <a href="https://needmet.in/safety" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/65 hover:text-white transition-colors duration-200">Safety</a>
            <a href="https://needmet.in/terms_service" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/65 hover:text-white transition-colors duration-200">Terms</a>
            <a href="https://needmet.in/community_guidelines" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/65 hover:text-white transition-colors duration-200">Guidelines</a>
          </div>

        </div>

      </div>
    </footer>
  );
}