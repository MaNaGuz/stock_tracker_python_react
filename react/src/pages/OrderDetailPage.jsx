import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderById, updateOrderStatus } from "../api";

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState("")
  const [order, setOrder] = useState(null);
  const products = [
    "pending",
    "active",
    "cancelled",
    "completed",
  ]

  function handleSelectedChange(e){
    setStatus(e.target.value);
    e.target.value !== order.status ? setShowButton(true) : setShowButton(false);
  }

  async function loadOrder() {
    const data = await fetchOrderById(id);
    setOrder(data.data);
    setStatus(data.data.status);
  }

  async function updateStatus() {
    await updateOrderStatus(id, status);
    loadOrder();
    navigate("/orders");
  }

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (!order) {
    return <p>Loading...</p>;
  }

  if (order.error) {
    return <p>{order.error}</p>;
  }

  return (
    <div>
      <h1>Order Detail</h1>
      <p><strong>ID:</strong> {order.order_number}</p>
      <p><strong>Customer:</strong> {order.customer_name}</p>
      <p><strong>Product:</strong> {order.product_name}</p>
      <p><strong>Quantity:</strong> {order.quantity}</p>
      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}><strong>Status:</strong>
        <select 
          style={{ padding: "8px" }}
          value={status} onChange={handleSelectedChange}>
          {products.map((item) => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
      </p>
      <p><strong>Created:</strong> {order.created_at}</p>

      {showButton && (
        <button onClick={updateStatus}>Update Status</button>
      )}
    </div>
    
  );
}