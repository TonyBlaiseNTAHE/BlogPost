import express from "express";
import mangoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

mangoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MangoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

/*app.use(express.json());*/

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.use("/api/user", userRoutes);
