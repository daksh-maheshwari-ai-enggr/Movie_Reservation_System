import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models.js";

const token = (u) =>
  jwt.sign(
    { id: u._id, name: u.name, email: u.email, role: u.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Name, email and password required" });
    const u = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    res
      .status(201)
      .json({
        token: token(u),
        user: { id: u._id, name: u.name, email: u.email, role: u.role },
      });
  } catch (e) {
    res.status(400).json({ message: "Email already registered" });
  }
};

export const login = async (req, res) => {
  const u = await User.findOne({ email: req.body.email?.toLowerCase() });
  if (!u || !(await bcrypt.compare(req.body.password || "", u.password)))
    return res.status(401).json({ message: "Invalid email or password" });
  res.json({
    token: token(u),
    user: { id: u._id, name: u.name, email: u.email, role: u.role },
  });
};
