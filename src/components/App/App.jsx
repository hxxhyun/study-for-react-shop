import { createContext, useState } from "react";
import axios from "axios";
import shoesData from "../../data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Card from "../Item";
import Detail from "../Detail";
import Event from "../Event";
import About from "../About";
import "./App.css";

export const Context1 = createContext();

const App = () => {
  const [shoes, setShoes] = useState(shoesData);
  const [remains, setRemains] = useState([10, 11, 12]);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light" className="nav-bar">
        <Container>
          <Navbar.Brand href="/">Shoeshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((item) => (
                    <Card item={item} key={item.id} />
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((result) => {
                      setShoes(shoes.concat(result.data));
                    })
                    .catch(() => {
                      console.log("access failed");
                    });

                  Promise.all([axios.get("/url1"), axios.get("/url2")]).then(
                    () => {
                      // 요청 여러개 진행할떄
                    }
                  );
                }}
              >
                더 보기
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ remains }}>
              <Detail item={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버들</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>
        <Route path="event" element={<Event />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
        </Route>
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
};

export default App;
