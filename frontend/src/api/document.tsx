import axios from "axios";
import { fileUploadInstance, publicInstance } from "../helpers/axiosInstance";

const uploadDocument = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fileUploadInstance.post("/documents/upload", formData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const detail = error.response?.data?.detail;
            const message = typeof detail === "string"
                ? detail
                : detail?.message || "Error uploading document";
            throw new Error(message);
        }
        throw new Error("Something went wrong. Please try again.");
    }
}

const getDocuments = async () => {
    try {
        const response = await publicInstance.get("/documents");
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to fetch documents");
        }

        return result.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const detail = error.response?.data?.detail;
            const message = typeof detail === "string"
                ? detail
                : detail?.message || "Error fetching documents";
            throw new Error(message);
        }
        throw error instanceof Error ? error : new Error("Something went wrong. Please try again.");
    }
}

const getDocumentContent = async (filename: string) => {
    try {
        const response = await publicInstance.get(`/documents/${filename}`);
        const result = response.data;

        if (!result?.success) {
            throw new Error(result?.message || "Failed to fetch document content");
        }

        return result.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const detail = error.response?.data?.detail;
            const message = typeof detail === "string"
                ? detail
                : detail?.message || "Error fetching document content";
            throw new Error(message);
        }
        throw error instanceof Error ? error : new Error("Something went wrong. Please try again.");
    }
}

export { uploadDocument, getDocuments, getDocumentContent }