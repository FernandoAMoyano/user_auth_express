import { Router } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const prisma = new PrismaClient();
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

/* Controlador de registro */
router.post("/register", async (req, res) => {
  console.log("Solicitud recibida en /auth/register:", req.body);
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

/* Controlador de inicio de sesion */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    /* Si no existe usuario o no coincide la contraseña */
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "credenciales invalidas" });
    }

    /* Firmar token */
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    /* Se establece el token en la cookie */
    res.cookie("token", token, { httpOnly: true });
    res.json({ message: "Inicio de session exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});
