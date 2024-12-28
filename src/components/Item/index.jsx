import React from "react";

const Card = ({ item }) => {
  return (
    <div className="col-md-4">
      <img src={item.image} width="80%" />
      <h4>{item.title}</h4>
      <p>{item.price.toLocaleString()}원</p>
    </div>
  );
};

export default Card;
