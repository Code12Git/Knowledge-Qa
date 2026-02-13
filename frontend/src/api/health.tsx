import axios from "axios";
import { publicInstance } from "../helpers/axiosInstance";

export interface ServiceHealth {
    status: "healthy" | "unhealthy";
    [key: string]: string | undefined;
}

export interface HealthData {
    overall: "healthy" | "degraded";
    backend: ServiceHealth;
    database: ServiceHealth;
    llm: ServiceHealth;
}

const getHealth = async (): Promise<HealthData> => {
    try {
        const response = await publicInstance.get("/health");
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Health check failed");
        }

        return result.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // If backend is completely down
            throw new Error("Backend is not reachable");
        }
        throw error instanceof Error ? error : new Error("Health check failed");
    }
};

export { getHealth };
