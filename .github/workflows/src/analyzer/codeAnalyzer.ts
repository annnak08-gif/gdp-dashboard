import type { TranscriptLine } from "../data/transcripts";

export type CodeType = "IO1" | "IO2" | "SO1" | "SO2";

export interface CodeMatch {
  code: CodeType;
  label: string;
  direction: "↑IO" | "↑SO" | "↓SO";
  description: string;
  line: TranscriptLine;
  lineIndex: number;
  matchedPatterns: string[];
  context: string; // surrounding lines for context
  confidence: "high" | "medium" | "low";
}

interface PatternRule {
  code: CodeType;
  label: string;
  direction: "↑IO" | "↑SO" | "↓SO";
  description: string;
  // Each pattern group: if ALL patterns in a group match, it's a hit
  patternGroups: PatternGroup[];
}

interface PatternGroup {
  // All positive patterns must match
  positive: RegExp[];
  // None of the negative patterns should match (exclusions)
  negative?: RegExp[];
  confidence: "high" | "medium" | "low";
  label: string;
}

// ──── Self-referential markers ────
// We need to detect when the speaker talks about THEMSELVES vs. about the story character
const selfRefPattern = /\b(ja|u mnie|mnie|mam|jestem|czuję|moje|moim|moją|mój|sam ze sobą|przychodzę|wracam|nie mam|chciałbym|chciałabym|czułam|czułem|byłem|byłam|miałem|miałam|potrzebuję)\b/i;

// Pattern to detect reading the story aloud (exclude these)
const storyReadingPattern = /\b(siedziała na kanapie|w mieszkaniu pachniało|za oknem migotały|w telewizji leciał|przeczytajcie|pytania pomocnicze|przełączyła kanał|ciche święta|mandarynkami|zaczęła sprzątać kuchnię|zapaliła jedną|wybiła północ|zawieszony zawieszona|owinięta kocem)\b/i;

