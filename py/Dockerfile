FROM alpine

RUN apk add --no-cache python3 py3-pip

RUN python3 -m venv /venv

ENV PATH="/venv/bin:$PATH" 

WORKDIR /opt/store

COPY config/ /opt/store/config
COPY store/ /opt/store/py

RUN pip install --no-cache-dir -r config/requirements.txt

RUN python3 py/db_create.py > db_create.out

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "py.app:app"]