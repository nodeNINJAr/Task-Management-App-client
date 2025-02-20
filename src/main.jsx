import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./page/Home.jsx";
import TaskBoard from "./page/TaskBoard.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import "@ant-design/v5-patch-for-react-19";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import PrivateRoute from "./private/PrivateRoute.jsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="app" element={<PrivateRoute><TaskBoard /></PrivateRoute>} />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
