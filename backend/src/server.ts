import 'dotenv/config';
import app from "./app";

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("Backend Tabulampot Running");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});