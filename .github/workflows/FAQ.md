# ❓ Najczęściej Zadawane Pytania (FAQ)

## 🚀 Instalacja i Uruchomienie

### P: Jak zainstalować aplikację?
**O:** 
```bash
npm install
npm run build
```
Następnie otwórz `dist/index.html` w przeglądarce.

---

### P: Nie mam zainstalowanego Node.js, co robić?
**O:** Pobierz Node.js ze strony: https://nodejs.org/  
Wybierz wersję LTS (Long Term Support). Po instalacji uruchom ponownie terminal.

---

### P: Dostaję błąd "npm: command not found"
**O:** Node.js nie został poprawnie zainstalowany lub nie jest w PATH.  
**Rozwiązanie:**
1. Zainstaluj ponownie Node.js
2. Uruchom ponownie terminal/komputer
3. Sprawdź: `node --version` i `npm --version`

---

### P: Czy mogę używać aplikacji bez instalowania Node.js?
**O:** Jeśli ktoś już zbudował projekt, możesz po prostu skopiować plik `dist/index.html` i otworzyć go w przeglądarce. Node.js jest potrzebny tylko do BUDOWANIA, nie do URUCHAMIANIA.

---

## 💻 Użytkowanie

### P: Jak działa aplikacja?
**O:** Aplikacja analizuje 4 transkrypcje (2 nagrania × 2 mówców) i automatycznie wykrywa wzorce językowe związane z samotnością (IO) i wsparciem społecznym (SO).

---

### P: Czy mogę analizować własne transkrypcje?
**O:** TAK! Edytuj plik `src/data/transcripts.ts`, zamień treść transkrypcji, zapisz, a następnie uruchom `npm run build`.

---

### P: Jakie formaty transkrypcji są obsługiwane?
**O:** Format timestampów:
```
00:00:05 Prelegent 1: Treść wypowiedzi...
00:01:23 Prelegent 2: Kolejna wypowiedź...
```

Obsługiwane formaty timestampów:
- `00:00:05` (z zerami wiodącymi)
- `0:0:5` (bez zer wiodących)
- `5:23` (tylko minuty:sekundy)

---

### P: Czy aplikacja działa offline?
**O:** TAK! Po zbudowaniu (`npm run build`), plik `dist/index.html` działa całkowicie offline. Nie wysyła żadnych danych do Internetu.

---

### P: Czy mogę otworzyć aplikację na telefonie?
**O:** TAK! Skopiuj `dist/index.html` na telefon i otwórz w dowolnej przeglądarce mobilnej (Chrome, Safari, Firefox).

---

## 🔍 Analiza i Wyniki

### P: Co oznaczają kody IO1, IO2, SO1, SO2?
**O:**
- **IO1** (IO_LONELY) = bezpośrednia deklaracja samotności ("czuję się samotnie")
- **IO2** (IO_HOME_EMPTY) = brak bliskiej osoby w domu/codziennie
- **SO1** (SO_NET) = dostępna sieć wsparcia [OCHRONNE]
- **SO2** (SO_NOTURN) = brak osoby do zwrócenia się / rozmowy

---

### P: Co oznacza "↑IO" i "↓SO"?
**O:**
- **↑IO** = zwiększa ryzyko samotności (im więcej, tym gorzej)
- **↓SO** = ochronne (im więcej, tym lepiej - osoba ma wsparcie)

---

### P: Co to jest "IO Score" i "SO Score"?
**O:**
- **IO Score** = suma IO1 + IO2 (wyższe = większe ryzyko samotności)
- **SO Score** = SO2 - SO1 (wyższe = mniejsze wsparcie społeczne)

---

### P: Dlaczego niektóre dopasowania mają niską pewność?
**O:** Pewność zależy od:
1. **Wysoka** = bezpośrednie frazy ("czuję się samotnie")
2. **Średnia** = pośrednie frazy ("nie ma do kogo zagadać")
3. **Niska** = ogólne frazy ("sam", "nikt")

---

