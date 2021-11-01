import React from "react";
import Card from "../components/Card/Card";

import axios from "axios";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        (async () =>{
            try {
                const {data} = await axios.get("https://6156207ce039a0001725a920.mockapi.io/Orders");
                setOrders(data.map((obj)=>obj.items).flat());
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказа');
            }
        })();
    },[])

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
      {(isLoading ? [...Array(8)] : orders).map((item, index) => (
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Orders;
