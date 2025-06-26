# 💼 Employee Feedback Frontend

A modern and responsive **Employee Feedback Management** frontend built with **React**, **TypeScript**, and **CSS Modules**. This app enables employees to submit feedback, managers to review feedback, view teams, manage team members, and visualize performance analytics — all wrapped in a clean UI.

---

### Deploy Link
```bash
https://feedback-manager-two.vercel.app/
```
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
VITE_API_BASE_URL=http://localhost:8000/
```
4. Start the development server
```bash
npm run dev
```
Open in browser at: http://localhost:5173

### 🛠️ API Endpoints Used
| **Path**            | **Component**         | **Description**                                            |
| ------------------- | --------------------- | ---------------------------------------------------------- |
| `/register`         | `Register`            | User registration form with manager option.                |
| `/login`            | `Login`               | User login form.                                           |
| `/dashboard`        | `Dashboard`           | Main dashboard showing stats, team info, and activity log. |
| `/write-feedback`   | `SubmitFeedback`      | Form to submit feedback for a team member.                 |
| `/feedback-history` | `FeedbackHistory`     | View feedbacks submitted by the user.                      |
| `/feedback`         | `FeedbackOptions`     | General feedback options interface.                        |
| `/give-feedback`    | `GiveFeedbackOptions` | Options for self-feedback or requesting feedback.          |
| `/team`             | `Team`                | Displays team members and options for manager/member.      |
| `/profile/:email`   | `Profile`             | Public profile of the user with dynamic email as param.    |
| `/team/add-members` | `AddMembers`          | Manager can add team members from here.                    |
| `/createteam`       | `CreateTeam`          | Manager can create a new team.                             |
| `/reviewfeedback`   | `ReviewFeedback`      | Manager can review pending feedbacks here.                 |
| `/reviews`          | `ReviewedFeedbacks`   | Manager can view feedbacks they've reviewed.               |


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



