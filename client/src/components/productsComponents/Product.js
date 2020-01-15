import React from "react";
import { Link } from 'react-router-dom';

export default ({ name, ingredients, price, imageURL, id}) => {
  return (
    <div className="ui card center aligned product">
      <div className="center aligned prod-name">
        <h3 className="ui huge header">{name}</h3>
      </div>
      <div className="image">
        <img
          src={imageURL}
          alt={name}
        />
      </div>
      <div className="content center aligned ingredients">
        <p className="header">Ingredients:</p>
        <p className="description">
          {ingredients.join(", ")}
        </p>
      </div>
      <div className="content center aligned price">
        <p className="header">Price:</p>
        <h4 className="description">${(price / 100).toFixed(2)}</h4>
      </div>
      <div className="extra content center aligned prod-name">
        <Link to={`/order/${id}`} className="ui button brown">Order now →</Link>
      </div>
    </div>
  );
};
