import type { ChatResponse } from "../api/chat";

interface AnswerCardProps {
  data: ChatResponse | null;
  isLoading: boolean;
  error: string | null;
}

function AnswerCard({ data, isLoading, error }: AnswerCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
        <svg className="animate-spin mx-auto mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="text-slate-500">Searching documents and generating answer…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
        <p className="text-red-600 font-medium">Something went wrong</p>
        <p className="text-red-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
        <svg className="mx-auto mb-3" width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="24" stroke="#e2e8f0" strokeWidth="2" />
          <path d="M28 18v12M28 36v2" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <p className="text-slate-500">Your answer will appear here</p>
        <span className="text-sm text-slate-400">Upload documents and ask a question to get started</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Answer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h4 className="text-sm font-semibold text-slate-700">Answer</h4>
        </div>
        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{data.answer}</p>
      </div>

      {/* Sources */}
      {data.sources.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Sources ({data.sources.length})
          </h4>
          <ul className="space-y-3">
            {data.sources.map((source, index) => (
              <li key={index} className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {source.source.split("/").pop()}
                  </span>
                  <span className="text-xs text-slate-400">
                    Relevance: {Math.round(source.score * 100)}%
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
                  {source.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnswerCard;
