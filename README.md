# SmartLearn Platform

SmartLearn is a state-of-the-art e-learning platform designed specifically for B.Tech students. It bridges the gap between theoretical knowledge and practical application by providing a unified space for learning, coding, and tracking progress.

![SmartLearn Banner](public/vite.svg)

## 🚀 Key Features

*   **Secure Authentication**: Robust Sign-up and Login flow ensuring user data privacy.
*   **Personalized Dashboard**: Real-time overview of your learning progress, login streaks, and achievements.
*   **Interactive Coding Arena**: Built-in code editor (CodeMirror) supporting multiple languages (Java, C++, Python) with instant feedback.
*   **Learning Hub**: Curated video lessons and quizzes for various B.Tech domains.
*   **Gamification**: Earn badges and certificates upon completing lessons and passing tests.
*   **Profile Management**: Showcase your skills, earned certificates, and coding stats.

## 🛠️ Technology Stack

*   **Frontend**: [React](https://react.dev/) (v19) with [Vite](https://vitejs.dev/) for lightning-fast capability.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for type-safe code.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for modern, responsive design.
*   **Routing**: [React Router](https://reactrouter.com/) (v7).
*   **State Management**: React Context API.
*   **Icons**: [Lucide React](https://lucide.dev/).
*   **Charts**: [Recharts](https://recharts.org/) for visualizing progress.

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (Version 18 or higher)
*   [npm](https://www.npmjs.com/) (Package manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/lavudyasiddu22-siddu/Smart-Learn.git
    cd Smart-Learn
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Access the application**
    Open your browser and navigate to `http://localhost:5173`.

## 📁 Project Structure

```
Smart-Learn/
├── src/
│   ├── components/      # Reusable UI components (buttons, cards, inputs)
│   ├── context/         # Global state management (AuthContext)
│   ├── lib/             # Utility functions and helpers
│   ├── pages/           # Application pages (Landing, Dashboard, Coding, etc.)
│   ├── App.tsx          # Main application component & routes
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── ...config files      # Vite, Tailwind, TypeScript configs
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
