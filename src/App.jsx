// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calculator from "./views/calculator/Calculator.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/calculator" element={<Calculator />} />
            </Routes>
        </BrowserRouter>
    );
}
