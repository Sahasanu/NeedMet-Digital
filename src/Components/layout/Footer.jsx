import "../style/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">

        <div className="footer-bottom">

          <p className="footer-copyright">
            © 2026 NeedMet. All rights reserved.
          </p>

          <div className="footer-socials">

            <a href="https://www.facebook.com/needmet" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a href="https://www.instagram.com/needmet.digital/" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="https://www.youtube.com/@needmet" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
              <i className="fa-brands fa-youtube"></i>
            </a>

            <a href="https://www.linkedin.com/company/needmet" target="_blank" rel="noopener noreferrer" className="footer-social-btn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

          </div>

          <div className="footer-bottom-links">
            <a href="https://needmet.in/privacy_policy" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="https://needmet.in/safety" target="_blank" rel="noopener noreferrer">Safety</a>
            <a href="https://needmet.in/terms_service" target="_blank" rel="noopener noreferrer">Terms</a>
            <a href="https://needmet.in/community_guidelines" target="_blank" rel="noopener noreferrer">Guidelines</a>
          </div>

        </div>

      </div>
    </footer>
  );
}