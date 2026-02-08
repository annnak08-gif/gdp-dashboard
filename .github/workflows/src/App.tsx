import { useState, useMemo } from "react";
import { allTranscripts, type Transcript } from "./data/transcripts";
import {
  analyzeTranscript,
  computeSummary,
  type CodeMatch,
  type CodeType,
  type AnalysisSummary,
  CODE_COLORS,
  CODE_INFO,
} from "./analyzer/codeAnalyzer";

// ─── Summary Card ───
function SummaryCard({
  summary,
  label,
}: {
  summary: AnalysisSummary;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider">
        {label}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <StatBox
          label="IO1 · Samotność"
          value={summary.io1Count}
          color="text-red-600"
          bg="bg-red-50"
        />
        <StatBox
          label="IO2 · Brak bliskości"
          value={summary.io2Count}
          color="text-orange-600"
          bg="bg-orange-50"
        />
        <StatBox
          label="SO1 · Sieć wsparcia"
          value={summary.so1Count}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatBox
          label="SO2 · Brak rozmówcy"
          value={summary.so2Count}
          color="text-purple-600"
          bg="bg-purple-50"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <MiniStat
          label="Wysoka"
          value={summary.highConfidence}
          dot="bg-green-400"
        />
        <MiniStat
          label="Średnia"
          value={summary.mediumConfidence}
          dot="bg-yellow-400"
        />
        <MiniStat
          label="Niska"
          value={summary.lowConfidence}
          dot="bg-gray-400"
        />
      </div>
      <div className="mt-4 flex gap-3">
        <div className="flex-1 rounded-lg bg-red-50 p-3 text-center">
          <div className="text-xs text-red-500 font-medium">IO Score</div>
          <div className="text-lg font-bold text-red-700">
            {summary.ioScore}
          </div>
          <div className="text-[10px] text-red-400">
            ↑ = więcej samotności
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-emerald-50 p-3 text-center">
          <div className="text-xs text-emerald-500 font-medium">
            SO Score
          </div>
          <div className="text-lg font-bold text-emerald-700">
            {summary.soScore > 0 ? "+" : ""}
            {summary.soScore}
          </div>
          <div className="text-[10px] text-emerald-400">
            + = sieć wsparcia
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  return (
    <div className={`rounded-lg ${bg} p-3`}>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  dot,
}: {
  label: string;
  value: number;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500">
      <span className={`inline-block h-2 w-2 rounded-full ${dot}`} />
      <span>
        {label}: <span className="font-semibold text-slate-700">{value}</span>
      </span>
    </div>
  );
}

// ─── Match Card ───
function MatchCard({
  match,
  index,
}: {
  match: CodeMatch;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const colors = CODE_COLORS[match.code];
  const info = CODE_INFO[match.code];
  const confColor =
    match.confidence === "high"
      ? "bg-green-100 text-green-700"
      : match.confidence === "medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-500";

  return (
    <div
      className={`rounded-xl border ${colors.border} ${colors.bg} p-4 transition-all hover:shadow-md cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-xs font-mono text-slate-400">
              #{index + 1}
            </span>
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${colors.badge}`}
            >
              {match.code} · {match.label}
            </span>
            <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${confColor}`}>
              {match.confidence === "high"
                ? "● WYSOKA"
                : match.confidence === "medium"
                ? "◐ ŚREDNIA"
                : "○ NISKA"}
            </span>
            <span className="text-[10px] text-slate-400">
              {match.direction}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <span className="font-mono bg-slate-100 rounded px-1.5 py-0.5">
              {match.line.timestamp}
            </span>
            <span className="font-medium">{match.line.speaker}</span>
          </div>

          <p className={`text-sm ${colors.text} leading-relaxed`}>
            „{match.line.text}"
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            {match.matchedPatterns.map((p, i) => (
              <span
                key={i}
                className="inline-block rounded-full bg-white/70 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500"
              >
                🔍 {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 border-t border-slate-200/50 pt-3">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Kontekst (linie sąsiednie)
          </div>
          <pre className="text-xs text-slate-600 whitespace-pre-wrap bg-white/50 rounded-lg p-3 font-mono leading-relaxed">
            {match.context}
          </pre>
          <div className="mt-2 text-[10px] text-slate-400">
            <strong>Kategoria:</strong> {info.category} ·{" "}
            <strong>Kierunek:</strong> {info.directionLabel}
          </div>
          <div className="mt-1 text-[10px] text-slate-400">
            <strong>Opis:</strong> {match.description}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Legend ───
function Legend() {
  const codes: CodeType[] = ["IO1", "IO2", "SO1", "SO2"];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Legenda kodów
      </h3>
      <div className="space-y-2">
        {codes.map((code) => {
          const colors = CODE_COLORS[code];
          const info = CODE_INFO[code];
          return (
            <div
              key={code}
              className={`flex items-start gap-2 rounded-lg ${colors.bg} p-2.5 border ${colors.border}`}
            >
              <span
                className={`inline-flex items-center rounded px-1.5 py-0.5 text-xs font-bold ${colors.badge} whitespace-nowrap`}
              >
                {code}
              </span>
              <div className="min-w-0">
                <div className={`text-xs font-semibold ${colors.text}`}>
                  {info.fullName}
                </div>
                <div className="text-[10px] text-slate-500">
                  {info.category} · {info.directionLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Transcript Viewer ───
function TranscriptViewer({
  transcript,
  matches,
}: {
  transcript: Transcript;
  matches: CodeMatch[];
}) {
  const matchByLineIndex = useMemo(() => {
    const map = new Map<number, CodeMatch[]>();
    for (const m of matches) {
      const existing = map.get(m.lineIndex) || [];
      existing.push(m);
      map.set(m.lineIndex, existing);
    }
    return map;
  }, [matches]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-700">
          📄 Pełna transkrypcja z oznaczeniami
        </h3>
      </div>
      <div className="max-h-[500px] overflow-y-auto p-3 space-y-0.5">
        {transcript.lines.map((line, idx) => {
          const lineMatches = matchByLineIndex.get(idx);
          const hasMatch = lineMatches && lineMatches.length > 0;
          const bgColor = hasMatch
            ? CODE_COLORS[lineMatches[0].code].bg
            : "";
          const borderColor = hasMatch
            ? `border-l-4 ${CODE_COLORS[lineMatches[0].code].border.replace("border-", "border-l-")}`
            : "border-l-4 border-l-transparent";

          return (
            <div
              key={idx}
              className={`flex items-start gap-2 rounded px-2.5 py-1.5 text-xs ${bgColor} ${borderColor} transition-colors`}
            >
              <span className="font-mono text-slate-400 whitespace-nowrap mt-0.5 w-16 shrink-0">
                {line.timestamp}
              </span>
              <span className="font-semibold text-slate-500 whitespace-nowrap mt-0.5 w-24 shrink-0">
                {line.speaker}:
              </span>
              <span className="text-slate-700 flex-1">{line.text}</span>
              {hasMatch && (
                <div className="flex gap-1 shrink-0 mt-0.5">
                  {lineMatches.map((m, mi) => (
                    <span
                      key={mi}
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${CODE_COLORS[m.code].badge}`}
                    >
                      {m.code}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Comparison View ───
function ComparisonView({
  results,
}: {
  results: { transcript: Transcript; matches: CodeMatch[]; summary: AnalysisSummary }[];
}) {
  const codes: CodeType[] = ["IO1", "IO2", "SO1", "SO2"];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Porównanie transkrypcji
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 px-3 text-xs text-slate-500 font-medium">
                Transkrypcja
              </th>
              {codes.map((c) => (
                <th key={c} className="text-center py-2 px-3">
                  <span className={`rounded px-1.5 py-0.5 text-xs font-bold ${CODE_COLORS[c].badge}`}>
                    {c}
                  </span>
                </th>
              ))}
              <th className="text-center py-2 px-3 text-xs text-slate-500 font-medium">
                Suma
              </th>
              <th className="text-center py-2 px-3 text-xs text-red-500 font-medium">
                IO
              </th>
              <th className="text-center py-2 px-3 text-xs text-emerald-500 font-medium">
                SO
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.transcript.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-2.5 px-3 text-xs font-medium text-slate-700">
                  {r.transcript.label}
                </td>
                <td className="text-center py-2.5 px-3 font-bold text-red-600">
                  {r.summary.io1Count}
                </td>
                <td className="text-center py-2.5 px-3 font-bold text-orange-600">
                  {r.summary.io2Count}
                </td>
                <td className="text-center py-2.5 px-3 font-bold text-emerald-600">
                  {r.summary.so1Count}
                </td>
                <td className="text-center py-2.5 px-3 font-bold text-purple-600">
                  {r.summary.so2Count}
                </td>
                <td className="text-center py-2.5 px-3 font-bold text-slate-700">
                  {r.summary.totalMatches}
                </td>
                <td className="text-center py-2.5 px-3">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                    {r.summary.ioScore}
                  </span>
                </td>
                <td className="text-center py-2.5 px-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      r.summary.soScore >= 0
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.summary.soScore > 0 ? "+" : ""}
                    {r.summary.soScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main App ───
export function App() {
  const [selectedTranscript, setSelectedTranscript] = useState<string>(
    allTranscripts[0].id
  );
  const [filterCode, setFilterCode] = useState<CodeType | "ALL">("ALL");
  const [filterConfidence, setFilterConfidence] = useState<
    "ALL" | "high" | "medium" | "low"
  >("ALL");
  const [activeTab, setActiveTab] = useState<"analysis" | "transcript" | "compare">("analysis");

  // Analyze all transcripts
  const allResults = useMemo(() => {
    return allTranscripts.map((t) => {
      const matches = analyzeTranscript(t.lines);
      const summary = computeSummary(matches);
      return { transcript: t, matches, summary };
    });
  }, []);

  const currentResult = allResults.find(
    (r) => r.transcript.id === selectedTranscript
  )!;

  const filteredMatches = useMemo(() => {
    let m = currentResult.matches;
    if (filterCode !== "ALL") {
      m = m.filter((match) => match.code === filterCode);
    }
    if (filterConfidence !== "ALL") {
      m = m.filter((match) => match.confidence === filterConfidence);
    }
    return m;
  }, [currentResult.matches, filterCode, filterConfidence]);

  const codeTypes: CodeType[] = ["IO1", "IO2", "SO1", "SO2"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Analiza Transkrypcji IO/SO
              </h1>
              <p className="text-xs text-slate-500">
                Automatyczne rozpoznawanie kodów samotności i wsparcia społecznego
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Controls */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Transcript selector */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Transkrypcja
            </label>
            <select
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              value={selectedTranscript}
              onChange={(e) => setSelectedTranscript(e.target.value)}
            >
              {allTranscripts.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Code filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Filtr kodu
            </label>
            <div className="flex gap-1">
              <button
                className={`rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                  filterCode === "ALL"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
                onClick={() => setFilterCode("ALL")}
              >
                Wszystkie
              </button>
              {codeTypes.map((c) => (
                <button
                  key={c}
                  className={`rounded-lg px-2.5 py-2 text-xs font-bold transition-colors ${
                    filterCode === c
                      ? CODE_COLORS[c].badge
                      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                  onClick={() => setFilterCode(filterCode === c ? "ALL" : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Confidence filter */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Pewność
            </label>
            <div className="flex gap-1">
              {(["ALL", "high", "medium", "low"] as const).map((c) => (
                <button
                  key={c}
                  className={`rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                    filterConfidence === c
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                  onClick={() => setFilterConfidence(c)}
                >
                  {c === "ALL"
                    ? "Wszystkie"
                    : c === "high"
                    ? "● Wysoka"
                    : c === "medium"
                    ? "◐ Średnia"
                    : "○ Niska"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-xl bg-slate-100 p-1 w-fit">
          {(
            [
              { key: "analysis", label: "🔬 Wykryte kody", icon: "" },
              { key: "transcript", label: "📄 Transkrypcja", icon: "" },
              { key: "compare", label: "📊 Porównanie", icon: "" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main content area */}
          <div>
            {activeTab === "analysis" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-semibold text-slate-600">
                    Wykryte dopasowania ({filteredMatches.length})
                  </h2>
                </div>
                {filteredMatches.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="text-sm text-slate-500">
                      Brak dopasowań dla wybranych filtrów
                    </div>
                  </div>
                ) : (
                  filteredMatches.map((m, i) => (
                    <MatchCard key={`${m.code}-${m.lineIndex}`} match={m} index={i} />
                  ))
                )}
              </div>
            )}

            {activeTab === "transcript" && (
              <TranscriptViewer
                transcript={currentResult.transcript}
                matches={currentResult.matches}
              />
            )}

            {activeTab === "compare" && (
              <div className="space-y-6">
                <ComparisonView results={allResults} />

                {/* Visual bars */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                    Wizualizacja rozkładu kodów
                  </h3>
                  <div className="space-y-4">
                    {allResults.map((r) => {
                      const total = Math.max(r.summary.totalMatches, 1);
                      return (
                        <div key={r.transcript.id}>
                          <div className="text-xs font-medium text-slate-600 mb-1.5">
                            {r.transcript.label}
                          </div>
                          <div className="flex h-7 rounded-lg overflow-hidden bg-slate-100">
                            {r.summary.io1Count > 0 && (
                              <div
                                className="bg-red-400 flex items-center justify-center text-[10px] font-bold text-white"
                                style={{
                                  width: `${(r.summary.io1Count / total) * 100}%`,
                                }}
                                title={`IO1: ${r.summary.io1Count}`}
                              >
                                {r.summary.io1Count > 0 && `IO1:${r.summary.io1Count}`}
                              </div>
                            )}
                            {r.summary.io2Count > 0 && (
                              <div
                                className="bg-orange-400 flex items-center justify-center text-[10px] font-bold text-white"
                                style={{
                                  width: `${(r.summary.io2Count / total) * 100}%`,
                                }}
                                title={`IO2: ${r.summary.io2Count}`}
                              >
                                {r.summary.io2Count > 0 && `IO2:${r.summary.io2Count}`}
                              </div>
                            )}
                            {r.summary.so1Count > 0 && (
                              <div
                                className="bg-emerald-400 flex items-center justify-center text-[10px] font-bold text-white"
                                style={{
                                  width: `${(r.summary.so1Count / total) * 100}%`,
                                }}
                                title={`SO1: ${r.summary.so1Count}`}
                              >
                                {r.summary.so1Count > 0 && `SO1:${r.summary.so1Count}`}
                              </div>
                            )}
                            {r.summary.so2Count > 0 && (
                              <div
                                className="bg-purple-400 flex items-center justify-center text-[10px] font-bold text-white"
                                style={{
                                  width: `${(r.summary.so2Count / total) * 100}%`,
                                }}
                                title={`SO2: ${r.summary.so2Count}`}
                              >
                                {r.summary.so2Count > 0 && `SO2:${r.summary.so2Count}`}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <SummaryCard
              summary={currentResult.summary}
              label={currentResult.transcript.label}
            />
            <Legend />

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                O metodzie
              </h3>
              <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-700">IO (Intimate Others)</strong>{" "}
                  — dotyczy braku bliskiej, intymnej relacji. Wyższy wynik IO
                  oznacza więcej wskaźników samotności.
                </p>
                <p>
                  <strong className="text-slate-700">SO (Social Others)</strong>{" "}
                  — opisuje dostępność sieci wsparcia. Dodatni SO = sieć
                  ochronna; ujemny SO = brak rozmówcy.
                </p>
                <p className="text-slate-400 text-[10px] mt-3">
                  Na podstawie: Austin, 1983; Hawkley i in., 2005.
                  Analiza oparta o wzorce leksykalne w języku polskim z
                  uwzględnieniem kontekstu wypowiedzi (o sobie vs. o bohaterce).
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 mt-12 py-4 text-center text-xs text-slate-400">
        Analiza transkrypcji IO/SO · Kodowanie automatyczne · Kliknij kartę aby zobaczyć kontekst
      </footer>
    </div>
  );
}
