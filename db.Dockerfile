FROM postgres:16

ENV DB_USER=worksong \
    DB_NAME=worksongdb \
    DB_PASSWORD=worksong \
    DB_PORT=5432

VOLUME /var/lib/postgresql/data

EXPOSE 5432