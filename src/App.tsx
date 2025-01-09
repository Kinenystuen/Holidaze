import { Link, Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/home/Home";
import Venues from "./components/venues/venues";

function App() {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route
          path="auth"
          element={
            <div className="bg-slate-700 text-white min-h-screen flex items-center justify-center">
              Auth
              <Link to="/">Home</Link>
            </div>
          }
        />
        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="venues" element={<Venues />} />
          {/* <Route path="gallery/:id" element={<PageGallery />} />  */}
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
