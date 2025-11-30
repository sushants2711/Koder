import { sendCookies } from "../middlewares/send.cookies.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signupController = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password not match" });
        };

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.status(400).json({ success: false, message: "User already Exist" });
        };

        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        const newUser = new userModel({
            name,
            email,
            password: hash_password,
        });

        const savedData = await newUser.save();

        await sendCookies(savedData._id, res);

        return res
            .status(201)
            .json({
                success: true, message: "User Created Successfully", name: savedData.name, email: savedData.email
            });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ success: false, message: "Invalid Email id Credentials" });
        };

        const comparePassword = await bcrypt.compare(password, userExist.password);

        if (!comparePassword) {
            return res.status(400).json({ success: false, message: "Invalid Password Credentials" });
        };

        await sendCookies(userExist._id, res);

        return res.status(200).json({ success: true, message: "User LoggedIn Successfully", name: userExist.name, email: userExist.email });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

export const logoutController = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ success: true, message: "Logout successfully", });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    };
};

