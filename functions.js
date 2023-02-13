const connection = require("./db");

exports.getReviews = (req, res) => {
    const { sortBy, sortOrder } = req.query;
    sql = `SELECT * FROM reviews`;
    
    if (sortBy && sortOrder) {
        sql += ` ORDER BY ${sortBy} ${sortOrder}`;
    }

    connection.query(sql, function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ data });
        }
    });
};

exports.createReview = (req, res) => {
    const review = {
        email: req.body.email,
        name: req.body.name,
        phone_number: req.body.phone_number,
        review: req.body.review,
    };
    connection.query(
        `INSERT INTO reviews(email, name, phone_number, review) VALUES ('${review.email}','${review.name}','${review.phone_number}','${review.review}')`,
        (err, mysqlres) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({
                    message: `created new review with id: ${mysqlres.insertId}`,
                });
            }
        }
    );
};

exports.calculatePoints = (req, res) => {
    let points = 0;

    const data = {
        gender: req.body.gender,
        status: req.body.status,
        numOfKids: req.body.numOfKids,
        income: req.body.income,
    };

    if (data.gender === "female") {
        points += 2.5;
    } else {
        points += 1.5;
    }

    if (data.status === "married") {
        points += 2;
    }

    points += +data.numOfKids;

    res.status(200).json({ points });
};