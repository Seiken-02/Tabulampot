import express from "express";
import cors from "cors";
import protectedRoutes from "./routes/protected.route";

import authRoutes from "./routes/auth.route";
import testRoutes from "./routes/test.route";
import plantRoutes from "./routes/plant.route";
import plantTypeRoutes from "./routes/plant-type.route";
import dashboardRoutes from "./routes/dashboard.route";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/plant-types", plantTypeRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Tabulampot Backend Running");
});

export default app;