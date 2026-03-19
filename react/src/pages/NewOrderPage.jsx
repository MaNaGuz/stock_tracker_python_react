import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, fetchProducts } from "../api";

export default function NewOrderPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([])

  useEffect(() => {
      async function loadProducts() {
        const data = await fetchProducts();
        setProducts(data.data);
      }
      loadProducts();
    }, []);

  const [formData, setFormData] = useState({
    customer: "",
    product_name: "",
    quantity: 1,
    status: "active",
    created_at: "2026-03-11",
  });

  function handleSelectedChange(e){
    setFormData((prev) => ({
      ...prev,
      product_name: e.target.value,
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createOrder(formData);
    navigate("/orders");
  }

  return (
    <div>
      <h1>New Order</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>Customer</label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Product</label>
          <select 
            style={{ display: "block", width: "100%", padding: "8px" }}
            value={formData.product_name} onChange={handleSelectedChange}>
            <option value="" key=""></option>
            {products.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div>

        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}