import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import OrdersPage from "./pages/OrdersPage";
import NewOrderPage from "./pages/NewOrderPage";
import ActiveOrdersPage from "./pages/ActiveOrdersPage";
import PastOrdersPage from "./pages/PastOrdersPage";
import StockPage from "./pages/StockPage";
import NewStockItemPage from "./pages/NewStockItemPage"
import OrderDetailPage from "./pages/OrderDetailPage";

function Orders() {
  return <h1>Orders page</h1>;
}

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/orders" replace />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/new" element={<NewOrderPage />}/>
            <Route path="orders/active" element={<ActiveOrdersPage />}/>
            <Route path="orders/past" element={<PastOrdersPage />}/>
            <Route path="orders/:id" element={<OrderDetailPage />}/>
            <Route path="stock" element={<StockPage />}/>
            <Route path="stock/new" element={<NewStockItemPage />}/>
        </Route>
    </Routes>
  );
}