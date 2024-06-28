const pool = require("../db/database");

module.exports = {
    create:(data, callback) => {
        // const S_ID = data.user;
        console.log(data);
        pool.query(
            'INSERT INTO QUERY (S_ID, QUESTION) VALUES (?, ?)',
            [
                data.user,
                data.QUESTION
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    resolve:(data, callback) => {
        pool.query(
            'UPDATE Query SET QUES_STATUS = 0 WHERE Q_ID =(?)',
            [
                data.Q_ID,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getFarmerChat:(data, callback) => {
        pool.query(
            'SELECT * FROM Query WHERE S_ID = (?)',
            [
                data.user,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ExpertsAnswer:(data, callback) => {
        pool.query(
            'INSERT INTO QUERYSANSWER (Q_ID, ID, ANSWER, USER_TYPE) VALUES (?, ?, ?, ?)',
            [
                data.Q_ID,
                data.user,
                data.ANSWER,
                data.USER_TYPE,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ExpertsAnswer:(data, callback) => {
        pool.query(
            'INSERT INTO QUERYSANSWER (Q_ID, ID, ANSWER, USER_TYPE) VALUES (?, ?, ?, ?)',
            [
                data.Q_ID,
                data.user,
                data.ANSWER,
                data.USER_TYPE,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    fullConvo: (data, callback) => {
        pool.query(
            `SELECT QA.ANSWER, QA.USER_TYPE,
            CASE 
                WHEN QA.USER_TYPE = 'EXPERT' THEN E.NAME
                WHEN QA.USER_TYPE = 'FARMER' THEN F.NAME
            END AS USER_NAME,
            Q.QUESTION
        FROM QuerySAnswer QA
        LEFT JOIN Expert E ON QA.ID = E.ID AND QA.USER_TYPE = 'EXPERT'
        LEFT JOIN Farmer F ON QA.ID = F.ID AND QA.USER_TYPE = 'FARMER'
        JOIN Query Q ON QA.Q_ID = Q.Q_ID
        WHERE QA.Q_ID = ?`,
            [
                data.Q_ID,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getQuestion:(data, callback) => {
        pool.query(
            'SELECT Q.QUESTION, Q.QUES_STATUS FROM Query Q WHERE Q.Q_ID = ?',
            [
                data.Q_ID
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAll: callback => {
        pool.query(
            'SELECT * FROM Query WHERE QUES_STATUS = 1',
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
};