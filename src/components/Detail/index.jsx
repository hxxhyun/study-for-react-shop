import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const CustomButton = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg === "blue" ? "white" : "black")};
  padding: 10px;
`;

const Detail = ({ item }) => {
  const { id } = useParams();
  const seletedItem = item.find((e) => e.id === Number(id));

  return (
    <div className="container">
      <CustomButton bg="blue">버튼</CustomButton>
      <CustomButton bg="orange">버튼</CustomButton>

      {seletedItem ? (
        <div className="row">
          <div className="col-md-6">
            <img src={seletedItem.image} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{seletedItem.title}</h4>
            <p>{seletedItem.content}</p>
            <p>{seletedItem.price.toLocaleString()}원</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      ) : (
        <div>없는 페이지입니다.</div>
      )}
    </div>
  );
};

export default Detail;
