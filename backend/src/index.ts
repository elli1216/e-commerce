import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.route";
import prodRoute from "./routes/product.route";
import orderRoute from "./routes/order.route";
import cartRoute from "./routes/cart.route";
import userRoute from "./routes/user.route";
import path from "path";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoute);
app.use("/api", prodRoute);
app.use("/api", orderRoute);
app.use("/api", cartRoute);
app.use("/api", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
