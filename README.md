# 🍲 Aapli Recipe - Premium Culinary Workspace

A beautifully designed, full-stack web application built for food enthusiasts to discover, share, and manage authentic recipes.

## ✨ Features

- **Public Discover Page:** A stunning, modern landing page for guests to explore top recipes from the community.
- **Secure Authentication:** JWT-based user login and registration system with secure route guarding.
- **Personalized Chef Dashboard:** Dynamic analytics cards displaying the total platform recipes, your personal published recipes, and your saved collections.
- **Recipe Management:** Full CRUD (Create, Read, Update, Delete) capabilities allowing users to manage their own culinary creations.
- **Interactive Community:** Like recipes, bookmark favorites, view preparation/cooking times, ingredients, and detailed instructions.
- **Sleek UI/UX:** Built with a premium dark-mode aesthetic featuring glassmorphism, dynamic gradients, and smooth micro-animations.

## 🛠️ Technology Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS, Lucide React (Icons), React Router DOM, React Hot Toast
- **Backend:** Node.js, Express.js, Cors
- **Database:** MongoDB (Mongoose)
- **Security:** JSON Web Tokens (JWT), Bcrypt password hashing

## 🚀 Running Locally

To run this project on your local machine, you will need to start both the backend server and the frontend client in two separate terminal windows.

### 1. Start the Backend (Database & API)
```bash
cd backend
npm install
npm run dev
```
*(Runs on http://localhost:3001)*

### 2. Start the Frontend (Client)
```bash
cd frontend
npm install
npm run dev
```
*(Runs on http://localhost:5173)*

## 🔐 Security & Protections

- Passwords are fully encrypted in the database using bcrypt.
- **Frontend Route Guarding:** Unauthenticated users attempting to view private recipe details or dashboards are instantly intercepted and redirected to the login page via custom Toast UI notifications.
- **Backend API Protection:** Secure endpoints check for valid authorization headers (JWT tokens) before allowing any creation, modification, or deletion of data.
- **Ownership Validation:** The UI strictly prevents users from editing or deleting recipes that they do not personally own.

---
*Developed by Swapnil Bharate*
