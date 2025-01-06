import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home></Home>} />
          {/* <Route path="gallery" element={<PageGallery />} />
          <Route path="gallery/:id" element={<PageGallery />} /> */}
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
