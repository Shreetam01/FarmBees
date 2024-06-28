require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors"); 
const chatRouter = require("./routes/chat.router");
const authMiddleware = require("./Middleware/authMiddleware");


app.use(express.json());
app.use(cors());

app.use("/api/chat",authMiddleware, chatRouter);


app.listen(5000, () => {
    console.log("Server is running on port", 5050);
});
