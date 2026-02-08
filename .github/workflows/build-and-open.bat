@echo off
REM Skrypt dla Windows - automatycznie buduje projekt i otwiera w przeglądarce

echo 🔨 Budowanie projektu...
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build zakończony sukcesem!
    echo 📂 Otwieranie dist\index.html...
    start dist\index.html
) else (
    echo ❌ Build nie powiódł się!
    pause
    exit /b 1
)

pause
