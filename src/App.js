import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";

//Компоненты
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoritesItems, setFavoritesItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
            axios.get("https://6156207ce039a0001725a920.mockapi.io/Cart"),
            axios.get("https://6156207ce039a0001725a920.mockapi.io/favorites"),
            axios.get("https://6156207ce039a0001725a920.mockapi.io/items")
          ]);
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavoritesItems(favoritesResponse.data);
        setItems(itemsResponse.data);

      } catch (error) {
        alert("Ошибка при запросе данных");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(`https://6156207ce039a0001725a920.mockapi.io/Cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post("https://6156207ce039a0001725a920.mockapi.io/Cart",obj);
        setCartItems((prev) => prev.map((item)=>{
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              };
            };
            return item;
          }));
        }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favoritesItems.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6156207ce039a0001725a920.mockapi.io/favorites/${obj.id}`
        );
      } else {
        await axios.post(
          "https://6156207ce039a0001725a920.mockapi.io/favorites",
          obj
        );
        setFavoritesItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6156207ce039a0001725a920.mockapi.io/Cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert("Ошибка при удалении из корзины");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };
  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoritesItems,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />
        <Header onCLickCart={() => setCartOpened(true)} />

        <Route path="" exact>
          <Home
            cartItems={cartItems}
            items={items}
            searchValue={searchValue}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            onChangeSearchInput={onChangeSearchInput}
            isLoading={isLoading}
          />
        </Route>
        <Route path="favorites">
          <Favorites />
        </Route>

        <Route path="orders">
          <Orders />
        </Route>

        
      </div>
    </AppContext.Provider>
  );
}

export default App;
