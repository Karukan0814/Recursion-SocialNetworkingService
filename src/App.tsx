import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import MessagePage from "./pages/MessagePage";
import NotificationPage from "./pages/NotificationPage";
import SearchPage from "./pages/SearchPage";
import PostDetailPage from "./pages/PostDetailPage";
import VerifyPage from "./pages/VerifyPage";
import ProtectedRoute from "./component/ProtectedRoute";
import FollowPage from "./pages/FollowPage";

import { ThemeProvider, createTheme } from "@mui/material/styles";

// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
//   display: "swap",
// });
const theme = createTheme({
  palette: {
    primary: {
      main: "#50b7f5",
    },
    secondary: {
      main: "rgb(83, 100, 113)",
    },
  },
  typography: {
    fontFamily: ["sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:postId"
              element={
                <ProtectedRoute>
                  <PostDetailPage />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/message"
              element={
                <ProtectedRoute>
                  <MessagePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/follow/:id"
              element={
                <ProtectedRoute>
                  <FollowPage />
                </ProtectedRoute>
              }
            />
            <Route path="/verify" element={<VerifyPage />} />

            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <NotFoundPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
