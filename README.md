# DCE Lesson Planner (static)

Prosty, statyczny planer lekcji oparty na **Digital Citizenship Education (DCE) Planner** Rady Europy. 
Pozwala filtrować *efekty uczenia się* po **grupie wiekowej** i **domenie** DCE oraz wyszukiwać po słowach kluczowych.

👉 Działa w 100% na **GitHub Pages** (bez backendu).

---

## Jak uruchomić lokalnie
1. Pobierz to repo lub paczkę `.zip`.
2. Uruchom prosty serwer statyczny, np.:
   ```bash
   python -m http.server 8000
   # a potem otwórz http://localhost:8000/
   ```
   (Alternatywnie użyj rozszerzenia *Live Server* w VS Code.)

## Jak wdrożyć na GitHub Pages
1. Wgraj pliki do repozytorium.
2. W ustawieniach repo: **Settings → Pages → Branch: main → /(root)** → Save.
3. Po chwili strona będzie dostępna pod adresem `https://<twoj_user>.github.io/<twoje_repo>/`.

---

## Struktura
```
/data/dce_planner_database.json  # baza efektów uczenia się (wyeksportowana z XLSX)
/index.html
/app.js
/styles.css
/assets/ico.svg
```
---

## Źródła i uznanie autorstwa
- Baza efektów uczenia się pochodzi z **DCE Planner** (Council of Europe). 
- Użytek edukacyjny, z zachowaniem atrybucji.
- Zalecane: dodać odniesienie do **Digital Citizenship Education – Trainers’ Pack** i **DCE Handbook**.

> Słownictwo i domeny DCE: *Being online*, *Well‑being online*, *Rights online* (10 domen).

---

## Licencja
Kod: MIT. Dane: proszę sprawdzić warunki wykorzystania materiałów Rady Europy przed publikacją.

