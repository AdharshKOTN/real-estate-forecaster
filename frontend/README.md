// File: frontend/README.md

# Real Estate Forecaster - Frontend

This is the frontend React application built with Next.js and Tailwind CSS. It fetches forecast data from the Flask backend and visualizes housing trends using Chart.js.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 Backend Connection
Ensure your Flask backend is running at `http://localhost:5000`. The frontend fetches forecast data via API calls.

---

## 📁 Folder Structure
```
frontend/
├── components/
│   ├── ForecastForm.tsx
│   └── ForecastChart.tsx
├── pages/
│   └── index.tsx
├── styles/
│   └── globals.css
├── public/
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## 📊 Libraries Used
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [React Chart.js 2](https://react-chartjs-2.js.org/)

---

## 📦 Environment Variables
None required for development. Update API base URLs in `index.tsx` if needed.

---

## 📌 Notes
- This app is part of the full-stack Real Estate Forecasting project.
- Backend folder: `../backend/`

---

## 🛠 Future Enhancements
- Dynamic dropdown for cities
- Loading spinner and error handling
- Deploy frontend (e.g., on Vercel) and connect to live API