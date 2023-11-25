import dotenv from 'dotenv';
dotenv.config();

// Constant Vars
export const mysql_port = Number(process.env.MYSQL_PORT);
export const mysql_host = String(process.env.MYSQL_HOST);
export const mysql_database = String(process.env.MYSQL_DATABASE);
export const mysql_user = String(process.env.MYSQL_USER);
export const mysql_password = String(process.env.MYSQL_PASSWORD);
export const mysql_pool_connection_limit = Number(process.env.MYSQL_POOL_CONNECTION_LIMIT);

export const mysql_options = {
    host: mysql_host,
    port: mysql_port,
    database: mysql_database,
    user: mysql_user,
    password: mysql_password,
    connectionLimit: mysql_pool_connection_limit
};

