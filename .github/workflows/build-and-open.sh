#!/bin/bash

# Skrypt automatycznie buduje projekt i otwiera w przeglądarce

echo "🔨 Budowanie projektu..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build zakończony sukcesem!"
    echo "📂 Otwieranie dist/index.html..."
    
    # Wykryj system operacyjny i otwórz plik
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open dist/index.html
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open dist/index.html
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        # Windows (Git Bash)
        start dist/index.html
    else
        echo "⚠️ Nie rozpoznano systemu operacyjnego."
        echo "Otwórz ręcznie: dist/index.html"
    fi
else
    echo "❌ Build nie powiódł się!"
    exit 1
fi
