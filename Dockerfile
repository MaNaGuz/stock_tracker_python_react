FROM node:alpine AS builder

WORKDIR /app
COPY react/package*.json ./
RUN npm install

COPY react/. ./
RUN npm run build

#----------------------------------------------------

FROM alpine

RUN apk add --no-cache python3 py3-pip
RUN apk add --no-cache nginx

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

RUN python3 -m venv /venv

ENV PATH="/venv/bin:$PATH" 

WORKDIR /opt/store

COPY config/ /opt/store/config
COPY py/ /opt/store/py
COPY scripts/start.sh /opt/store/scripts/start.sh

RUN mkdir -p /opt/store/data

RUN pip install -r config/requirements.txt

CMD ["sh", "scripts/start.sh"]
