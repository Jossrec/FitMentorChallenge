import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (_, res) => res.send("API OK"));
app.listen(process.env.PORT || 3000, () =>
  console.log(`API on http://localhost:${process.env.PORT || 3000}`)
);
