import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const registerController = async (req, res) => {
  console.log("Solicitud recibida en /auth/register:", req.body);
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    /* hash de contraseña */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* Creación del usuario en DB */
    await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