### P: Czy mogę filtrować wyniki?
**O:** TAK! Użyj przycisków filtrów w widoku "Analiza":
- Filtruj po kodzie (IO1/IO2/SO1/SO2)
- Filtruj po pewności (wysoka/średnia/niska)

---

### P: Jak interpretować wykres w widoku "Porównanie"?
**O:** Wykres słupkowy skumulowany pokazuje rozkład kodów dla każdego nagrania. Im wyższy słupek, tym więcej wykrytych kodów.

---

## ⚙️ Edycja i Modyfikacja

### P: Jak dodać własne wzorce wykrywania?
**O:** Edytuj `src/analyzer/codeAnalyzer.ts`, znajdź `CODE_PATTERNS`, dodaj nowy wzorzec regex, zapisz, uruchom `npm run build`. Zobacz: `PRZYKŁADY_MODYFIKACJI.md`

---

### P: Nie znam wyrażeń regularnych (regex), co robić?
**O:** Podstawy:
- `/tekst/i` = znajdź "tekst" (wielkość liter nieważna)
- `/tekst1|tekst2/i` = znajdź "tekst1" LUB "tekst2"
- `/\s+/` = jeden lub więcej białych znaków (spacje)
- `/(y|a)/` = "y" lub "a"

Testuj na: https://regex101.com  
Lub kopiuj istniejące wzorce i modyfikuj.

---

### P: Jak zmienić kolory podświetleń?
**O:** Edytuj `src/components/TranscriptView.tsx`, funkcja `getCodeColor`. Zmień np. `bg-orange-200` na `bg-red-200`. Zobacz: `PRZYKŁADY_MODYFIKACJI.md`

---

### P: Czy mogę dodać własny kod (np. CO1 - Community Others)?
**O:** TAK! Zobacz sekcję "Dodanie całkiem nowego kodu" w pliku `PRZYKŁADY_MODYFIKACJI.md`.

---

### P: Zmiany nie działają po edycji kodu
**O:** Pamiętaj o przebudowaniu:
```bash
npm run build
```
Lub użyj trybu deweloperskiego (zmiany na żywo):
```bash
npm run dev
```

---

## 🐛 Problemy i Błędy

### P: Strona jest pusta po otwarciu dist/index.html
**O:** Sprawdź konsolę przeglądarki (F12). Możliwe przyczyny:
1. Build się nie udał - sprawdź czy nie było błędów podczas `npm run build`
2. Przeglądarka blokuje JavaScript - sprawdź ustawienia bezpieczeństwa

---

### P: Dostaję błąd TypeScript podczas budowania
**O:** Najczęstsze przyczyny:
1. Zapomniałeś przecinka w kodzie
2. Niepoprawne wyrażenie regularne
3. Nie zaktualizowałeś typu `CodeType` po dodaniu nowego kodu

Sprawdź komunikat błędu - pokaże dokładnie linię i problem.

---

### P: Aplikacja działa wolno
**O:** Aplikacja analizuje 4 transkrypcje w czasie rzeczywistym. Jeśli transkrypcje są bardzo długie (>10000 linii), może być zauważalne spowolnienie. Rozwiązanie: podziel transkrypcje na mniejsze fragmenty.

---

### P: Build trwa bardzo długo
**O:** Pierwsze budowanie może trwać 30-60 sekund (instaluje zależności). Kolejne powinny być szybsze (3-5 sekund). Jeśli nadal trwa długo, sprawdź czy dysk nie jest pełny.

---

## 🔒 Prywatność i Bezpieczeństwo

### P: Czy aplikacja wysyła moje dane gdzieś?
**O:** NIE! Aplikacja działa w 100% lokalnie w przeglądarce. Zero połączeń sieciowych. Możesz to zweryfikować w narzędziach deweloperskich (F12 → Network).

---

### P: Czy mogę używać z danymi wrażliwymi?
**O:** TAK! Aplikacja nie komunikuje się z Internetem. Wszystkie dane pozostają na Twoim komputerze.

---

