import { useRef, useState } from "react";
import { uploadDocument } from "../api/document";
import { toast } from "react-hot-toast"

interface DocumentUploadProps {
  onUploadSuccess: () => void;
}

function DocumentUpload({ onUploadSuccess }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

    const handleUpload = async (file: File) => {
        try {
            const res = await uploadDocument(file);
            if (res?.success) {
                toast.success(res.message);
                onUploadSuccess();
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
            await handleUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            await handleUpload(file);
        }
    };

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Upload Document
      </h3>

      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragging
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          onChange={handleFileChange}
          type="file"
          accept=".txt,.md,.text"
          hidden
        />

        <svg className="mx-auto mb-3" width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path
            d="M18 6v18M12 14l6-6 6 6"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 24v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <p className="text-sm text-slate-500">
          <span className="text-indigo-600 font-medium">Click to upload</span> or drag & drop
        </p>
        <p className="text-xs text-slate-400 mt-1">.txt .md files</p>
      </div>
    </div>
  );
}

export default DocumentUpload;
