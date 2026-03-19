FROM alpine

RUN apk add --no-cache python3 py3-pip

WORKDIR /opt/store

COPY config/ /opt/store/config
COPY store/ /opt/store

RUN mkdir -p /opt/store/data

RUN pip install --no-cache-dir -r config/requirements.txt

RUN python3 db_create.py

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]