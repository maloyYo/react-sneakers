import React from "react";
import Card from "../components/Card/Card";

// import { ToastContainer} from "react-toastify";
function Home({
  items,
  searchValue,
  onAddToCart,
  onAddToFavorite,
  onChangeSearchInput,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        {...item}
        loading={isLoading}
      />
    ));
  };
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Все кроссовки</h1>
        <div className="search-block d-flex">
          <img src="img/search.svg" alt="search" />
          <input onChange={onChangeSearchInput} placeholder="Поиск ..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
