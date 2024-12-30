import React, { useContext, useEffect, useState } from "react";
// import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./styles.css";
import { Context1 } from "./../App/App.jsx";

// const CustomButton = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg === "blue" ? "white" : "black")};
//   padding: 10px;
// `;

// class Detail2 extends React.Component {
//   componentDidMount() {
//     // 컴포넌트 mount시 여기 코드 실행
//   }

//   componentDidUpdate() {
//     // 컴포넌트 update시 여기 코드 실행
//   }

//   componentWillUnmount() {
//     // 컴포넌트 unmount시 여기 코드 실행
//   }
// }

const TabContent = ({ tab }) => {
  const [fade, setFade] = useState("");
  const { remains } = useContext(Context1);

  useEffect(() => {
    const animate = setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      setFade("");
      clearTimeout(animate);
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>{remains}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
};

const Detail = ({ item }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [tab, setTab] = useState(0);
  const [fade, setFade] = useState("");
  const { id } = useParams();
  const seletedItem = item.find((e) => e.id === Number(id));
  const { remains } = useContext(Context1);

  useEffect(() => {
    // mount, update시 여기 코드 실행
    const func = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    const animate = setTimeout(() => {
      setFade("end");
    }, 10);

    return () => {
      // clean up function(useEffect 동작 전에 실행)
      // 기존 타이머 제거
      // 기존 데이터 요청 취소
      // unmount시 여기 코드 실행
      setFade("");
      clearTimeout(func);
      clearTimeout(animate);
    };
  }, []);

  return (
    <div className={`container ${fade}`}>
      {isVisible && (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      )}

      {seletedItem ? (
        <div className="row mb-5">
          <div className="col-md-6">
            <img src={seletedItem.image} width="100%" />
          </div>

          <div className="col-md-6">
            <h4 className="pt-5">{seletedItem.title}</h4>
            <p>{seletedItem.content}</p>
            <p>{seletedItem.price.toLocaleString()} 원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      ) : (
        <div>없는 페이지입니다.</div>
      )}

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
};

export default Detail;
