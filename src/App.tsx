import { Link, Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/home/Home";
import ErrorMessage from "./components/shared/ErrorMessage";
import Button from "./components/shared/Button/Button";
import VenuePage from "./_root/pages/venues/VenuePage";
import SelVenuePage from "./_root/pages/venues/SelVenuePage";
import PageAuth from "./_root/pages/auth/PageAuth";

function App() {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route path="auth" element={<PageAuth />} />
        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="venues" element={<VenuePage />} />
          <Route path="venue/:id" element={<SelVenuePage />} />
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
