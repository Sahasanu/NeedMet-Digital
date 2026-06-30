import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchServices = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "services"));
        const services = [];
        querySnapshot.forEach((doc) => {
            services.push({ id: doc.id, ...doc.data() });
        });
        return services;
    } catch (error) {
        console.error("Error fetching services: ", error);
        return [];
    }
};

export const fetchServiceById = async (serviceId) => {
    try {
        const docRef = doc(db, "services", String(serviceId));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such service!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching service: ", error);
        return null;
    }
};

export const fetchReviews = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviews = [];
        querySnapshot.forEach((doc) => {
            reviews.push({ id: doc.id, ...doc.data() });
        });
        return reviews;
    } catch (error) {
        console.error("Error fetching reviews: ", error);
        return [];
    }
};

export const fetchPlans = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "plans"));
        const plans = [];
        querySnapshot.forEach((doc) => {
            plans.push({ id: doc.id, ...doc.data() });
        });
        return plans;
    } catch (error) {
        console.error("Error fetching plans: ", error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "service-categories"));
        const categories = [];
        querySnapshot.forEach((doc) => {
            categories.push(doc.data().name || doc.id);
        });
        // Remove duplicates and prepend "All"
        const uniqueCategories = [...new Set(categories)];
        return ["All", ...uniqueCategories];
    } catch (error) {
        console.error("Error fetching categories: ", error);
        // Fallback to basic categories if error occurs
        return ["All", "Marketing", "Social Media", "Website", "Branding", "SEO"];
    }
};

// --- ONE-TIME UTILITY FUNCTION ---
// Call this once to upload your static data to Firebase
export const seedDatabase = async (servicesData, reviewsData) => {
    try {
        for (const service of servicesData) {
            // Using the service ID as the document ID
            await setDoc(doc(db, "services", String(service.id)), service);
        }
        for (const review of reviewsData) {
            await setDoc(doc(db, "reviews", String(review.id)), review);
        }
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database: ", error);
    }
};
