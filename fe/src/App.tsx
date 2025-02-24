import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Chat from "./components/Chat";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
}

export default App;