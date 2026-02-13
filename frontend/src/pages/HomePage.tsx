import { Link } from "react-router-dom";

const steps = [
    {
        number: "1",
        title: "Upload Documents",
        description: "Drag & drop or click to upload your .txt or .md files. They'll be chunked and indexed automatically.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
        ),
    },
    {
        number: "2",
        title: "Ask Questions",
        description: "Type any question about your documents. The system searches for relevant content automatically.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        number: "3",
        title: "Get Answers with Sources",
        description: "Receive AI-generated answers with citations showing exactly which document and passage helped.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
    },
];

function HomePage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-6 py-16">
            {/* Hero */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                        <rect width="28" height="28" rx="7" fill="#6366f1" />
                        <path d="M7 9h14M7 14h10M7 19h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                    Private Knowledge Q&A
                </h1>
                <p className="text-lg text-slate-500 mb-8">
                    Upload your documents, ask questions, and get answers with source citations — all powered by AI.
                </p>
                <div className="flex gap-3 justify-center">
                    <Link
                        to="/workspace"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/status"
                        className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-medium px-6 py-3 rounded-xl transition-colors"
                    >
                        System Status
                    </Link>
                </div>
            </div>

            {/* Steps */}
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 text-center mb-8">
                    How it works
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="bg-white border border-slate-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                                {step.icon}
                            </div>
                            <div className="text-xs font-bold text-indigo-500 mb-1">STEP {step.number}</div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{step.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-16 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Built with</p>
                <div className="flex gap-4 justify-center flex-wrap text-sm text-slate-500">
                    <span className="bg-slate-100 px-3 py-1 rounded-full">React</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">FastAPI</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">Qdrant</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">OpenAI</span>
                    <span className="bg-slate-100 px-3 py-1 rounded-full">LangChain</span>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
