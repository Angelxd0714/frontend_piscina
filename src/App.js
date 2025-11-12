import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PiscinasList from "./pages/piscinas/PiscinasList";
import PiscinaCreate from "./pages/piscinas/PiscinaCreate";
import PiscinaEdit from "./pages/piscinas/PiscinaEdit";
import UsersList from "./pages/users/UsersList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/piscinas"
            element={
              <ProtectedRoute>
                <PiscinasList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/piscinas/create"
            element={
              <ProtectedRoute adminOnly>
                <PiscinaCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/piscinas/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <PiscinaEdit />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute adminOnly>
                <UsersList />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
