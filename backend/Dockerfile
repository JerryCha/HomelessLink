FROM python:3.6-alpine

RUN apk update && apk upgrade \
    && apk add postgresql-client \
        bash \
        postgresql-dev \
        musl-dev \
        gcc \
        libxml2-dev \
        libxslt-dev \
        linux-headers \
        gettext-dev \
        jpeg-dev \
    && apk add --repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
        libcrypto1.1 \
    && apk add \
        --no-cache \
        gdal \
        geos \
        proj

# python envs
ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

# python dependencies
COPY ./requirements.txt /
RUN pip install -r ./requirements.txt

# upload scripts
COPY ./scripts/entrypoint.sh ./scripts/start.sh ./scripts/gunicorn.sh /

WORKDIR /app
