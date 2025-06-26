# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# 💼 Employee Feedback Frontend

A modern and responsive **Employee Feedback Management** frontend built with **React**, **TypeScript**, and **CSS Modules**. This app enables employees to submit feedback, managers to review feedback, view teams, manage team members, and visualize performance analytics — all wrapped in a clean UI.

---

## 📁 Project Structure

```text

feedback_manager/
├── public/ # Static files
├── src/
│ ├── api/ # API client configuration
│ ├── assets/ # Images and icons
│ ├── components/
│ │ ├── auth/ # Login/Register components
│ │ ├── dashboard/ # Dashboard views and hooks
│ │ ├── feedback/ # Feedback logic and components
│ │ ├── team/ # Team-related pages
│ │ ├── profile/ # Profile viewing
│ │ └── styledcomponents/ # Reusable styled UI components (Navbar, InputBox, Spinner)
│ ├── routes/ # All route definitions
│ └── main.tsx # Entry point
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

```

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- Role-based access (Employee / Manager)
- Secure token storage using cookies

### 🧑‍💼 Manager Panel
- Review employee feedback
- Add and manage team members
- View team statistics

### 👤 Employee Panel
- Submit feedback
- Track feedback history
- View manager comments and scores

### 📊 Dashboard
- Personalized welcome
- Quick navigation to actions
- Stats: feedbacks, teams, pending reviews
- Activity logs

### 🌐 Routing
- Client-side routing using React Router
- Protected routes based on user role

---

## 🏗️ Tech Stack

| Technology        | Purpose                              |
|------------------|---------------------------------------|
| **React**         | UI library                           |
| **TypeScript**    | Type-safe JavaScript                 |
| **React Router**  | Page routing                         |
| **CSS Modules**   | Scoped styling                       |
| **Axios**         | API calls                            |
| **js-cookie**     | Token handling                       |
| **Custom Hooks**  | Data fetching and logic separation   |

---


## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Eswarsaipetakamsetty/feedback_manager.git
cd feedback_manager
```
### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```
4. Start the development server
```bash
npm run dev
```
Open in browser at: http://localhost:5173

### 🛠️ API Endpoints Used
```text
POST /auth/register/

POST /auth/login/

GET /auth/user/

GET /team/

GET /team/count/

GET /activity/

GET /feedback/manager/reviewed/

GET /feedback/

POST /feedback/
```

All requests are configured using src/api/ApiClient.ts and src/api/index.ts.


### 🔒 Authentication Flow
On successful login/register, access and refresh tokens are stored in cookies

User data is cached using Cookies.get("user_data")

Custom hooks are used to fetch and persist user context (useDashboard, useRegister, useLogin)

📌 Notes
Feedback is sentiment-tagged (positive, neutral, negative)

Manager reviews include score and comments

Recent activity is pulled from /activity/ model

Image assets like give.png, request.png, etc., are used in dashboard cards



