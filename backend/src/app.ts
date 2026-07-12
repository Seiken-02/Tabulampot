import express from "express";
import dotenv from "dotenv";
import protectedRoutes from "./routes/protected.route";

import authRoutes from "./routes/auth.route";
import testRoutes from "./routes/test.route";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/protected", protectedRoutes);

app.get("/", (req, res) => {
  res.send("Tabulampot Backend Running");
});

export default app;