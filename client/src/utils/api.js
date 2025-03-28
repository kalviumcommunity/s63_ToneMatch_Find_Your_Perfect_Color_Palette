const API_BASE_URL = "http://localhost:3000/api"; // Base API URL

// Entity API functions
export const fetchEntities = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/entities`, {
            credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
            throw new Error("Failed to fetch entities");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching entities:", error);
        return [];
    }
};

export const fetchEntitiesByUser = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/entities/user/${userId}`, {
            credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
            throw new Error("Failed to fetch entities by user");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching entities by user:", error);
        return [];
    }
};

export const createEntity = async (entityData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/entities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(entityData)
        });
        if (!response.ok) {
            throw new Error("Failed to create entity");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating entity:", error);
        throw error;
    }
};

// User API functions
export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        
        // Ensure we're returning valid user objects
        if (Array.isArray(data)) {
            return data.filter(user => 
                user && typeof user === 'object' && user._id && (user.name || user.username)
            );
        }
        
        console.error("Invalid user data format:", data);
        return [];
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }
        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }
        return await response.json();
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
            throw new Error("Logout failed");
        }
        return await response.json();
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

// Seed data functions (for development)
export const seedUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/seed`, {
            method: 'POST',
            credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
            throw new Error("Failed to seed users");
        }
        return await response.json();
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
};

export const seedEntities = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/entities/seed`, {
            method: 'POST',
            credentials: 'include' // Include cookies in the request
        });
        if (!response.ok) {
            throw new Error("Failed to seed entities");
        }
        return await response.json();
    } catch (error) {
        console.error("Error seeding entities:", error);
        throw error;
    }
};
