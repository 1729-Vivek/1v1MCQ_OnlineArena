const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//using middleware

app.use(bodyParser.json());

require('./config/middlewareConfig')(app)

mongoose
  .connect("mongodb://localhost:27017/mcq_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Routes
const userRoutes = require("./routes/user");
const mcqRoutes = require("./routes/mcq");
app.use("/api/users", userRoutes);
app.use("/api/mcqs", mcqRoutes);


const errorHandler=require('./middlewares/errorHandler')
app.use(errorHandler)

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running  on port ${PORT}`));
