import { useEffect, useState } from "react";
import { getHealth, type HealthData } from "../api/health";
import { Link } from "react-router-dom";

function StatusDot({ status }: { status: string }) {
    const color = status === "healthy" ? "bg-green-500" : "bg-red-500";
    return <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />;
}

function StatusPage() {
    const [health, setHealth] = useState<HealthData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHealth = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getHealth();
            setHealth(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Health check failed");
            setHealth(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealth();
    }, []);

    const services: { name: string; details: string; status: string; error?: string }[] = health
        ? [
              { name: "Backend API", details: "FastAPI server", status: health.backend.status },
              {
                  name: "Vector Database",
                  details: health.database.url || "Qdrant",
                  status: health.database.status,
                  error: health.database.error,
              },
              {
                  name: "LLM Connection",
                  details: `${health.llm.provider || "OpenAI"} — ${health.llm.model || "gpt-4o-mini"}`,
                  status: health.llm.status,
                  error: health.llm.error,
              },
          ]
        : [];

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center px-6 py-16">
            <div className="max-w-xl w-full">
                <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700 mb-6 inline-flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-slate-800 mb-2">System Status</h1>
                <p className="text-slate-500 mb-8">
                    Real-time health of all services powering KnowledgeQA.
                </p>

                {/* Overall status */}
                {loading ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center mb-6">
                        <svg className="animate-spin mx-auto mb-3" width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <p className="text-slate-500 text-sm">Checking services…</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <StatusDot status="unhealthy" />
                            <h2 className="text-lg font-semibold text-red-700">System Unavailable</h2>
                        </div>
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                ) : (
                    <>
                        <div
                            className={`rounded-2xl p-6 mb-6 border ${
                                health?.overall === "healthy"
                                    ? "bg-green-50 border-green-200"
                                    : "bg-amber-50 border-amber-200"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <StatusDot status={health?.overall === "healthy" ? "healthy" : "unhealthy"} />
                                <h2
                                    className={`text-lg font-semibold ${
                                        health?.overall === "healthy" ? "text-green-700" : "text-amber-700"
                                    }`}
                                >
                                    {health?.overall === "healthy"
                                        ? "All Systems Operational"
                                        : "Some Services Degraded"}
                                </h2>
                            </div>
                        </div>

                        {/* Individual services */}
                        <div className="space-y-3">
                            {services.map((service) => (
                                <div
                                    key={service.name}
                                    className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">{service.name}</p>
                                        <p className="text-xs text-slate-400">{service.details}</p>
                                        {service.error && (
                                            <p className="text-xs text-red-500 mt-1">{service.error}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <StatusDot status={service.status} />
                                        <span
                                            className={`text-xs font-medium ${
                                                service.status === "healthy" ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {service.status === "healthy" ? "Healthy" : "Unhealthy"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Refresh */}
                        <button
                            onClick={fetchHealth}
                            className="mt-6 w-full bg-white border border-slate-200 hover:border-slate-300 text-slate-600 text-sm font-medium py-2.5 rounded-xl transition-colors"
                        >
                            Refresh Status
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default StatusPage;
