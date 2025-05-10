import express, { Request, Response } from 'express';
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});
