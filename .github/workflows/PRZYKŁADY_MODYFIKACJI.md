# 📝 Przykłady Modyfikacji

## 1. Dodanie nowego wzorca wykrywania

### Scenariusz: Chcesz wykrywać frazy "nikt mnie nie rozumie"

**Plik:** `src/analyzer/codeAnalyzer.ts`

**Przed:**
```typescript
{
  code: 'IO1',
  name: 'IO_LONELY',
  patterns: [
    /czuj[ęe]\s+si[ęe]\s+samotn(ie|y|a)/i,
    /jestem\s+samotn(y|a)/i,
  ],
  negativePatterns: [
    /nie\s+czuj[ęe]\s+si[ęe]\s+samotn/i,
  ],
  confidence: 'high'
}
```

**Po:**
```typescript
{
  code: 'IO1',
  name: 'IO_LONELY',
  patterns: [
    /czuj[ęe]\s+si[ęe]\s+samotn(ie|y|a)/i,
    /jestem\s+samotn(y|a)/i,
    /nikt\s+mnie\s+nie\s+rozumie/i,  // ← NOWY WZORZEC
  ],
  negativePatterns: [
    /nie\s+czuj[ęe]\s+si[ęe]\s+samotn/i,
  ],
  confidence: 'high'
}
```

---

## 2. Dodanie całkiem nowego kodu

### Scenariusz: Chcesz wykrywać kod "CO" (Community Others) - wsparcie wspólnotowe

**Plik:** `src/analyzer/codeAnalyzer.ts`

**W sekcji `CODE_PATTERNS` dodaj:**
```typescript
{
  code: 'CO1',
  name: 'CO_SUPPORT',
  description: 'Wsparcie społeczności/grupy',
  patterns: [
    /w\s+moim\s+ko[śs]ciele/i,
    /w\s+grup(ie|a)/i,
    /spotka(my|li[śs]my)\s+si[ęe]\s+regularnie/i,
    /moja\s+wsp[óo]lnota/i,
  ],
  negativePatterns: [],
  confidence: 'high',
  direction: 'protective', // lub 'risk'
  category: 'CO'
}
```

**Plik:** `src/analyzer/codeAnalyzer.ts` (w interfejsie `CodeMatch`)

**Zmień:**
```typescript
export type CodeType = 'IO1' | 'IO2' | 'SO1' | 'SO2';
```

**Na:**
```typescript
export type CodeType = 'IO1' | 'IO2' | 'SO1' | 'SO2' | 'CO1';
```

**Plik:** `src/components/AnalysisView.tsx` (dodaj kolor dla CO1)

**W funkcji `getCodeColor` dodaj:**
```typescript
case 'CO1':
  return 'bg-purple-100 border-purple-300 text-purple-900';
```

---

## 3. Zmiana koloru podświetleń

### Scenariusz: Chcesz, żeby IO1 był na czerwono zamiast pomarańczowo

**Plik:** `src/components/TranscriptView.tsx`

**Znajdź funkcję `getCodeColor` i zmień:**

**Przed:**
```typescript
const getCodeColor = (code: CodeType): string => {
  switch (code) {
    case 'IO1':
      return 'bg-orange-200';
    // ...
  }
};
```

**Po:**
```typescript
const getCodeColor = (code: CodeType): string => {
  switch (code) {
    case 'IO1':
      return 'bg-red-200';  // ← zmieniono kolor
    // ...
  }
};
```

**Dostępne kolory Tailwind:**
- `bg-red-200` (czerwony)
- `bg-blue-200` (niebieski)
- `bg-green-200` (zielony)
- `bg-yellow-200` (żółty)
- `bg-purple-200` (fioletowy)
- `bg-pink-200` (różowy)
- `bg-indigo-200` (indygo)
- `bg-teal-200` (turkusowy)

---

## 4. Dodanie nowej transkrypcji

### Scenariusz: Masz trzecie nagranie (Recording 3)

**Plik:** `src/data/transcripts.ts`

**Dodaj na końcu pliku:**
```typescript
export const TRANSCRIPT_P1_N3 = `
00:00:05 Prelegent 1: Tutaj jest nowa transkrypcja...
00:00:15 Prelegent 1: Czuję się bardzo samotnie ostatnio.
00:01:20 Prelegent 1: Ale mam przyjaciół do których mogę zadzwonić.
`;

export const TRANSCRIPT_P2_N3 = `
00:00:10 Prelegent 2: Moja część transkrypcji...
00:00:30 Prelegent 2: Nie mam do kogo się zwrócić w trudnych chwilach.
`;
```

**Następnie dodaj do obiektu `TRANSCRIPTS`:**
```typescript
export const TRANSCRIPTS = {
  'P1_N1': { speaker: 'P1', recording: 'N1', text: TRANSCRIPT_P1_N1 },
  'P2_N1': { speaker: 'P2', recording: 'N1', text: TRANSCRIPT_P2_N1 },
  'P1_N2': { speaker: 'P1', recording: 'N2', text: TRANSCRIPT_P1_N2 },
  'P2_N2': { speaker: 'P2', recording: 'N2', text: TRANSCRIPT_P2_N2 },
  'P1_N3': { speaker: 'P1', recording: 'N3', text: TRANSCRIPT_P1_N3 },  // ← NOWE
  'P2_N3': { speaker: 'P2', recording: 'N3', text: TRANSCRIPT_P2_N3 },  // ← NOWE
};
```

---

## 5. Wyłączenie filtrowania "story-reading"

### Scenariusz: Chcesz analizować WSZYSTKO, włącznie z czytaniem historii

**Plik:** `src/analyzer/codeAnalyzer.ts`

**Znajdź funkcję `isStoryReading` i zmień:**

