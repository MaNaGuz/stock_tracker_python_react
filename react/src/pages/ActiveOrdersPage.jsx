import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchActiveOrders } from "../api";

export default function ActiveOrdersPage() {
  const [orders, setOrders] = useState([]);

 useEffect(() => {
   async function loadData() {
     const data = await fetchActiveOrders();
     setOrders(data.data);
   }

   loadData();
 }, []);

  return (
    <div>
      <h1>Active Orders</h1>

      {orders.length === 0 ? (
        <p>No active orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.order_number}>
              #{order.order_number} - {order.customer_name} - {order.product_name} ({order.quantity}) - {order.status}{" "}
              <Link to={`/orders/${order.order_number}`}>View</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}