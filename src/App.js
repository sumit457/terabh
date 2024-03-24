import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Tasks from "./components/Tasks"
import SignUp from "./components/Singup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tasks" element={<Tasks />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