**Przed:**
```typescript
function isStoryReading(line: string): boolean {
  const storyIndicators = [
    /w mieszkaniu pachniało/i,
    /siedziała na kanapie/i,
    // ... etc
  ];
  
  return storyIndicators.some(pattern => pattern.test(line));
}
```

**Po:**
```typescript
function isStoryReading(line: string): boolean {
  return false;  // ← zawsze zwraca false = nigdy nie filtruj
}
```

---

## 6. Zmiana poziomu pewności wzorca

### Scenariusz: Wzorzec "nie ma do kogo" jest dla Ciebie mniej pewny

**Plik:** `src/analyzer/codeAnalyzer.ts`

**Przed:**
```typescript
{
  code: 'SO2',
  name: 'SO_NOTURN',
  patterns: [
    /nie\s+ma\s+do\s+kogo/i,
  ],
  confidence: 'high'  // ← wysoka pewność
}
```

**Po:**
```typescript
{
  code: 'SO2',
  name: 'SO_NOTURN',
  patterns: [
    /nie\s+ma\s+do\s+kogo/i,
  ],
  confidence: 'medium'  // ← zmieniono na średnią
}
```

**Dostępne poziomy:** `'high'`, `'medium'`, `'low'`

---

## 7. Dodanie wzorca z kontekstem "NIC" (wypowiedź o postaci)

### Scenariusz: Chcesz WYKLUCZYĆ frazy, gdy mówią o bohaterce historii

**Plik:** `src/analyzer/codeAnalyzer.ts`

**W `negativePatterns` dodaj:**
```typescript
{
  code: 'IO1',
  name: 'IO_LONELY',
  patterns: [
    /czuj[ęe]\s+si[ęe]\s+samotn(ie|y|a)/i,
  ],
  negativePatterns: [
    /nie\s+czuj[ęe]\s+si[ęe]\s+samotn/i,
    /ona\s+czuje\s+się\s+samotnie/i,      // ← mówi o NIEJ
    /bohaterka\s+jest\s+samotna/i,        // ← mówi o BOHATERCE
    /ta\s+kobieta.*samotn/i,              // ← mówi o KOBIECIE
  ],
  confidence: 'high'
}
```

---

## 8. Eksport wyników do CSV (TODO dla programisty)

### Scenariusz: Chcesz mieć przycisk "Eksportuj CSV"

**Plik:** `src/components/AnalysisView.tsx`

**Dodaj funkcję:**
```typescript
const exportToCSV = () => {
  const headers = ['Nagranie', 'Mówca', 'Kod', 'Timestamp', 'Tekst', 'Pewność'];
  const rows = matches.map(m => [
    m.transcriptId,
    m.speaker,
    m.code,
    m.timestamp,
    `"${m.matchedText.replace(/"/g, '""')}"`,
    m.confidence
  ]);
  
  const csv = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'analiza_transkrypcji.csv';
  link.click();
};
```

**Dodaj przycisk w JSX:**
```tsx
<button
  onClick={exportToCSV}
  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
>
  📥 Eksportuj CSV
</button>
```

---

## 9. Zmiana języka interfejsu na angielski

**Pliki do edycji:**
- `src/App.tsx` (zakładki: "Analiza" → "Analysis")
- `src/components/AnalysisView.tsx` (wszystkie teksty)
- `src/components/Sidebar.tsx` (legenda, statystyki)
- `src/components/ComparisonView.tsx` (nagłówki tabeli)

**Przykład w `App.tsx`:**
```tsx
<button onClick={() => setActiveTab('analysis')}>
  Analysis  {/* było: Analiza */}
</button>
```

---

## 10. Zwiększenie rozmiaru kontekstu

### Scenariusz: Chcesz widzieć 3 linie przed i po, zamiast 1

**Plik:** `src/analyzer/codeAnalyzer.ts`

**W funkcji `analyzeTranscript` znajdź:**
```typescript
const contextBefore = i > 0 ? lines[i - 1].text : '';
const contextAfter = i < lines.length - 1 ? lines[i + 1].text : '';
```

**Zmień na:**
```typescript
const contextBefore = [
  i > 2 ? lines[i - 3].text : '',
  i > 1 ? lines[i - 2].text : '',
  i > 0 ? lines[i - 1].text : '',
].filter(Boolean).join(' ');

const contextAfter = [
  i < lines.length - 1 ? lines[i + 1].text : '',
  i < lines.length - 2 ? lines[i + 2].text : '',
  i < lines.length - 3 ? lines[i + 3].text : '',
].filter(Boolean).join(' ');
```

---

## 🔄 Po każdej modyfikacji:

```bash
npm run build
# Następnie otwórz: dist/index.html
```

Lub w trybie deweloperskim (zmiany na żywo):
```bash
npm run dev
# Otwórz: http://localhost:5173
```

---

## ⚠️ Częste błędy

### 1. Zapomniałeś dodać przecinka
```typescript
patterns: [
  /wzorzec1/i
  /wzorzec2/i  // ← BŁĄD! Brak przecinka
]
```

**Poprawnie:**
```typescript
patterns: [
  /wzorzec1/i,  // ← przecinek
  /wzorzec2/i
]
```

### 2. Nie zaktualizowałeś typu TypeScript
Po dodaniu nowego kodu (np. CO1), TypeScript będzie pokazywał błędy.
Pamiętaj o aktualizacji `CodeType` w `src/analyzer/codeAnalyzer.ts`.

### 3. Niepoprawne wyrażenie regularne
```typescript
/nie ma do kogo zagadać/i  // ✅ Działa
/nie ma (do kogo/i          // ❌ Niezamknięty nawias
```

Testuj wyrażenia na: https://regex101.com

---

**Powodzenia w modyfikacjach! 🎨**
