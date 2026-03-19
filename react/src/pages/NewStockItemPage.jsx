import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../api";

export default function NewStockItemPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: "",
    sku: "",
    quantity: 1,
    status: "active",
    unit_price: 0,
    created_at: "2026-03-11",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
      [name]: name === "unit_price" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await createItem(formData);
    navigate("/stock");
  }

  return (
    <div>
      <h1>New Item</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div>

        {/* <div style={{ marginBottom: "12px" }}>
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div> */}

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

        <div style={{ marginBottom: "12px" }}>
          <label>Unit Price</label>
          <input
            type="number"
            name="unit_price"
            value={formData.unit_price}
            onChange={handleChange}
            min="0"
            style={{ display: "block", width: "100%", padding: "8px" }}
            required
          />
        </div>

        <button type="submit">Create Item</button>
      </form>
    </div>
  );
}