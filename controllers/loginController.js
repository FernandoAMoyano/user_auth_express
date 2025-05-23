import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loginController = async (req, res) => {
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
};
