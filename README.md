# SmartLearn Platform

SmartLearn is a comprehensive e-learning platform for B.Tech students to practice coding, learn new technologies, and earn certifications.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to run the project locally:

1.  **Unzip the project** (if you received it as a zip file).
2.  **Open a terminal** and navigate to the project directory.
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    ```
5.  **Open your browser** and visit the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure

- `src/pages`: Contains the main pages (Landing, Auth, Dashboard, Coding, Lessons, Profile).
- `src/components`: Reusable UI components.
- `src/context`: React Context for state management (e.g., Auth).
- `src/assets`: Images and static files.

## Features

- **Authentication**: Sign up and Login.
- **Dashboard**: Track progress and stats.
- **Coding Arena**: Practice coding problems with a built-in editor.
- **Learning Hub**: Browse video courses and take quizzes.
- **Profile**: View earned badges and certificates.
