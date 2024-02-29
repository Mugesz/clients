import "./App.css";
import Login from "./Components/Login";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import Link here
import Sports from "./Components/addNews/Sports";
import Cinema from "./Components/addNews/Cinema";
import Crime from "./Components/addNews/Crime";
import Economics from "./Components/addNews/Economics";
import Politics from "./Components/addNews/Politics";
import World from "./Components/addNews/World";
import AllNews from "./Components/AllNews";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sportsNews" element={<Sports />} />
          <Route path="/cinemaNews" element={<Cinema />} />
          <Route path="/crimeNews" element={<Crime />} />
          <Route path="/economicsNews" element={<Economics />} />
          <Route path="/politicsNews" element={<Politics />} />
          <Route path="/worldNews" element={<World />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
