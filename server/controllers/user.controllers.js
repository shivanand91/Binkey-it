import { response } from 'express';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/veryEmailTemplate.js'
import generateAcccessToke from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';

export async function registerUserController(req, res) {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please fill name, email and password fields',
                error: true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return res.json({
                message: "Already email exist",
                error: true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from Binkyit",
            html: verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            })
        })

        return res.json({
            message: "User Registered Successfully",
            error: false,
            success: true,
            data : save
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success : false
        })
    }
}

export async function verifyEmailController(req, res) { 
    try {
        const { code } = req.body
        
        const user = await UserModel.findOne({ _id: code })
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success : false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_email : true
        })

        return res.json({
            message: "Email verified successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success : true
        })
    }
}

// login controller

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                message: "Email and password are required",
                error: true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not register",
                error: true,
                success: false
            });
        }

        if (user.status !== "active") {
            return res.status(400).json({
                message: "Your account is not active",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid password",
                error: true,
                success: false
            });
        }

        const accessToken = await generateAcccessToke(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie("accessToken", accessToken, cookiesOption);
        res.cookie("refreshToken", refreshToken, cookiesOption);

        return res.json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
