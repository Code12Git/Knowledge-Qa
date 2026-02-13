import { useState } from "react";
import DocumentUpload from "../components/DocumentUpload";
import DocumentList from "../components/DocumentList";
import QuestionBox from "../components/QuestionBox";
import AnswerCard from "../components/AnswerCard";
import { askQuestion, type ChatResponse } from "../api/chat";
import toast from "react-hot-toast";

function WorkspacePage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [chatData, setChatData] = useState<ChatResponse | null>(null);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatError, setChatError] = useState<string | null>(null);

    const handleUploadSuccess = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleAsk = async (question: string) => {
        try {
            setChatLoading(true);
            setChatError(null);
            setChatData(null);
            const result = await askQuestion(question);
            setChatData(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to get answer";
            setChatError(message);
            toast.error(message);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className="flex flex-1 flex-col lg:flex-row">
            {/* ---- Sidebar ---- */}
            <aside className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto p-5 space-y-6 shrink-0">
                <DocumentUpload onUploadSuccess={handleUploadSuccess} />
                <DocumentList refreshTrigger={refreshTrigger} />
            </aside>

            {/* ---- Main content ---- */}
            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">Ask Your Knowledge Base</h2>
                    <p className="text-slate-500 mt-1 mb-8">
                        Ask any question and get answers sourced from your uploaded documents
                    </p>
                    <QuestionBox onAsk={handleAsk} isLoading={chatLoading} />
                    <AnswerCard data={chatData} isLoading={chatLoading} error={chatError} />
                </div>
            </main>
        </div>
    );
}

export default WorkspacePage;
