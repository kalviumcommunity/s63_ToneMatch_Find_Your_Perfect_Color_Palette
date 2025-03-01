const API_URL = "http://localhost:3000/api/entities"; // Update with your backend endpoint

export const fetchEntities = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching entities:", error);
        return [];
    }
};
