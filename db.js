const mysql = require("mysql2");
const dbConfig = require("./db.config");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

// open the MySQL connection
connection.connect((error) => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// create schema & tables
connection.query(
    `CREATE DATABASE IF NOT EXISTS web;`,
    function (err, data, fields) {
        if (err) {
            throw new Error(err.message);
        } else {
            console.log("database `web` was created");
        }
    }
);

connection.query(`USE web;`, function (err, data, fields) {
    if (err) {
        throw new Error(err.message);
    } else {
        console.log("selected `web` schema");
    }
});

connection.query(
    `CREATE TABLE IF NOT EXISTS reviews (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    phone_number varchar(30) NOT NULL,
    email varchar(100) NOT NULL,
    review text NOT NULL,
    PRIMARY KEY (id)
);`,
    function (err, data, fields) {
        if (err) {
            throw new Error(err.message);
        } else {
            console.log("created `reviews` table");
        }
    }
);

const names = [
    "Avi Cohen",
    "Dana Levy",
    "Sara Siman Tov",
    "Oleg Demitrov",
    "Gil Peleg",
    "Dolev Haziza"
];

connection.query(
    `SELECT COUNT(*) as count FROM reviews;`,
    function (err, data, fields) {
        if (err) {
            throw new Error(err.message);
        } else {
            const response = JSON.parse(JSON.stringify(data));
            if (response[0].count === 0) {
                // insert reviews
                console.log(
                    "`reviews` table is empty, Need to insert some reviews to `reviews` table"
                );
                const reviews = [
                    {
                        id: 1,
                        name: names[Math.floor(Math.random()*names.length)],
                        phone_number: "054189658",
                        email: "054189658@gmail.com",
                        review: "האתר מעולה ונותן הרבה מידע",
                    },
                    {
                        id: 2,
                        name: names[Math.floor(Math.random()*names.length)],
                        phone_number: "0526589932",
                        email: "0526589932@gmail.com",
                        review: "אהבתי את האתר",
                    },
                    {
                        id: 3,
                        name: names[Math.floor(Math.random()*names.length)],
                        phone_number: "0505528693",
                        email: "0505528693@gmail.com",
                        review: "אחלה אתר",
                    },
                    {
                        id: 4,
                        name: names[Math.floor(Math.random()*names.length)],
                        phone_number: "0526684259",
                        email: "0526684259@gmail.com",
                        review: "האתר נוח לשימוש",
                    },
                    {
                        id: 5,
                        name: names[Math.floor(Math.random()*names.length)],
                        phone_number: "0546637852",
                        email: "0546637852@gmail.com",
                        review: "בעתיד אפשר להוסיף גם מחירי דירות ביישוב",
                    },
                    {
                        id: 6,
                        name: names[Math.floor(Math.random()*names.length)],
                        phone_number: "0548892256",
                        email: "0548892256@gmail.com",
                        review: "נהנתי מאוד",
                    },
                    {
                        id: 7,
                        name: names[Math.floor(Math.random()*names.length)],
                        phone_number: "0548996622",
                        email: "0548996622@gmail.com",
                        review: "החלטתי לעבור לאחד היישובים המזכים בגלל האתר",
                    },
                ];

                for (let i = 0; i < reviews.length; i++) {
                    const review = reviews[i];
                    connection.query(
                        `INSERT INTO reviews(id, name, phone_number, email, review) 
                    VALUES (${review.id},'${review.name}','${review.phone_number}','${review.email}','${review.review}')`,

                        function (err, data, fields) {
                            if (err) {
                                throw new Error(err.message);
                            } else {
                                console.log(
                                    `Added review with id: ${review.id} to \`reviews\` table`
                                );
                            }
                        }
                    );
                }
            } else {
                console.log("No need to insert data to `reviews` table");
            }
        }
    }
);

module.exports = connection;
