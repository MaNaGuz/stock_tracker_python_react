import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders, updateOrderStatus } from "../api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

   async function loadOrders() {
     const data = await fetchOrders();
     setOrders(data.data);
   }

   useEffect(() => {
     loadOrders();
   }, []);

  return (
    <div>
      <h1>All Orders</h1>

      <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th align="left">ID</th>
            <th align="left">Customer</th>
            <th align="left">Product</th>
            <th align="left">Qty</th>
            <th align="left">Status</th>
            <th align="left">Created at</th>
            <th align="left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_number} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{order.order_number}</td>
              <td>{order.customer_name}</td>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>{order.created_at}</td>
              <td>
                <Link to={`/orders/${order.order_number}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}