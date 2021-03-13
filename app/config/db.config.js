const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT || '3306';
const user = process.env.DATABASE_USER || 'user';
const password = process.env.DATABASE_PASSWORD || 'password';
const database = process.env.DATABASE_NAME || 'book-store';

module.exports = {
    HOST: host,
    PORT: port,
    USER: user,
    PASSWORD: password,
    DB: database,
    dialect: 'mysql',
    pool: {
        max: 5,          // Maximum number of connection in pool
        min: 0,          // Minimum number of connection in pool
        idle: 10000,     // Maximum time, in milliseconds, that a connection can be idle before being released
        acquire: 30000,  // Maximum time, in milliseconds, that pool will try to get connection before throwing error
    }
};