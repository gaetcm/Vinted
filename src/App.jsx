import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//page/components :
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/header/index.jsx";
import NotFound from "./pages/NotFound.jsx";
import Publish from "./pages/Publish.jsx";
import Payment from "./pages/Payment.jsx";

function App() {
  const [token, setToken] = useState(Cookies.get("vinted-token") || null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 10 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        search={search}
        setSearch={setSearch}
        handleToken={handleToken}
        sort={sort}
        setSort={setSort}
        min={min}
        max={max}
        setMin={setMin}
        setMax={setMax}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sort={sort}
              min={min}
              max={max}
              currentPage={currentPage}
              search={search}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={token ? <Payment /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
