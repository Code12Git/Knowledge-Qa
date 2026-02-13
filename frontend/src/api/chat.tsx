import axios from "axios";
import { publicInstance } from "../helpers/axiosInstance";

export interface Source {
    content: string;
    source: string;
    score: number;
}

export interface ChatResponse {
    answer: string;
    sources: Source[];
}

const askQuestion = async (question: string): Promise<ChatResponse> => {
    try {
        const response = await publicInstance.post("/chat/ask", { question });
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to get answer");
        }

        return result.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const detail = error.response?.data?.detail;
            const message = typeof detail === "string"
                ? detail
                : detail?.message || "Error getting answer";
            throw new Error(message);
        }
        throw error instanceof Error ? error : new Error("Something went wrong. Please try again.");
    }
};

export { askQuestion };
