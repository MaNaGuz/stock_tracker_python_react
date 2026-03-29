FROM alpine

RUN apk add --no-cache python3 py3-pip

RUN python3 -m venv /venv

ENV PATH="/venv/bin:$PATH" 

WORKDIR /opt/store

RUN mkdir -p /opt/store/data

COPY config/ /opt/store/config
COPY store/ /opt/store/py

RUN pip install --no-cache-dir -r config/requirements.txt

EXPOSE 5000

CMD [ \
    "gunicorn", \
    "-b", "0.0.0.0:5001", \
    "--log-level", "info", \
    "--access-logfile", "-", \
    "--error-logfile", "-", \
    "py.app:app" \
]
