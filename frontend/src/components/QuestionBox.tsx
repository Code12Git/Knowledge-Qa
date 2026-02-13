import { useState } from "react";

interface QuestionBoxProps {
  onAsk: (question: string) => void;
  isLoading: boolean;
}

function QuestionBox({ onAsk, isLoading }: QuestionBoxProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;
    onAsk(question.trim());
    setQuestion("");
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit}>
      <div className="flex gap-2 bg-white border-2 border-slate-200 rounded-2xl p-1.5 shadow-sm focus-within:border-indigo-500 focus-within:shadow-md transition-all">
        <input
          className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
          type="text"
          placeholder="Ask a question about your documents…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={isLoading}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 flex items-center justify-center transition-colors min-w-12"
          type="submit"
          disabled={!question.trim() || isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M16 2L8 10M16 2l-5 14-3-6-6-3 14-5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">Press Enter to ask</p>
    </form>
  );
}

export default QuestionBox;
