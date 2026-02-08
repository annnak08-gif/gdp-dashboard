# 👣 Przewodnik Krok po Kroku

## 🎯 Cel: Uruchomić aplikację offline na swoim komputerze

---

## KROK 1: Sprawdź czy masz Node.js

### Windows:
1. Naciśnij `Win + R`
2. Wpisz `cmd` i naciśnij Enter
3. W czarnym oknie wpisz: `node --version`
4. Jeśli widzisz wersję (np. `v18.17.0`) → **przejdź do KROKU 3**
5. Jeśli widzisz błąd → **przejdź do KROKU 2**

### Mac:
1. Naciśnij `Cmd + Space`
2. Wpisz `terminal` i naciśnij Enter
3. W oknie terminala wpisz: `node --version`
4. Jeśli widzisz wersję → **przejdź do KROKU 3**
5. Jeśli widzisz błąd → **przejdź do KROKU 2**

### Linux:
1. Otwórz terminal (`Ctrl + Alt + T`)
2. Wpisz: `node --version`
3. Jeśli widzisz wersję → **przejdź do KROKU 3**
4. Jeśli widzisz błąd → **przejdź do KROKU 2**

---

## KROK 2: Zainstaluj Node.js (jeśli nie masz)

### Wszyscy:
1. Otwórz przeglądarkę
2. Wejdź na: **https://nodejs.org/**
3. Kliknij zielony przycisk **"LTS"** (zalecane)
4. Pobierz plik instalacyjny
5. Uruchom pobrany plik
6. Klikaj **"Next"** → **"Next"** → **"Install"**
7. Poczekaj aż się zainstaluje (może trwać 2-5 minut)
8. **WAŻNE:** Uruchom ponownie komputer
9. Sprawdź ponownie KROK 1

---

## KROK 3: Otwórz folder projektu w terminalu

### Windows (metoda 1 - najłatwiejsza):
1. Otwórz folder z projektem w Eksploratorze plików
2. Kliknij w pasek adresu (u góry)
3. Wpisz `cmd` i naciśnij Enter
4. Terminal otworzy się w tym folderze → **przejdź do KROKU 4**

### Windows (metoda 2):
1. Naciśnij `Win + R`
2. Wpisz `cmd` i naciśnij Enter
3. Wpisz `cd ` (cd + spacja)
4. Przeciągnij folder projektu do okna terminala
5. Naciśnij Enter → **przejdź do KROKU 4**

### Mac:
1. Otwórz Finder
2. Znajdź folder projektu
3. Kliknij prawym przyciskiem na folder
4. Trzymaj `Option` i wybierz **"Copy ... as Pathname"**
5. Otwórz Terminal (`Cmd + Space`, wpisz `terminal`)
6. Wpisz `cd ` (cd + spacja)
7. Naciśnij `Cmd + V` (wklej ścieżkę)
8. Naciśnij Enter → **przejdź do KROKU 4**

### Linux:
1. Otwórz folder projektu w menedżerze plików
2. Kliknij prawym w pustym miejscu
3. Wybierz **"Otwórz w terminalu"** → **przejdź do KROKU 4**

**LUB:**
1. Otwórz terminal
2. Wpisz `cd ` (cd + spacja)
3. Przeciągnij folder do terminala
4. Naciśnij Enter → **przejdź do KROKU 4**

---

## KROK 4: Zainstaluj zależności (tylko raz!)

W otwartym terminalu wpisz:
```bash
npm install
```

Naciśnij **Enter** i **poczekaj** (może trwać 1-3 minuty).

### Co zobaczysz:
```
npm WARN deprecated...
added 237 packages...
```

To jest **NORMALNE**! Poczekaj aż się skończy.

### Gdy zakończy się sukcesem:
Zobaczysz nową linię z migającym kursorem.  
→ **Przejdź do KROKU 5**

### Jeśli widzisz błąd:
- `npm: command not found` → Wróć do KROKU 1-2
- `permission denied` (Mac/Linux) → Spróbuj: `sudo npm install`
- Inne błędy → Zobacz FAQ.md

---

