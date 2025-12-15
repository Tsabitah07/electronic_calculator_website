import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Calculator from "./views/calculator/Calculator.jsx";
import Result from "./views/result/Result.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/calculator" replace />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/result" element={<Result />} />
                <Route path="*" element={<Navigate to="/calculator" replace />} />
            </Routes>
        </BrowserRouter>
    );
}