const rules: PatternRule[] = [
  // ═══════════════════════════════════════
  // IO1 — IO_LONELY: declarative loneliness about self
  // ═══════════════════════════════════════
  {
    code: "IO1",
    label: "IO_LONELY",
    direction: "↑IO",
    description: "Samotność deklaratywna o sobie — bezpośrednie nazwanie własnej samotności",
    patternGroups: [
      {
        positive: [/czuję\s+się\s+(bardzo\s+)?samotn/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "czuję się samotnie/samotny",
      },
      {
        positive: [/czuję\s+się\s+sam(otnie|otna|otny)?/i],
        negative: [storyReadingPattern, /sam\s+ze\s+sobą\s+fajnie/i],
        confidence: "high",
        label: "czuję się sam/sama",
      },
      {
        positive: [/\bjestem\s+sam(a|y|otny|otna)?\b/i],
        negative: [storyReadingPattern, /sam\s+ze\s+sobą\s+fajnie/i, /sam\s+się\s+dziwię/i],
        confidence: "medium",
        label: "jestem sam/sama/samotny",
      },
      {
        positive: [/czułam\s+się\s+sam(a|otna|otnie)/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "czułam się sama/samotna",
      },
      {
        positive: [/czułem\s+się\s+sam(otnie|otny)?/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "czułem się samotnie",
      },
      {
        positive: [/poczucie\s+samotności/i, selfRefPattern],
        negative: [storyReadingPattern, /jest\s+absolutnie\s+obce/i],
        confidence: "medium",
        label: "poczucie samotności (o sobie)",
      },
      {
        positive: [/\bsamotn(ość|ie|y|a)\b/i, /\b(u mnie|mnie|ja)\b/i],
        negative: [storyReadingPattern, /nie\s+(byłem|byłam)/i, /obce/i, /bohater/i],
        confidence: "low",
        label: "samotność w kontekście osobistym",
      },
      {
        positive: [/\bsmutno\b/i, /\b(mi|mnie)\b/i],
        negative: [storyReadingPattern, /\bjej\b/i],
        confidence: "low",
        label: "smutno (osobiste)",
      },
      {
        positive: [/\bpustk(a|ę|i)\b/i, /\b(ja|sam|ty jesteś)\b/i],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "pustka (osobista)",
      },
    ],
  },

  // ═══════════════════════════════════════
  // IO2 — IO_HOME_EMPTY: lack of closeness at home / daily life
  // ═══════════════════════════════════════
  {
    code: "IO2",
    label: "IO_HOME_EMPTY",
    direction: "↑IO",
    description: "Brak bliskości w domu / na co dzień — brak partnera/bliskiej osoby w codziennym kontekście",
    patternGroups: [
      {
        positive: [/przychodzę\s+do\s+domu/i, /nie\s+ma/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "przychodzę do domu i nie ma...",
      },
      {
        positive: [/nie\s+ma\s+do\s+kogo\s+zagadać/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nie ma do kogo zagadać",
      },
      {
        positive: [/\b(dom|domu|mieszkani)\b/i, /\b(sam|pust|nikogo)\b/i, selfRefPattern],
        negative: [storyReadingPattern, /\bona\b/i],
        confidence: "medium",
        label: "dom + sam/pusty",
      },
      {
        positive: [/duży\s+dom/i, /\bsam\b/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "duży dom a sam",
      },
      {
        positive: [/nie\s+ma\s+(na\s+przykład\s+)?dziewczyn/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "brak partnerki w domu",
      },
      {
        positive: [/\bnie\s+miał(em|am)?\s+partner/i, selfRefPattern],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nie miałem/am partnera",
      },
      {
        positive: [/\bbrak\s+(bliskiej\s+)?osoby\b/i, selfRefPattern],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "brak bliskiej osoby",
      },
      {
        positive: [/nie\s+było\s+tej\s+bliskiej\s+osoby/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nie było bliskiej osoby koło mnie",
      },
      {
        positive: [/\bsinglem\b/i, selfRefPattern],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "singiel (o sobie)",
      },
      {
        positive: [/\bbyłem\s+sam\s+w\s+święta\b/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "byłem sam w święta",
      },
      {
        positive: [/\bsam\s+(przed\s+)?telewizor/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "sam przed telewizorem",
      },
      {
        positive: [/\bchciałbym?\b/i, /\bzwiąz(ek|ku)\b/i],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "chciałby być w związku",
      },
      {
        positive: [/święta\s+(były\s+)?z\s+kimś/i, /wolałab/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "wolałabym święta z kimś",
      },
    ],
  },

  // ═══════════════════════════════════════
  // SO1 — SO_NET: available support network (protective / ↓SO)
  // ═══════════════════════════════════════
  {
    code: "SO1",
    label: "SO_NET",
    direction: "↓SO",
    description: "Dostępna sieć wsparcia — ochronne — mam do kogo pójść/zadzwonić",
    patternGroups: [
      {
        positive: [/zawsze\s+mam\s+gdzie\s+pójść/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "zawsze mam gdzie pójść",
      },
      {
        positive: [/mam\s+się\s+do\s+kogo\s+odezwać/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "mam się do kogo odezwać",
      },
      {
        positive: [/zawsze\s+(byłem|byłam)\s+z\s+kimś/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "zawsze byłem/am z kimś",
      },
      {
        positive: [/\b(praca|znajomi|przyjaciele|relacje)\b/i, /\bmam\b/i],
        negative: [storyReadingPattern, /\bnie\s+mam\b/i],
        confidence: "medium",
        label: "mam pracę/znajomych/przyjaciół",
      },
      {
        positive: [/\bodskocznią\s+(jest|była)\b/i, /\brodzin/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "odskocznią jest rodzina",
      },
      {
        positive: [/nigdy\s+nie\s+(byłem|byłam)\s+sam/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nigdy nie byłem/am sam/a",
      },
      {
        positive: [/\bjestem\s+z\s+\w+\b/i, /\blat\b/i],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "jestem z [partnerem] od X lat",
      },
      {
        positive: [/\bz\s+moją\s+matką\s+gadam\b/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "gadam z matką regularnie",
      },
      {
        positive: [/\bmatką\b/i, /kilka\s+razy\s+(dziennie|w tygodniu)/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "kontakt z matką kilka razy dziennie",
      },
      {
        positive: [/\bpartner/i, /\brazem\b/i],
        negative: [storyReadingPattern, /nie\s+miał/i],
        confidence: "medium",
        label: "partner + razem",
      },
      {
        positive: [/\brodzin(a|ą|ę|y)\b/i, /\b(zawsze|mam|jest|mogę)\b/i, selfRefPattern],
        negative: [storyReadingPattern, /\bnie\s+ma\b/i, /\bobcy\b/i, /\bobraz\b/i],
        confidence: "low",
        label: "rodzina (dostępna, o sobie)",
      },
      {
        positive: [/nigdy\s+nie\s+(byłam|byłem)\s+sam(a|y)?\s+w\s+święta/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nigdy nie byłam/em sam/a w święta",
      },
      {
        positive: [/\bzdzwaniam\s+się\s+z\s+matką\b/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "zdzwaniam się z matką",
      },
      {
        positive: [/\brodzicami\b.*\bwigilię\b/i],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "spędzanie wigilii z rodzicami",
      },
    ],
  },

  // ═══════════════════════════════════════
  // SO2 — SO_NOTURN: no one to turn to / no conversation partner
  // ═══════════════════════════════════════
  {
    code: "SO2",
    label: "SO_NOTURN",
    direction: "↑SO",
    description: "Brak osoby do zwrócenia się / brak rozmówcy — nie mam do kogo, nie ma z kim porozmawiać",
    patternGroups: [
      {
        positive: [/nie\s+ma\s+do\s+kogo\s+zagadać/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nie ma do kogo zagadać",
      },
      {
        positive: [/nie\s+ma\s+do\s+kogo\s+zadzwonić/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nie ma do kogo zadzwonić",
      },
      {
        positive: [/nie\s+ma\s+z\s+kim\s+porozmawiać/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nie ma z kim porozmawiać",
      },
      {
        positive: [/trudne\b.*\bpogadania\s+z\s+kimś/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "trudne pogadanie z kimś",
      },
      {
        positive: [/\bżeby\s+ktoś\s+(cię\s+)?wysłuchał\b/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "żeby ktoś cię wysłuchał",
      },
      {
        positive: [/nikt\s+nie\s+dzwoni/i, selfRefPattern],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "nikt nie dzwoni",
      },
      {
        positive: [/\bpłytk(a|ie|ą)\b/i, /\brozm(owa|owy)\b/i],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "rozmowa płytka/powierzchowna",
      },
      {
        positive: [/nie\s+ma\s+nikogo/i],
        negative: [storyReadingPattern],
        confidence: "medium",
        label: "nie ma nikogo",
      },
      {
        positive: [/przeraża\s+mnie/i, /nikt\s+nie\s+dzwoni/i],
        negative: [storyReadingPattern],
        confidence: "high",
        label: "przeraża mnie że nikt nie dzwoni",
      },
    ],
  },
];

/**
 * Merge consecutive lines from the same speaker for context
 */
function getContext(
  lines: TranscriptLine[],
  index: number,
  range: number = 1
): string {
  const start = Math.max(0, index - range);
  const end = Math.min(lines.length - 1, index + range);
  const contextLines: string[] = [];
  for (let i = start; i <= end; i++) {
    const prefix = i === index ? "►" : " ";
    contextLines.push(
      `${prefix} [${lines[i].timestamp}] ${lines[i].speaker}: ${lines[i].text}`
    );
  }
  return contextLines.join("\n");
}

/**
 * Analyze a single line against all rules
 */
function analyzeLine(
  line: TranscriptLine,
  lineIndex: number,
  allLines: TranscriptLine[]
): CodeMatch[] {
  const matches: CodeMatch[] = [];

  // Skip very short lines (likely backchannels)
  if (line.text.length < 10) return matches;

  // Skip lines that are clearly reading the story
  if (storyReadingPattern.test(line.text)) return matches;

  // Also combine with previous and next line for broader context matching
  const prevLine = lineIndex > 0 ? allLines[lineIndex - 1] : null;
  const nextLine =
    lineIndex < allLines.length - 1 ? allLines[lineIndex + 1] : null;

  // Build extended text for context-aware matching (same speaker only)
  let extendedText = line.text;
  if (prevLine && prevLine.speaker === line.speaker) {
    extendedText = prevLine.text + " " + extendedText;
  }
  if (nextLine && nextLine.speaker === line.speaker) {
    extendedText = extendedText + " " + nextLine.text;
  }

  for (const rule of rules) {
    for (const pg of rule.patternGroups) {
      // Check all positive patterns match
      const allPositiveMatch = pg.positive.every(
        (p) => p.test(line.text) || p.test(extendedText)
      );
      if (!allPositiveMatch) continue;

      // Check no negative patterns match
      if (pg.negative) {
        const anyNegativeMatch = pg.negative.some((p) => p.test(line.text));
        if (anyNegativeMatch) continue;
      }

      // Determine if primary match is on the line itself (higher confidence) or extended
      const directMatch = pg.positive.every((p) => p.test(line.text));

      matches.push({
        code: rule.code,
        label: rule.label,
        direction: rule.direction,
        description: rule.description,
        line,
        lineIndex,
        matchedPatterns: [pg.label],
        context: getContext(allLines, lineIndex),
        confidence: directMatch ? pg.confidence : "low",
      });

      // Only take first matching pattern group per rule per line
      break;
    }
  }

  return matches;
}

/**
 * Deduplicate matches: if the same code appears on consecutive lines
 * from the same speaker, merge them
 */
function deduplicateMatches(matches: CodeMatch[]): CodeMatch[] {
  if (matches.length === 0) return matches;

  const sorted = [...matches].sort(
    (a, b) => a.lineIndex - b.lineIndex || a.code.localeCompare(b.code)
  );

  const result: CodeMatch[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = result[result.length - 1];
    const curr = sorted[i];

    // If same code, same speaker, and within 2 lines — merge
    if (
      curr.code === prev.code &&
      curr.line.speaker === prev.line.speaker &&
      curr.lineIndex - prev.lineIndex <= 2
    ) {
      // Keep the higher-confidence one
      if (
        confidenceValue(curr.confidence) > confidenceValue(prev.confidence)
      ) {
        result[result.length - 1] = curr;
      }
      // Merge patterns
      result[result.length - 1].matchedPatterns = [
        ...new Set([
          ...result[result.length - 1].matchedPatterns,
          ...curr.matchedPatterns,
        ]),
      ];
    } else {
      result.push(curr);
    }
  }

  return result;
}

function confidenceValue(c: "high" | "medium" | "low"): number {
  return c === "high" ? 3 : c === "medium" ? 2 : 1;
}

/**
 * Main analysis function
 */
export function analyzeTranscript(lines: TranscriptLine[]): CodeMatch[] {
  const allMatches: CodeMatch[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineMatches = analyzeLine(lines[i], i, lines);
    allMatches.push(...lineMatches);
  }

  return deduplicateMatches(allMatches);
}

/**
 * Summary statistics
 */
export interface AnalysisSummary {
  totalMatches: number;
  io1Count: number;
  io2Count: number;
  so1Count: number;
  so2Count: number;
  highConfidence: number;
  mediumConfidence: number;
  lowConfidence: number;
  ioScore: number; // higher = more loneliness indicators
  soScore: number; // positive = more support, negative = less
}

export function computeSummary(matches: CodeMatch[]): AnalysisSummary {
  const io1 = matches.filter((m) => m.code === "IO1");
  const io2 = matches.filter((m) => m.code === "IO2");
  const so1 = matches.filter((m) => m.code === "SO1");
  const so2 = matches.filter((m) => m.code === "SO2");

  return {
    totalMatches: matches.length,
    io1Count: io1.length,
    io2Count: io2.length,
    so1Count: so1.length,
    so2Count: so2.length,
    highConfidence: matches.filter((m) => m.confidence === "high").length,
    mediumConfidence: matches.filter((m) => m.confidence === "medium").length,
    lowConfidence: matches.filter((m) => m.confidence === "low").length,
    ioScore: io1.length + io2.length, // ↑IO = more intimate-other loneliness
    soScore: so1.length - so2.length, // positive = net support available
  };
}

export const CODE_COLORS: Record<CodeType, { bg: string; text: string; border: string; badge: string }> = {
  IO1: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200", badge: "bg-red-100 text-red-700" },
  IO2: { bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-200", badge: "bg-orange-100 text-orange-700" },
  SO1: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700" },
  SO2: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200", badge: "bg-purple-100 text-purple-700" },
};

export const CODE_INFO: Record<CodeType, { fullName: string; category: string; directionLabel: string }> = {
  IO1: { fullName: "IO_LONELY — Samotność deklaratywna", category: "IO — Bliskość z innymi", directionLabel: "↑IO (więcej samotności)" },
  IO2: { fullName: "IO_HOME_EMPTY — Brak bliskości w domu", category: "IO — Bliskość z innymi", directionLabel: "↑IO (więcej samotności)" },
  SO1: { fullName: "SO_NET — Dostępna sieć wsparcia", category: "SO — Wsparcie społeczne", directionLabel: "↓SO (ochronne)" },
  SO2: { fullName: "SO_NOTURN — Brak rozmówcy", category: "SO — Wsparcie społeczne", directionLabel: "↑SO (więcej izolacji)" },
};
