# Tickets

מערכת לניהול כרטיסי תמיכה (Tickets) - Backend ב-.NET ו-Frontend ב-React.

## מבנה הפרויקט

```
backend/    # ASP.NET Core Web API (.NET) + SQLite
frontend/   # React + TypeScript + Vite
```

## דרישות מוקדמות

- [.NET SDK](https://dotnet.microsoft.com/download) (גרסה תואמת ל-`Tickets.slnx`)
- [Node.js](https://nodejs.org/) (גרסה 18+) ו-npm

## הרצת ה-Backend

```bash
cd backend/Tickets.Api
dotnet run
```

- השרת עולה על `http://localhost:5025` (וגם `https://localhost:7249`).
- מיגרציות ונתוני seed רצים אוטומטית בעלייה (SQLite, קובץ `tickets.db`).
- ב-Development, Swagger UI זמין בכתובת `/swagger`.

## הרצת ה-Frontend

```bash
cd frontend
cp .env.example .env   # ראשית הרצה בלבד - הקובץ .env אינו נשמר בגיט
npm install
npm run dev
```

- האפליקציה עולה בכתובת שמוצגת בטרמינל (בד"כ `http://localhost:5173`).
- קובץ ה-`.env` חייב להכיל את `VITE_API_BASE_URL` עם כתובת ה-Backend (לדוגמה `http://localhost:5025`). בלעדיו הבקשות ל-API ישלחו לכתובת שגויה והטבלה תיכשל בטעינה.

## API עיקרי

| Method | Endpoint | תיאור |
|---|---|---|
| POST | `/api/tickets` | יצירת כרטיס חדש |
| GET | `/api/tickets` | שליפת כל הכרטיסים (אפשר לפלטר לפי `status`/`urgency`) |
| GET | `/api/tickets/{id}` | שליפת כרטיס לפי מזהה |
| PATCH | `/api/tickets/{id}/status` | עדכון סטטוס כרטיס |
| DELETE | `/api/tickets/{id}` | מחיקת כרטיס |

## סקריפטים שימושיים (Frontend)

```bash
npm run dev       # הרצת שרת פיתוח
npm run build     # בניית production
npm run lint      # הרצת oxlint
npm run preview   # תצוגה מקדימה של ה-build
```