## KROK 5: Zbuduj aplikację

W terminalu wpisz:
```bash
npm run build
```

Naciśnij **Enter** i poczekaj (zwykle 3-10 sekund).

### Co zobaczysz:
```
vite v7.2.4 building...
✓ 31 modules transformed.
dist/index.html  277.12 kB
✓ built in 1.19s
```

To oznacza **SUKCES!** 🎉

→ **Przejdź do KROKU 6**

---

## KROK 6: Znajdź i otwórz plik

### Wszyscy:
1. W folderze projektu znajdziesz nowy folder: **`dist`**
2. Otwórz folder **`dist`**
3. Znajdziesz tam plik: **`index.html`**
4. **Kliknij dwukrotnie** na `index.html`

### Lub:
Przeciągnij `index.html` do otwartej przeglądarki (Chrome, Firefox, Edge, Safari).

---

## KROK 7: Aplikacja działa! 🎉

### Co zobaczysz:
- Kolorowy interfejs z trzema zakładkami
- "Analiza" | "Transkrypcje" | "Porównanie"
- Paski boczne ze statystykami
- Wykryte kody samotności i wsparcia

### Co możesz zrobić:
✅ Przeglądać wykryte kody  
✅ Filtrować po typie i pewności  
✅ Czytać transkrypcje z podświetleniami  
✅ Porównywać nagrania w tabeli i na wykresie  

### BONUS: Aplikacja działa OFFLINE!
- Możesz zamknąć terminal
- Możesz wyłączyć Internet
- Możesz skopiować `dist/index.html` na pendrive
- Możesz wysłać plik mailem

---

## 🎓 Co dalej?

### Chcę zmienić transkrypcje:
1. Otwórz `src/data/transcripts.ts` w edytorze tekstu
2. Zmień treść
3. Zapisz
4. Wróć do terminala i wpisz: `npm run build`
5. Otwórz na nowo `dist/index.html`

### Chcę zmienić wzorce wykrywania:
1. Otwórz `src/analyzer/codeAnalyzer.ts`
2. Znajdź `CODE_PATTERNS`
3. Edytuj wzorce
4. Zapisz
5. `npm run build`
6. Otwórz na nowo `dist/index.html`

### Chcę pracować nad kodem na żywo:
1. W terminalu wpisz: `npm run dev`
2. Otwórz przeglądarkę na: `http://localhost:5173`
3. Edytuj kod w `src/` - zmiany będą widoczne od razu!
4. Gdy skończysz, naciśnij `Ctrl + C` w terminalu

---

## 📚 Dodatkowe zasoby

- **README.md** - pełna dokumentacja
- **INSTRUKCJA_OFFLINE.md** - szczegóły użycia offline
- **FAQ.md** - najczęstsze pytania
- **PRZYKŁADY_MODYFIKACJI.md** - jak edytować kod
- **QUICK_START.txt** - skrócona instrukcja

---

## ⚠️ Najczęstsze problemy

### "npm: command not found"
→ Node.js nie jest zainstalowany. Wróć do KROKU 2.

### "Cannot find module..."
→ Nie zainstalowałeś zależności. Wróć do KROKU 4.

### Pusta strona po otwarciu index.html
→ Build się nie udał. Sprawdź czy nie było błędów w KROKU 5.

### Terminal się zamknął
→ To normalne po zakończeniu komendy. Otwórz nowy (KROK 3).

### Nie wiem jak otworzyć terminal
→ Zobacz szczegóły w KROKU 3 dla Twojego systemu.

---

## 🆘 Potrzebujesz pomocy?

1. Przeczytaj **FAQ.md**
2. Sprawdź komunikat błędu dokładnie
3. Google: "nazwa błędu npm"
4. Sprawdź czy wszystkie pliki są w folderze

---

**Gratulacje! Masz działającą aplikację! 🎊**

Teraz możesz:
- Analizować transkrypcje
- Wykrywać wzorce samotności
- Porównywać wyniki
- Udostępniać wyniki (wysyłając `dist/index.html`)

**Powodzenia w badaniach!** 🔬📊
