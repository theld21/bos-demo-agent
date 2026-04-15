IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'laravel')
BEGIN
    CREATE DATABASE laravel;
END
GO
