import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import hspRout from "./hospital/hospital.mjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
const PORT = process.env.PORT || 4001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: " http://localhost:5173" }));
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to Database");
      console.log(`Server is listrening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(morgan("tiny"));
app.use(hspRout);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client//dist/index.html"));
});
