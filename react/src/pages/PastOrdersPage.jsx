import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPastOrders } from "../api";

export default function PastOrdersPage() {
  const [orders, setOrders] = useState([]);

 useEffect(() => {
   async function loadData() {
     const data = await fetchPastOrders();
     setOrders(data.data);
   }

   loadData();
 }, []);

  return (
    <div>
      <h1>Past Orders</h1>

      {orders.length === 0 ? (
        <p>No past orders.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.order_number}>
              #{order.number} - {order.customer_name} - {order.product_name} ({order.quantity}) - {order.status}{" "}
              <Link to={`/orders/${order.id}`}>View</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}