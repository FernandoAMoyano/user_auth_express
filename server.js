import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

//  carpeta "public" como raíz de los archivos estáticos
app.use(express.static("public"));

app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
