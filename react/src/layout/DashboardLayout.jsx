import { Link, Outlet, useLocation } from "react-router-dom";

const linkStyle = {
  display: "block",
  padding: "10px 12px",
  marginBottom: "8px",
  textDecoration: "none",
  color: "#222",
  borderRadius: "8px",
};

export default function DashboardLayout() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <aside
        style={{
          width: "240px",
          padding: "20px",
          background: "#f4f4f4",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Stock Tracker</h2>

        <Link
          to="/orders"
          style={{
            ...linkStyle,
            background: isActive("/orders") ? "#ddd" : "transparent",
          }}
        >
          All Orders
        </Link>

        <Link
          to="/orders/new"
          style={{
            ...linkStyle,
            background: isActive("/orders/new") ? "#ddd" : "transparent",
          }}
        >
          New Order
        </Link>

        <Link
          to="/orders/active"
          style={{
            ...linkStyle,
            background: isActive("/orders/active") ? "#ddd" : "transparent",
          }}
        >
          Active Orders
        </Link>

        <Link
          to="/orders/past"
          style={{
            ...linkStyle,
            background: isActive("/orders/past") ? "#ddd" : "transparent",
          }}
        >
          Past Orders
        </Link>

        <Link
          to="/stock"
          style={{
            ...linkStyle,
            background: isActive("/stock") ? "#ddd" : "transparent",
          }}
        >
          Stock
        </Link>

        <Link
          to="/stock/new"
          style={{
            ...linkStyle,
            background: isActive("/stock/new") ? "#ddd" : "transparent",
          }}
        >
          New Stock Item
        </Link>
      </aside>

      <main style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}