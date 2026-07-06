import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import useAuth from "../../hooks/useAuth";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {}
      });
    }
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError("");

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
      const result = await confirmationResult.confirm(otp);
      // Update display name with the full name entered
      if (result.user) {
        await updateProfile(result.user, {
          displayName: fullName.trim()
        });
      }
      
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
      
      {/* Left Column (Signup Card) */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Card Header */}
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold tracking-widest text-[#0f5c3e] uppercase font-heading">
              {otpSent ? "STEP 2 OF 2" : "STEP 1 OF 2"}
            </span>
            <h2 className="text-3xl xl:text-4xl font-bold text-[#0f5c3e] font-heading">
              {otpSent ? "Verification Code" : "Create Account"}
            </h2>
            <p className="text-sm text-gray-500 font-primary">
              {otpSent 
                ? `Enter the 6-digit OTP sent to +91 ${phoneNumber}` 
                : "Join NeedMet and connect with your local community."}
            </p>
          </div>

          {/* Invisible recaptcha container */}
          <div id="recaptcha-container"></div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="mt-8 space-y-6">
              <div className="space-y-4">
                
                {/* Full Name field */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-gray-600 font-heading">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="block w-full rounded-xl border border-gray-200 py-3.5 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f5c3e]/20 focus:border-[#0f5c3e] text-base font-primary"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                {/* Mobile Number field */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 font-heading">
                    Mobile Number
                  </label>
                  <div className="flex rounded-xl shadow-sm border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#0f5c3e]/20 focus-within:border-[#0f5c3e]">
                    <span className="flex items-center bg-gray-50 px-4 text-[#0f5c3e] text-sm font-semibold border-r border-gray-200">
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

              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium font-primary">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || phoneNumber.length !== 10 || !fullName.trim()}
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
                    "Verify & Signup"
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
                  Change Details
                </button>
              </div>
            </form>
          )}

          {/* Log In Link & Disclaimer */}
          <div className="space-y-6 pt-6 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600 font-primary">
              Already have an account?{" "}
              <a href="/login" className="font-bold text-[#0f5c3e] hover:text-[#1a8a5a] transition-colors font-heading">
                Log in
              </a>
            </p>
            
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed font-primary">
              By creating an account, you agree to our{" "}
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

      {/* Right Column (Marketing) - Hidden on Mobile */}
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
          <h1 className="text-4xl xl:text-5xl font-bold font-heading leading-tight text-white tracking-tight">
            Become a part of NeedMet.
          </h1>
          <p className="text-base xl:text-lg text-white/80 leading-relaxed font-primary">
            Discover trusted local services, connect with your community and help others find what they need.
          </p>
          
          <ul className="space-y-4 pt-6 text-sm xl:text-base font-primary">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22c47a] bg-[#1a8a5a]/20 p-1.5 rounded-full text-lg">check</span>
              <span>Find local services nearby</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22c47a] bg-[#1a8a5a]/20 p-1.5 rounded-full text-lg">check</span>
              <span>Trusted reviews & ratings</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#22c47a] bg-[#1a8a5a]/20 p-1.5 rounded-full text-lg">check</span>
              <span>Grow with your community</span>
            </li>
          </ul>
        </div>
        
        {/* Footer info */}
        <div className="text-xs text-white/40 font-primary">
          © 2026 NeedMet. All rights reserved.
        </div>
      </div>

    </div>
  );
}
