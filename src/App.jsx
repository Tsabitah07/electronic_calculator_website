// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calculator from "./views/calculator/Calculator.jsx";
import Result from "./views/result/Result.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/result" element={<Result/>} />
            </Routes>
        </BrowserRouter>
    );
}
