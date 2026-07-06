import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function HelpCard() {
  const [supportNumber, setSupportNumber] = useState("");

  useEffect(() => {
    async function fetchSupport() {
      try {
        // Try getting a specific document named "whatsappSupport" first
        const docRef = doc(db, "home", "whatsappSupport");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const num = data.number || data.whatsappSupport || data.phone;
          if (num) {
            setSupportNumber(String(num));
            return;
          }
        }

        // Fallback: Query all documents in the "home" collection and look for a whatsappSupport field
        const querySnapshot = await getDocs(collection(db, "home"));
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const num = data.whatsappSupport || data.number || data.phone;
          if (num) {
            setSupportNumber(String(num));
          }
        });
      } catch (error) {
        console.error("Error fetching support number:", error);
      }
    }
    fetchSupport();
  }, []);

  const handleWhatsAppRedirect = () => {
    if (supportNumber) {
      // Clean number of non-digit characters
      const cleaned = supportNumber.replace(/\D/g, "");
      // Add country code if not present (defaulting to 91 if length is 10)
      const finalNumber = cleaned.length === 10 ? `91${cleaned}` : cleaned;
      window.open(`https://wa.me/${finalNumber}`, "_blank", "noopener,noreferrer");
    } else {
      // Fallback number if firebase isn't loaded or doesn't have it
      window.open("https://wa.me/919999999999", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="rounded-3xl shadow-2xl bg-white px-4 py-3">
      <h3 className="font-bold">Need Help?</h3>
      
      <p className="text-sm text-text-secondary">
        Our experts are available 24/7.
      </p>

      <button
        type="button"
        onClick={handleWhatsAppRedirect}
        className="text-sm sm:text-md mt-2 w-full rounded-xl border border-primary py-1.5 text-primary transition hover:bg-primary hover:text-white flex items-center justify-center gap-1.5 font-medium"
      >
        <span className="material-symbols-outlined text-base">chat</span>
        WhatsApp Support
      </button>
    </div>
  );
}