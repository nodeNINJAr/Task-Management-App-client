
# Taskly – Task Management System

**Taskly** is a modern task management system designed to simplify task organization, boost productivity, and enable real-time collaboration. Built using **React 19**, **Vite**, **TailwindCSS**, and **Firebase**, Taskly provides a seamless user experience with **Socket.IO**-powered real-time task updates.

## Table of Contents
- [Taskly – Task Management System](#taskly--task-management-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Live Links](#live-links)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Dependencies](#dependencies)
    - [Core Libraries:](#core-libraries)
    - [UI \& Styling:](#ui--styling)
    - [State \& Data Management:](#state--data-management)
    - [Firebase:](#firebase)
    - [Real-Time Communication:](#real-time-communication)
    - [Drag-and-Drop:](#drag-and-drop)
    - [Utilities:](#utilities)
  - [Installation](#installation)
    - [Step 1 – Clone the Repository:](#step-1--clone-the-repository)
    - [Step 2 – Navigate into the Client Directory:](#step-2--navigate-into-the-client-directory)
    - [Step 3 – Install Dependencies:](#step-3--install-dependencies)
  - [Usage](#usage)
    - [Start Development Server:](#start-development-server)
    - [Build for Production:](#build-for-production)
    - [Preview Production Build:](#preview-production-build)
    - [Linting:](#linting)
  - [Configuration](#configuration)
  - [Development Scripts](#development-scripts)
  - [Examples](#examples)
  - [Troubleshooting](#troubleshooting)
  - [Contributors](#contributors)

---

## Introduction
**Taskly** is a full-featured task management system designed to help teams and individuals track tasks efficiently. It features a modern user interface, drag-and-drop task reordering, deadline tracking, and real-time updates for collaborative task management.

---

## Live Links
- **Live Site:** [https://task-manager-c5ec9.web.app](https://task-manager-c5ec9.web.app)

---

## Features
- 📝 **Task Creation & Management:** Easily create, edit, and delete tasks.
- 🔄 **Drag-and-Drop Task Reordering:** Rearrange tasks intuitively.
- ⚡ **Real-Time Updates:** Stay in sync with **Socket.IO**.
- 🔐 **User Authentication:** Secure sign-in with **Firebase**.
- 📱 **Responsive UI:** Built with **Ant Design** and **TailwindCSS**.
- 📊 **Deadline Tracking:** Leverage **date-fns** for deadline management.
- ⚡ **State & Data Sync:** Powered by **React Query** for seamless data fetching.

---

## Technologies Used
| Technology                | Purpose                                      |
|---------------------------|----------------------------------------------|
| **React 19**               | Frontend library                            |
| **Vite**                   | Build tool & development server             |
| **TailwindCSS**            | Utility-first CSS framework                 |
| **Ant Design (antd)**       | UI component library                        |
| **React Query**            | Data fetching and state management          |
| **Firebase**               | Backend services & authentication           |
| **Socket.IO**              | Real-time bidirectional communication       |
| **Drag-and-Drop**          | Task reordering with @hello-pangea/dnd      |
| **date-fns**               | Date/time utilities                         |

---

## Dependencies
### Core Libraries:
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `vite`: ^6.1.0

### UI & Styling:
- `antd`: ^5.24.1
- `tailwindcss`: ^4.0.7
- `@tailwindcss/vite`: ^4.0.7

### State & Data Management:
- `@tanstack/react-query`: ^5.66.7
- `axios`: ^1.7.9

### Firebase:
- `firebase`: ^11.3.1

### Real-Time Communication:
- `socket.io-client`: ^4.8.1

### Drag-and-Drop:
- `@hello-pangea/dnd`: ^18.0.1

### Utilities:
- `date-fns`: ^4.1.0
- `react-helmet`: ^6.1.0
- `react-icons`: ^5.5.0
- `react-router`: ^7.2.0
- `react-fast-marquee`: ^1.6.5

---

## Installation

### Step 1 – Clone the Repository:
```bash
git clone https://github.com/nodeNINJAr/Task-Management-App-client
```

### Step 2 – Navigate into the Client Directory:
```bash
cd client
```

### Step 3 – Install Dependencies:
```bash
npm install
```
or
```bash
yarn install
```

---

## Usage

### Start Development Server:
```bash
npm run dev
```
This will start the development server on **`http://localhost:5173`** (default Vite port).

### Build for Production:
```bash
npm run build
```
Creates an optimized build in the `dist` directory.

### Preview Production Build:
```bash
npm run preview
```
Serves the production build locally for testing.

### Linting:
```bash
npm run lint
```
Runs **ESLint** for code quality checks.

---

## Configuration

Create a `.env` file in the project root and set the following Firebase environment variables:

```
VITE_apiKey=your-api-key
VITE_authDomain=your-auth-domain
VITE_projectId=your-project-id
VITE_storageBucket=your-storage-bucket
VITE_messagingSenderId=your-messaging-sender-id
VITE_appId=your-app-id
```

Ensure the **Firebase Console** is properly set up for authentication and Firestore services.

---

## Development Scripts

| Script      | Description                                 |
|-------------|---------------------------------------------|
| `dev`       | Starts the development server using Vite.    |
| `build`     | Builds the production version of the app.    |
| `preview`   | Previews the production build.               |
| `lint`      | Runs ESLint for code quality checks.         |

---

## Examples

Example Task Object:
```javascript
{
  _id: '1',
  uid: "njasnakslasdljdlsjdak",
  title: 'Design Dashboard',
  description: 'Create a dashboard layout for project tracking.',
  category: 'In Progress',
  timestamp: '2025-02-28',
}
```

---

## Troubleshooting
- Ensure **Node.js** is installed (Recommended version: `18.x` or `20.x`).
- If you face dependency issues, try:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## Contributors
- **Mehedi Hasan Ridoy** – [GitHub Profile](https://github.com/nodeNINJAr)

