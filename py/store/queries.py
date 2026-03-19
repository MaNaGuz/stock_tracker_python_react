NEW_ORDR_QRY = """
    INSERT INTO
        orders
        (order_number, product_id, quantity, customer_name)
    VALUES
        (?, ?, ?, ?)
"""


NEW_ITEM_QRY = """
    INSERT INTO
        stock
        (product_name, quantity, unit_price)
    VALUES
        (?, ?, ?)
"""


ALL_STOCK_QRY = """
    SELECT
        product_name, quantity, unit_price
    FROM
        stock
"""


ORDR_QRY = """
    SELECT
        order_number, customer_name, product_id, quantity, status, created_at
    FROM
        orders
    WHERE
        order_number = ?
"""


UPDT_ORDR_QRY = """
    UPDATE
        orders
    SET
        status = ?
    WHERE
        order_number = ?
"""


ALL_ORDRS_QRY = """
    SELECT
        order_number, customer_name, product_id, quantity, status, created_at
    FROM
        orders
"""


ACTV_ORDRS_QRY = """
    SELECT
        order_number, customer_name, product_id, quantity, status, created_at
    FROM
        orders
    WHERE
        status IN ('pending', 'active')
"""


PAST_ORDRS_QRY = """
    SELECT
        order_number, customer_name, product_id, quantity, status, created_at
    FROM
        orders
    WHERE
        status IN ('cancelled', 'completed')
"""


STOCK_VALDTN_QRY = """
    SELECT
        id, quantity, product_name
    FROM
        stock
    WHERE
        product_name = ?
"""


STOCK_PRDCTS_QRY = """
    SELECT
        DISTINCT (product_name)
    FROM
        stock
"""


def prdcts_names_qry(ids):
    query = f"""
        SELECT
            product_name
        FROM
            stock
        WHERE
            id
                IN
            ({','.join(ids)})
    """
    return query