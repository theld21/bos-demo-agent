FROM mcr.microsoft.com/mssql/server:2022-latest

USER root
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY setup.sql .
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

USER mssql

ENTRYPOINT ["./entrypoint.sh"]
