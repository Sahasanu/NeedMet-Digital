import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../config/firebase";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Redirect to home (or previous page) if already logged in
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved
      },
    });

    window.recaptchaVerifier = verifier;

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");

    // Standardize to Indian +91 format if they just typed 10 digits
    const formattedNumber = phoneNumber.startsWith("+") 
      ? phoneNumber 
      : `+91${phoneNumber}`;

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await confirmationResult.confirm(otp);
      // Success! User is authenticated via AuthContext automatically
      
      // Navigate back to where they came from, or home
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#fafdfb]">
      
      {/* Left Column (Marketing) - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-[#0d3d2e] p-12 xl:p-20 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[#1a8a5a]/20 blur-3xl" />
        <div className="absolute right-10 top-10 h-60 w-60 rounded-full bg-[#22c47a]/10 blur-3xl" />
        
        {/* Top Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-heading tracking-tight">NeedMet</span>
        </div>
        
        {/* Center Content */}
        <div className="max-w-md space-y-6 my-auto">
          <h1 className="text-4xl xl:text-5xl font-bold font-heading leading-tight text-white">
            Connect needs with solutions.
          </h1>
          <p className="text-base xl:text-lg text-white/80 leading-relaxed font-primary">
            A trusted local platform where communities help each other discover services, opportunities and support.
          </p>
          
          <ul className="space-y-4 pt-6 text-sm xl:text-base font-primary">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22c47a] bg-[#1a8a5a]/20 p-1.5 rounded-full text-lg">check</span>
              <span>Verified community members</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22c47a] bg-[#1a8a5a]/20 p-1.5 rounded-full text-lg">check</span>
              <span>Real-time listings & updates</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22c47a] bg-[#1a8a5a]/20 p-1.5 rounded-full text-lg">check</span>
              <span>Secure OTP authentication</span>
            </li>
          </ul>
        </div>
        
        {/* Footer info */}
        <div className="text-xs text-white/40 font-primary">
          © 2026 NeedMet. All rights reserved.
        </div>
      </div>

      {/* Right Column (Login Card) */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Card Header */}
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold tracking-widest text-[#0f5c3e] uppercase font-heading">
              {otpSent ? "STEP 2 OF 2" : "STEP 1 OF 2"}
            </span>
            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 font-heading">
              {otpSent ? "Verification Code" : "Welcome back"}
            </h2>
            <p className="text-sm text-gray-500 font-primary">
              {otpSent 
                ? `Enter the 6-digit OTP sent to +91 ${phoneNumber}` 
                : "Enter your phone number to receive a verification code."}
            </p>
          </div>

          {/* This invisible container is required by Firebase Recaptcha */}
          <div id="recaptcha-container"></div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 font-heading">
                  Mobile Number
                </label>
                <div className="flex rounded-xl shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#0f5c3e]/20 focus-within:border-[#0f5c3e]">
                  <span className="flex items-center bg-gray-50 px-4 text-gray-500 text-sm font-medium border-r border-gray-200">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="block w-full py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:outline-none text-base font-primary"
                    placeholder="9876543210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium font-primary">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || phoneNumber.length !== 10}
                className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-[#0f5c3e] to-[#1a8a5a] py-3.5 px-4 text-sm font-bold text-white shadow-md hover:opacity-95 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider font-heading"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label htmlFor="otp" className="block text-xs font-bold uppercase tracking-wider text-gray-600 font-heading">
                  One-Time Password
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3.5 text-center tracking-widest text-lg font-bold focus:border-[#0f5c3e] focus:outline-none focus:ring-2 focus:ring-[#0f5c3e]/20"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium font-primary">{error}</p>
              )}

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-[#0f5c3e] to-[#1a8a5a] py-3.5 px-4 text-sm font-bold text-white shadow-md hover:opacity-95 focus:outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider font-heading"
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    "Verify & Login"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setError("");
                  }}
                  className="text-sm font-semibold text-[#0f5c3e] hover:text-[#1a8a5a] transition-colors font-heading text-center"
                >
                  Change Phone Number
                </button>
              </div>
            </form>
          )}

          {/* Sign Up Link & Disclaimer */}
          <div className="space-y-6 pt-6 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600 font-primary">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold text-[#0f5c3e] hover:text-[#1a8a5a] transition-colors font-heading">
                Sign up
              </Link>
            </p>
            
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed font-primary">
              By continuing, you agree to our{" "}
              <a href="/terms_service" className="underline hover:text-[#0f5c3e] transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy_policy" className="underline hover:text-[#0f5c3e] transition-colors">
                Privacy Policy
              </a>.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
