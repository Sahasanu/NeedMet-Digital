import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

/**
 * Fetches a service by ID and its corresponding pricing plans.
 * Merges the generic plan details with the service-specific pricing.
 * 
 * @param {string} serviceId - The ID of the service document to fetch
 * @returns {Promise<{ service: any, plans: any[] }>} Object containing the service and sorted array of merged plans
 */
export const fetchServiceWithPlans = async (serviceId) => {
    try {
        // 1. Fetch the service document by its ID
        const serviceRef = doc(db, "services", String(serviceId));
        const serviceSnap = await getDoc(serviceRef);

        if (!serviceSnap.exists()) {
            throw new Error(`Service with ID ${serviceId} not found.`);
        }

        const serviceData = { id: serviceSnap.id, ...serviceSnap.data() };
        
        // 2. Fetch all pricing links for this service from the "servicePlans" collection
        const servicePlansQuery = query(
            collection(db, "servicePlans"),
            where("serviceId", "==", String(serviceId))
        );
        const servicePlansSnap = await getDocs(servicePlansQuery);
        
        const pricingMap = {};
        servicePlansSnap.forEach((doc) => {
            const data = doc.data();
            if (data.active !== false) { // only include active plans
                pricingMap[data.planId] = {
                    price: data.price,
                    discount: data.discount || 0
                };
            }
        });

        // 3. Fetch all plan documents from the "plans" collection
        const plansQuerySnap = await getDocs(collection(db, "plans"));
        const mergedPlans = [];

        plansQuerySnap.forEach((planDoc) => {
            const planData = { id: planDoc.id, ...planDoc.data() };

            // 4. Merge each plan with its corresponding pricing from servicePlans
            // Skip plans that don't have pricing linked for this service
            if (pricingMap[planDoc.id]) {
                const planPricing = pricingMap[planDoc.id];
                
                mergedPlans.push({
                    ...planData,
                    price: planPricing.price,
                    discount: planPricing.discount
                });
            }
        });

        // 5. Sort the merged plans by months in ascending order
        mergedPlans.sort((a, b) => a.months - b.months);

        return {
            service: serviceData,
            plans: mergedPlans
        };

    } catch (error) {
        console.error("Error in fetchServiceWithPlans:", error);
        throw error;
    }
};
