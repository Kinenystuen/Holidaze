import { Link, Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/home/Home";
import ErrorMessage from "./components/shared/ErrorMessage";
import Button from "./components/shared/Button/Button";
import VenuePage from "./_root/pages/venues/VenuePage";
import SelVenuePage from "./_root/pages/venues/SelVenuePage";
import AuthPage from "./_root/pages/auth/AuthPage";
import Profile from "./_root/pages/profile/profile";
import PrivateProfile from "./_root/pages/profile/PrivateProfile";
import ProtectedRoute from "./components/shared/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route path="auth" element={<AuthPage />} />
        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="venues" element={<VenuePage />} />
          <Route path="venue/:id" element={<SelVenuePage />} />
          <Route path="/profile/:name" element={<Profile />} />
          {/* Private user profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PrivateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ErrorMessage message="Page not found">
                <Link to="/">
                  <Button buttonType="violet">Go Back</Button>
                </Link>
              </ErrorMessage>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
export default App;
