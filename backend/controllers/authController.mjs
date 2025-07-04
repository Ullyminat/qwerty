import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.mjs";
import Card from "../models/card.mjs";

export default class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const payload = { id: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
      });

      res.status(201).json({ user: { id: user._id, name: user.name } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const payload = { id: user._id, role: user.role };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600000,
      });

      res.json({ user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    res.clearCookie("token");
    res.json({ msg: "Logged out successfully" });
  }

  static async me(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}