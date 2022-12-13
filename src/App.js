
import { Route, Routes } from "react-router-dom";
import DrawingPage from "./pages/DrawingPage";
import Canvas from "./pages/Canvas";
import Rectangle from "./pages/Rectangle";
import DrawCircle from "./pages/DrawCircle";
import Login from "./pages/Login";

function App() {
  return (
    // <div className=" h-[80vh] bg-[#f5f5f5] flex items-center justify-center ">
    <div className=" ">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/drawingPage" element={<DrawingPage />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/rectangle" element={<Rectangle />} />
        <Route path="/drawcircle" element={<DrawCircle />} />
      </Routes>
    </div>
    // </div>
  );
}

export default App;
