import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/home/Home";
import VenuePage from "./_root/pages/venues/VenuePage";
import SelVenuePage from "./_root/pages/venues/SelVenuePage";
import AuthPage from "./_root/pages/auth/AuthPage";
import Profile from "./_root/pages/profile/profile";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import ProfileLayout from "./_root/pages/profile/ProfileLayout";
import MyBookings from "./_root/pages/profile/MyBookings";
import ManageVenues from "./_root/pages/profile/ManageVenues";
import PrivateProfile from "./_root/pages/profile/PrivateProfile";
import AdminCreateVenue from "./_root/pages/profile/AdminCreateVenue";
import AdminBookings from "./_root/pages/profile/AdminBookings";
import AdminSettings from "./_root/pages/profile/AdminSettings";
import PageNotFound from "./_root/pages/PageNotFound";

function App() {
  return (
    <Routes>
      {/* Authentication Route */}
      <Route path="auth" element={<AuthPage />} />

      {/* Public Routes */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="venues" element={<VenuePage />} />
        <Route path="venue/:id" element={<SelVenuePage />} />
        <Route path="profile/:name" element={<Profile />} />
      </Route>

      {/* Admin Routes (Requires Auth) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PrivateProfile />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="venues" element={<ManageVenues />} />
        <Route path="create-venue" element={<AdminCreateVenue />} />
        <Route path="venue-bookings" element={<AdminBookings />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
