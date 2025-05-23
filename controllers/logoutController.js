export const logoutController = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
};
