import { Routes, Route } from "react-router-dom";
import BusinessPage from "./pages/BusinessPage";

function App() {
  return (
    <Routes>
      <Route path="/b/:id" element={<BusinessPage />} />
    </Routes>
  );
}

export default App;