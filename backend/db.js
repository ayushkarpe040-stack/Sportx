const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
        console.log("Error code:", err.code);
        return;
    }

    console.log("MySQL connected successfully!");

    connection.release();
});

module.exports = db;