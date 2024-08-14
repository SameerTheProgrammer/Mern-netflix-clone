const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require("cors");

let isDbConneted = false;

dotenv.config();
app.use(cors())
const PORT = process.env.PORT || 4000
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    isDbConneted = true
    console.log("DB Connection Successfull")
  })
  .catch((err) => {
    isDbConneted = false
    console.error(err);
  });

app.use(express.json());
app.get("/",(req,res)=>{
  res.json({isDbConneted, message:"hello" })
})
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(PORT, () => {
  console.log("Backend server is running!");
});
