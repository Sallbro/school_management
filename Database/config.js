const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT 
});

// try {
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS schools (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         address VARCHAR(255) NOT NULL,
//         latitude FLOAT NOT NULL,
//         longitude FLOAT NOT NULL
//       );
//     `;

//     connection.execute(createTableQuery);
//     console.log('Table "schools" created successfully.');
// } catch (error) {
//     console.error('Error creating table:', error);
// }

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL on Aiven');
});

module.exports = connection;