import sqlite3
from pathlib import Path

DB_PATH = Path("../data/orders.db")
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

def create_db():
    print("Using DB:", DB_PATH.resolve())
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS stock (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_name TEXT NOT NULL UNIQUE,
            quantity INTEGER NOT NULL DEFAULT 0,
            unit_price REAL NOT NULL DEFAULT 0.0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_number TEXT NOT NULL UNIQUE,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            customer_name TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (product_id) REFERENCES stock(id)
        )
    """)

    conn.commit()
    conn.close()
    print(f"Database created at {DB_PATH.resolve()}")

if __name__ == "__main__":
    create_db()