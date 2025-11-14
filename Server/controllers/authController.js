import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";


export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    if (password.length < 4)
      return res
        .status(400)
        .json({ message: "Password must be at least 4 characters long" });

    const mobileStr = String(mobile);
    if (mobileStr.length !== 10)
      return res
        .status(400)
        .json({ message: "Mobile number must be 10 digits long" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      mobile: mobileStr,
      role,
    });

    await newUser.save();

    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log(newUser);
    res.status(201).json({
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};