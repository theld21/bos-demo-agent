#!/bin/bash

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &
PID=$!

# Wait for SQL Server to start
echo "Waiting for MS SQL Server to be ready..."
sleep 15s

# Run the setup script to create database
/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$MSSQL_SA_PASSWORD" -C -i setup.sql

# Wait for the SQL Server process so the container doesn't exit
wait $PID
