import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DashboardLayout from "./components/layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import PiscinasList from "./pages/piscinas/PiscinasList";
import PiscinaCreate from "./pages/piscinas/PiscinaCreate";
import PiscinaEdit from "./pages/piscinas/PiscinaEdit";
import PiscinaDetail from "./pages/piscinas/PiscinaDetail";
import UsersList from "./pages/users/UsersList";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes with layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="piscinas" element={<PiscinasList />} />
            <Route
              path="piscinas/create"
              element={
                <ProtectedRoute adminOnly>
                  <PiscinaCreate />
                </ProtectedRoute>
              }
            />
            <Route path="piscinas/:id" element={<PiscinaDetail />} />
            <Route
              path="piscinas/edit/:id"
              element={
                <ProtectedRoute adminOnly>
                  <PiscinaEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute adminOnly>
                  <UsersList />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
