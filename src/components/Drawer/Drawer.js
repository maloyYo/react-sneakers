import React from "react";

import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss"

const delay = (ms) => new Promise((resolve)=>setTimeout(resolve,ms));

  function Drawer({ onClose, onRemove, items = [], opened }) {
  const {cartItems,setCartItems,totalPrice} = useCart();

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const [orderId, setOrderId] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  


  const onCLickOrder = async() => {
    try {
      setIsLoading(true);
      const {data} = await axios.post("https://6156207ce039a0001725a920.mockapi.io/Orders", {
        items: cartItems,
      })
      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://6156207ce039a0001725a920.mockapi.io/Cart/"+item.id)
        await delay(1000);
      }

    } catch (error) {
      alert('Ошибка при создании заказа :(')
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible:''}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="cu-p"
            src="img/btn-remove.svg"
            alt="remove"
            onClick={onClose}
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice*0.05)} руб.</b>
                </li>
              </ul>
              <button className="greenButton" onClick={onCLickOrder} disabled={isLoading}>
                Оформить заказ <img src='img/arrow.svg' alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотяб одну пару кроссовок, чтобы сделать заказ"
            }
            image={
              isOrderComplete ? 'img/completeOrder.jpg' : 'img/emptyCart.jpg'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
