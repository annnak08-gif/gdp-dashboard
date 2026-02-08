# 🔬 IO/SO Transcript Analyzer — Analizator Transkrypcji

Automatyczna analiza transkrypcji rozmów w języku polskim pod kątem wykrywania kodów samotności i wsparcia społecznego.

## 🚀 Szybki Start (Offline)

### Windows:
```bash
# 1. Zainstaluj zależności (tylko raz)
npm install

# 2. Zbuduj i otwórz
build-and-open.bat
```

### macOS/Linux:
```bash
# 1. Zainstaluj zależności (tylko raz)
npm install

# 2. Nadaj uprawnienia (tylko raz)
chmod +x build-and-open.sh

# 3. Zbuduj i otwórz
./build-and-open.sh
```

### Ręcznie:
```bash
npm install
npm run build
# Następnie otwórz plik: dist/index.html
```

---

## 📊 Wykrywane Kody

| Kod | Nazwa | Kierunek | Opis |
|-----|-------|----------|------|
| **IO1** | IO_LONELY | ↑IO | Bezpośrednia deklaracja samotności ("czuję się samotnie") |
| **IO2** | IO_HOME_EMPTY | ↑IO | Brak bliskiej osoby w domu/na co dzień |
| **SO1** | SO_NET | ↓SO (ochronne) | Dostępna sieć wsparcia (rodzina, przyjaciele) |
| **SO2** | SO_NOTURN | ↑SO | Brak osoby do zwrócenia się / rozmowy |

---

## 📁 Struktura Projektu

```
├── src/
│   ├── data/
│   │   └── transcripts.ts          # Transkrypcje do analizy
│   ├── analyzer/
│   │   └── codeAnalyzer.ts         # Logika wykrywania kodów
│   ├── components/
│   │   ├── AnalysisView.tsx        # Widok wyników analizy
│   │   ├── TranscriptView.tsx      # Widok transkrypcji z podświetleniami
│   │   ├── ComparisonView.tsx      # Porównanie między nagraniami
│   │   └── Sidebar.tsx             # Panel boczny ze statystykami
│   └── App.tsx                     # Główny komponent aplikacji
├── dist/
│   └── index.html                  # Gotowa aplikacja (po 'npm run build')
├── INSTRUKCJA_OFFLINE.md           # Szczegółowa instrukcja użycia
└── README.md                       # Ten plik
```

---

## 🎯 Funkcje

### 1️⃣ Analiza View
- Karty z wykrytymi kodami
- Timestamp, mówca, dopasowany tekst
- Poziom pewności (wysoki/średni/niski)
- Rozwijany kontekst wypowiedzi

### 2️⃣ Transcript View
- Pełna transkrypcja z kolorowym podświetleniem
- Legenda kodów
- Timestampy

### 3️⃣ Comparison View
- Tabela porównawcza wszystkich 4 nagrań
- Wykres słupkowy skumulowany
- IO Score i SO Score dla każdego nagrania

### 4️⃣ Filtry
- Filtrowanie po typie kodu (IO1/IO2/SO1/SO2)
- Filtrowanie po poziomie pewności
- Liczniki wyników

---

## ⚙️ Jak Edytować

### Zmiana transkrypcji:
1. Otwórz: `src/data/transcripts.ts`
2. Edytuj treść (zachowaj format timestampów)
3. Przebuduj: `npm run build`

### Zmiana reguł wykrywania:
1. Otwórz: `src/analyzer/codeAnalyzer.ts`
2. Znajdź `CODE_PATTERNS`
3. Edytuj wyrażenia regularne
4. Przebuduj: `npm run build`

**Przykład:**
```typescript
{
  code: 'IO1',
  patterns: [
    /czuj[ęe]\s+si[ęe]\s+samotn(ie|y|a)/i,
    /twój nowy wzorzec/i,  // ← dodaj tutaj
  ],
  // ...
}
```

---

## 🛠️ Komendy

| Komenda | Opis |
|---------|------|
| `npm install` | Instalacja zależności (tylko raz) |
| `npm run dev` | Uruchomienie serwera deweloperskiego |
| `npm run build` | Budowanie projektu (→ `dist/index.html`) |
| `npm run preview` | Podgląd wersji produkcyjnej |

---

## 💾 Użycie Offline

Po wykonaniu `npm run build`, plik `dist/index.html` jest **całkowicie samodzielny**:

✅ Cały CSS i JavaScript w jednym pliku  
✅ Nie wymaga serwera  
✅ Nie wymaga Internetu  
✅ Działa w każdej przeglądarce  
✅ Można skopiować gdziekolwiek  

**Zobacz:** `INSTRUKCJA_OFFLINE.md` dla szczegółów.

---

## 📋 Wymagania

### Do uruchomienia gotowego pliku:
- Przeglądarka: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Do budowania:
- Node.js 18.0.0+
- npm 9.0.0+

---

## 🔒 Prywatność

❌ Brak połączeń sieciowych  
❌ Brak wysyłania danych  
❌ Brak śledzenia  
✅ Wszystko działa lokalnie w przeglądarce  

---

## 📄 Licencja

MIT

---

## 👤 Autor

Aplikacja stworzona do automatycznej analizy transkrypcji wywiadów badawczych.

---

## 🆘 Pomoc

Problemy? Zobacz:
- `INSTRUKCJA_OFFLINE.md` — szczegółowe instrukcje
- Sekcja FAQ w instrukcji
- Kod źródłowy zawiera komentarze

---

**Miłej analizy! 📊✨**
