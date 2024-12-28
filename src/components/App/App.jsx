import { useState } from "react";
import shoesData from "../../data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import Card from "../Item";
import Detail from "../Detail";
import Event from "../Event";
import About from "../About";
import "./App.css";

const App = () => {
  const [shoes] = useState(shoesData);
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
                  {shoes.map((item, index) => (
                    <Card item={item} key={index} />
                  ))}
                </div>
              </div>
            </>
          }
        />
        <Route path="/detail/:id" element={<Detail item={shoes} />} />
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
