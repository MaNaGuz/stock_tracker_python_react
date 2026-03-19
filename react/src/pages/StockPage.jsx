import { useEffect, useState } from "react";
import { fetchStock } from "../api";

export default function StockPage() {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function loadStock() {
      const data = await fetchStock();
      setStock(data.data);
    }

    loadStock();
  }, []);

  return (
    <div>
      <h1>Stock</h1>

      <table width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th align="left">Product Name</th>
            <th align="left">Quantity</th>
            <th align="left">Unit Price</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.product_name} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{item.product_name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}