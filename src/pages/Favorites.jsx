import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context"


function Favorites() {
  const {favoritesItems,onAddToFavorite,onAddToCart} = React.useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
      {favoritesItems.map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              favorited={true}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Favorites;
