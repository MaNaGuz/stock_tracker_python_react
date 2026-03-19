import os
import json
import uuid
import sqlite3
from sqlite3 import IntegrityError
import traceback
from pathlib import Path

from flask import Flask, request, render_template
from flask_cors import CORS

from .queries import \
    NEW_ORDR_QRY, \
    NEW_ITEM_QRY, \
    STOCK_VALDTN_QRY, \
    ALL_STOCK_QRY, \
    STOCK_PRDCTS_QRY, \
    ALL_ORDRS_QRY, \
    ORDR_QRY, \
    UPDT_ORDR_QRY, \
    ACTV_ORDRS_QRY, \
    PAST_ORDRS_QRY, \
    prdcts_names_qry

app = Flask(__name__)

CORS(app)

DB_PATH = Path("../data/orders.db")
print("Using DB:", DB_PATH.resolve())


@app.route("/")
def home():
    return render_template(
        "index.html"
    )

@app.route("/orders", methods=["GET"])
def orders():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute(ALL_ORDRS_QRY)
        rows = cursor.fetchmany(50)

        data = [{
            "order_number": x[0],
            "customer_name": x[1],
            "product_name": x[2],
            "quantity": x[3],
            "status": x[4],
            "created_at": x[5],
        } for x in rows]

        products = [str(list(x.values())[2]) for x in data]

        cursor.execute(prdcts_names_qry(products))
        rows = cursor.fetchall()

        for i, row in enumerate(rows):
            data[i]["product_name"] = row[0]
        
        return {
            "data": data,
            "message": "Successfully queried orders",
            "error": False
        }
    except:
        traceback.print_exc()
        return {
            "message": "Failed to fetch orders",
            "error": True
        }


@app.route("/orders/<string:order_id>", methods=["GET"])
def get_order(order_id):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute(ORDR_QRY, (order_id, ))
        order = cursor.fetchone()

        product = str(order[2])

        cursor.execute(prdcts_names_qry([product]))
        product_name = cursor.fetchone()[0]

        data = {
            "order_number": order[0],
            "customer_name": order[1],
            "product_name": product_name,
            "quantity": order[3],
            "status": order[4],
            "created_at": order[5]
        }
        
        return {
            "data": data,
            "message": "Successfully queried orders",
            "error": False
        }
    except:
        traceback.print_exc()
        return {
            "message": "Failed to fetch orders",
            "error": True
        }
    

@app.route("/orders/new", methods=["POST"])
def new_ordr():
    data = request.get_json()
    prdct = data["product_name"]    

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute(STOCK_VALDTN_QRY, (prdct, ))
        available = cursor.fetchone()
    except:
        traceback.print_exc()
        if conn:
            conn.close()
        return {
            "message": "failed to verify available stock!",
            "error": True
        }
    if len(available) and available[1] > 0:
        try:
            cursor.execute(
                NEW_ORDR_QRY,
                (
                    str(uuid.uuid4()),
                    available[0],
                    data["quantity"],
                    data["customer"],
                )
            )
            conn.commit()
            conn.close()
            return {
                "message": "Successfully Added Order",
                "error": False
            }
        except:
            traceback.print_exc()
            if conn:
                conn.close()
            return {
                "message": "Failed to create order",
                "error": True
            }
    else:
        conn.close()
        return {
            "message": "No available stock!",
            "error": True
        }


@app.route("/orders/update", methods=["PUT"])
def updt_ordr():
    data = request.get_json()
    status = data["status"]
    ordr_nmbr = data["order_number"]

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute(UPDT_ORDR_QRY, (status, ordr_nmbr))
        conn.commit()
        conn.close()
        return {
            "message": "successfully updated status",
            "error": False
        }
    except:
        traceback.print_exc()
        if conn:
            conn.close()
        return {
            "message": "failed to update status!",
            "error": True
        }


@app.route("/orders/active", methods=["GET"])
def actv_ordrs():

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute(ACTV_ORDRS_QRY)
        ordrs = cursor.fetchmany(50)

        data = [{
            "order_number": x[0],
            "customer_name": x[1],
            "product_name": x[2],
            "quantity": x[3],
            "status": x[4],
            "created_at": x[5],
        } for x in ordrs]

        products = [str(list(x.values())[2]) for x in data]

        cursor.execute(prdcts_names_qry(products))
        rows = cursor.fetchall()

        for i, row in enumerate(rows):
            data[i]["product_name"] = row[0]

        conn.close()
        return {
            "data": data,
            "message": "successfully fetched active orders",
            "error": False
        }
    except:
        traceback.print_exc()
        if conn:
            conn.close()
        return {
            "message": "failed to fetch active orders!",
            "error": True
        }
    

@app.route("/orders/past", methods=["GET"])
def past_ordrs():

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute(PAST_ORDRS_QRY)
        ordrs = cursor.fetchmany(50)

        data = [{
            "order_number": x[0],
            "customer_name": x[1],
            "product_name": x[2],
            "quantity": x[3],
            "status": x[4],
            "created_at": x[5],
        } for x in ordrs]

        products = [str(list(x.values())[2]) for x in data]

        cursor.execute(prdcts_names_qry(products))
        rows = cursor.fetchall()

        for i, row in enumerate(rows):
            data[i]["product_name"] = row[0]

        conn.close()
        return {
            "data": data,
            "message": "successfully fetched active orders",
            "error": False
        }
    except:
        traceback.print_exc()
        if conn:
            conn.close()
        return {
            "message": "failed to fetch past orders!",
            "error": True
        }
    

@app.route("/stock/new", methods=["POST"])
def new_item():
    print("Using DB:", DB_PATH.resolve())
    data = request.get_json()
    prdct = data["product_name"]
    quant = data["quantity"]
    unt_prc = data["unit_price"]
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(NEW_ITEM_QRY, (prdct, quant, unt_prc))
        conn.commit()
        conn.close()
        return {
            "message": "New item created",
            "error": False
        }
    except IntegrityError:
        return {
            "message": "Item already exist!",
            "error": True
        }
    except:
        traceback.print_exc()
        return {
            "message": "Failed to create new item",
            "error": True
        }


@app.route("/stock/products", methods=["GET"])
def get_products():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(STOCK_PRDCTS_QRY)
        return {
            "data": [x[0] for x in cursor.fetchall()],
            "message": "Successfully Added Order",
            "error": False
        }
    except:
        traceback.print_exc()
        return {
            "message": "Error querying all stock",
            "error": True
        }


@app.route("/stock/", methods=["GET"])
def get_all_stock():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(ALL_STOCK_QRY)
        return {
            "data": [{
                "product_name": x[0],
                "quantity": x[1],
                "unit_price": x[2]
            } for x in cursor],
            "message": "Successfully queried stock",
            "error": False
        }
    except:
        traceback.print_exc()
        return {
            "message": "Failed to fetch stock",
            "error": True
        }


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)