### P: Kto ma dostęp do moich transkrypcji?
**O:** Tylko Ty. Dane są zapisane w pliku HTML na Twoim dysku. Jeśli udostępnisz plik komuś (np. wyślesz `dist/index.html`), ta osoba będzie miała dostęp do danych w pliku.

---

## 📊 Zaawansowane

### P: Jak eksportować wyniki do Excel/CSV?
**O:** Obecnie nie ma wbudowanej funkcji. Możesz:
1. Skopiować dane z widoku "Porównanie" (tabela)
2. Zrobić screenshot
3. Zaimplementować samodzielnie (zobacz `PRZYKŁADY_MODYFIKACJI.md`, sekcja "Eksport do CSV")

---

### P: Czy mogę analizować więcej niż 2 nagrania?
**O:** TAK! Dodaj nowe transkrypcje w `src/data/transcripts.ts` (zobacz `PRZYKŁADY_MODYFIKACJI.md`, sekcja "Dodanie nowej transkrypcji").

---

### P: Jak wyłączyć filtrowanie "story-reading"?
**O:** Edytuj `src/analyzer/codeAnalyzer.ts`, funkcja `isStoryReading`, zmień na `return false;`. Zobacz: `PRZYKŁADY_MODYFIKACJI.md`.

---

### P: Czy mogę zmienić język interfejsu?
**O:** TAK, ale wymaga edycji wielu plików. Zobacz `PRZYKŁADY_MODYFIKACJI.md`, sekcja "Zmiana języka".

---

### P: Jak zwiększyć kontekst wypowiedzi (więcej linii przed/po)?
**O:** Edytuj `src/analyzer/codeAnalyzer.ts`, funkcja `analyzeTranscript`. Zobacz: `PRZYKŁADY_MODYFIKACJI.md`, sekcja "Zwiększenie rozmiaru kontekstu".

---

## 🛠️ Komendy npm

### P: Co robi `npm install`?
**O:** Pobiera wszystkie zależności (biblioteki) potrzebne do zbudowania aplikacji. Uruchom tylko raz (lub po dodaniu nowych pakietów).

---

### P: Co robi `npm run dev`?
**O:** Uruchamia serwer deweloperski z hot-reload (zmiany w kodzie automatycznie odświeżają przeglądarkę). Otwórz `http://localhost:5173`.

---

### P: Co robi `npm run build`?
**O:** Buduje wersję produkcyjną aplikacji. Tworzy plik `dist/index.html` gotowy do użycia offline.

---

### P: Co robi `npm run preview`?
**O:** Uruchamia lokalny serwer dla wersji produkcyjnej (po `npm run build`). Podgląd tego, co będzie w `dist/index.html`.

---

## 📱 Kompatybilność

### P: Na jakich przeglądarkach działa?
**O:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Przeglądarki mobilne (Chrome Mobile, Safari iOS)

---

### P: Czy działa na Windows/Mac/Linux?
**O:** TAK! Działa na wszystkich systemach operacyjnych. Wymaga tylko przeglądarki.

---

### P: Jakie są wymagania sprzętowe?
**O:**
- **Minimalne:** 512 MB RAM, dowolny procesor
- **Zalecane:** 1 GB RAM, dowolny procesor z ostatnich 10 lat

---

## 🆘 Dalsze wsparcie

### P: Gdzie znajdę więcej informacji?
**O:**
- `README.md` - pełna dokumentacja
- `INSTRUKCJA_OFFLINE.md` - szczegółowa instrukcja offline
- `PRZYKŁADY_MODYFIKACJI.md` - jak modyfikować kod
- `QUICK_START.txt` - szybki start

---

### P: Kod źródłowy jest w GitHub?
**O:** Obecnie aplikacja jest lokalna. Możesz ją jednak umieścić w własnym repozytorium GitHub.

---

### P: Czy mogę używać komercyjnie?
**O:** Licencja MIT - możesz używać zarówno do celów badawczych, jak i komercyjnych. Zobacz plik LICENSE (jeśli istnieje).

---

**Nie znalazłeś odpowiedzi? Sprawdź kod źródłowy - zawiera szczegółowe komentarze!** 📖
