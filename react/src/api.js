const API_BASE = "";


export async function fetchOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    return res.json();
}

export async function updateOrderStatus(id, status) {
    const res = await fetch(`${API_BASE}/orders/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "order_number": id,
            "status": status
        })
    });
    return res.json();
}

export async function createOrder(form) {
    const res = await fetch(`${API_BASE}/orders/new`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    });
    return res.json();
}

export async function createItem(form) {
    const res = await fetch(`${API_BASE}/stock/new`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
    });
}

export async function fetchActiveOrders(id) {
    const res = await fetch(`${API_BASE}/orders/active`);
    return res.json();
}

export async function fetchPastOrders(id) {
    const res = await fetch(`${API_BASE}/orders/past`);
    return res.json();
}

export async function fetchStock() {
    const res = await fetch(`${API_BASE}/stock`, {
        method: "GET",
        headers: {},
    });
    return res.json();
}

export async function fetchProducts() {
    const res = await fetch(`${API_BASE}/stock/products`, {
        method: "GET",
        headers: {},
    });
    return res.json();
}

export async function fetchOrderById(id) {
    const res = await fetch(`${API_BASE}/orders/${id}`,{
        method: "GET",
        headers: {},
    });
    return res.json();
}