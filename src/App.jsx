import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import FilePage from "./FilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 메인 */}
          <Route path="/" element={<Main />} />
          {/* 파일 다운로드 페이지 */}
          <Route path="/:fileName" element={<FilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
