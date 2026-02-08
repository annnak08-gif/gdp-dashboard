# 📋 Instrukcja używania aplikacji OFFLINE

## Metoda 1: Pojedynczy plik HTML (NAJŁATWIEJSZA ✅)

### Kroki:

1. **Zbuduj projekt:**
   ```bash
   npm run build
   ```

2. **Znajdź plik:**
   - Otwórz folder `dist/`
   - Znajdziesz tam plik `index.html`

3. **Skopiuj i otwórz:**
   - Skopiuj `dist/index.html` gdziekolwiek (np. Pulpit, pendrive, itp.)
   - Kliknij dwukrotnie na plik lub przeciągnij go do przeglądarki
   - **Aplikacja działa całkowicie offline!** 🎉

### Cechy:
- ✅ Cały CSS i JavaScript w jednym pliku
- ✅ Nie wymaga serwera
- ✅ Nie wymaga Internetu
- ✅ Działa w każdej przeglądarce (Chrome, Firefox, Safari, Edge)
- ✅ Można wysłać mailem lub skopiować na pendrive

---

## Metoda 2: Lokalny serwer (dla developmentu)

### Jeśli chcesz pracować nad kodem:

1. **Zainstaluj zależności (tylko raz):**
   ```bash
   npm install
   ```

2. **Uruchom serwer deweloperski:**
   ```bash
   npm run dev
   ```

3. **Otwórz przeglądarkę:**
   - Przejdź na adres: `http://localhost:5173`
   - Zmiany w kodzie automatycznie odświeżają stronę

---

## Metoda 3: Podgląd wersji produkcyjnej (lokalnie)

1. **Zbuduj projekt:**
   ```bash
   npm run build
   ```

2. **Uruchom podgląd:**
   ```bash
   npm run preview
   ```

3. **Otwórz przeglądarkę:**
   - Przejdź na adres wyświetlony w terminalu (zazwyczaj `http://localhost:4173`)

---

## 🔧 Jak edytować transkrypcje?

### Jeśli chcesz zmienić analizowane teksty:

1. Otwórz plik: `src/data/transcripts.ts`
2. Edytuj treść transkrypcji (zachowaj format timecode)
3. Zapisz plik
4. Przebuduj: `npm run build`
5. Użyj nowego `dist/index.html`

---

## 🎯 Jak edytować reguły analizy?

### Jeśli chcesz zmienić wzorce wykrywania kodów:

1. Otwórz plik: `src/analyzer/codeAnalyzer.ts`
2. Znajdź sekcję `CODE_PATTERNS`
3. Edytuj wyrażenia regularne (regex) lub dodaj nowe wzorce
4. Zapisz plik
5. Przebuduj: `npm run build`
6. Użyj nowego `dist/index.html`

**Przykład — dodanie nowego wzorca dla IO1:**

```typescript
{
  code: 'IO1',
  name: 'IO_LONELY',
  patterns: [
    /czuj[ęe]\s+si[ęe]\s+samotn(ie|y|a)/i,
    /jestem\s+samotn(y|a)/i,
    /nowy wzorzec tutaj/i,  // ← dodaj tutaj
  ],
  // ...
}
```

---

## 📦 Wymagania systemowe

### Minimalne:
- **Przeglądarka:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM:** 512 MB
- **System:** Windows 7+, macOS 10.12+, Linux (dowolny)

### Do budowania (npm):
- **Node.js:** 18.0.0 lub nowszy
- **npm:** 9.0.0 lub nowszy

---

## ❓ FAQ

### Q: Czy aplikacja wysyła dane do Internetu?
**A:** NIE. Wszystko działa lokalnie w przeglądarce. Zero połączeń sieciowych.

### Q: Czy mogę uruchomić na telefonie?
**A:** TAK. Skopiuj `dist/index.html` i otwórz w mobilnej przeglądarce.

### Q: Czy mogę edytować offline?
**A:** Edycja kodu wymaga Node.js + npm, ale gotowy plik `index.html` działa bez niczego.

### Q: Jak udostępnić komuś aplikację?
**A:** Wyślij plik `dist/index.html` mailem, pendrive'em, lub przez chmurę (Google Drive, Dropbox).

### Q: Czy dane transkrypcji są bezpieczne?
**A:** TAK. Wszystko jest zaszyfrowane w pliku HTML i nigdy nie opuszcza Twojego komputera.

---

## 🚀 Szybki start (TL;DR)

```bash
# 1. Zbuduj
npm run build

# 2. Otwórz
open dist/index.html
# lub na Windows: start dist/index.html
# lub na Linux: xdg-open dist/index.html
```

**Gotowe!** 🎉
