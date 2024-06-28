// const axios = require('axios');

// const authMiddleware = async (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ success: 0, msg: "No token, authorization denied" });
//     }

//     // try {
//         // Fetch user ID by hitting the endpoint
//         const response = await axios.get('http://localhost:8080/user/id', {
//             headers: { Authorization: token }
//         });

//         req.user = { id: response.data.id };
//         next();
//     // } 
//     // catch (err) {
//     //     console.error('Error during authentication:', err.message);
//     //     res.status(401).json({ success: 0, msg: "Token is not valid or error in fetching user ID" });
//     // }
// };

// module.exports = authMiddleware;

// const fetch = require('node-fetch');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ success: 0, msg: "No token, authorization denied" });
    }

    try {
        // Fetch user ID by hitting the endpoint
        const response = await fetch('http://localhost:8080/user/id', {
            method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        if (!response.ok) {
            throw new Error('Error fetching user ID');
        }

        const data = await response.json();
        console.log(data);
        req.user = { id: data.id };
        next();
    } catch (err) {
        console.error('Error during authentication:', err.message);
        res.status(401).json({ success: 0, msg: "Token is not valid or error in fetching user ID" });
    }
};

module.exports = authMiddleware;
