import { useEffect, useState, useCallback } from "react";
import { getDocuments, getDocumentContent } from "../api/document";

export interface Doc {
  filename: string;
  size: number;
  uploaded_at: number;
}

interface DocumentListProps {
  refreshTrigger: number;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentList({ refreshTrigger }: DocumentListProps) {
    const [documents, setDocuments] = useState<Doc[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [viewingDoc, setViewingDoc] = useState<{ filename: string; content: string } | null>(null);
    const [viewLoading, setViewLoading] = useState(false);

    const fetchDocuments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getDocuments();
            setDocuments(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load documents");
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments, refreshTrigger]);

    const handleView = async (filename: string) => {
        try {
            setViewLoading(true);
            const data = await getDocumentContent(filename);
            setViewingDoc({ filename: data.filename, content: data.content });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load document");
        } finally {
            setViewLoading(false);
        }
    };

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Documents ({documents.length})
      </h3>

      {loading ? (
        <p className="text-sm text-slate-400 text-center py-6">Loading documents…</p>
      ) : error ? (
        <p className="text-sm text-red-400 text-center py-6">{error}</p>
      ) : documents.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">
          No documents yet. Upload one to begin.
        </p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li
              key={doc.filename}
              className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700 truncate">{doc.filename}</p>
                <p className="text-xs text-slate-400">
                  {formatSize(doc.size)} &middot; {new Date(doc.uploaded_at * 1000).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleView(doc.filename)}
                disabled={viewLoading}
                className="ml-2 p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors shrink-0"
                title="View document"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Document Viewer Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 truncate">{viewingDoc.filename}</h3>
              <button
                onClick={() => setViewingDoc(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <pre className="p-4 overflow-auto flex-1 text-sm text-slate-700 whitespace-pre-wrap font-mono bg-slate-50">
              {viewingDoc.content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentList;
